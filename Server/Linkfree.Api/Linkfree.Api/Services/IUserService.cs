using AspNetIdentityDemo.Api.Models;
using Linkfree.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Linkfree.Api.Services
{
    public interface IUserService
    {
        Task<UserManagerResponse> RegisterUserAsync(RegisterViewModel model);

        Task<UserManagerResponse> LoginUserAsync(LoginViewModel model);

        Task<ApplicationUser> GetUser(string userName);
    }

    public class UserService : IUserService
    {
        private UserManager<ApplicationUser> _userManager;
        private IConfiguration _configuration;

        public UserService(UserManager<ApplicationUser> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<UserManagerResponse> LoginUserAsync(LoginViewModel model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);

            if (user == null)
            {
                return new UserManagerResponse
                {
                    Message = "The username or password is incorrect",
                    IsSuccess = false
                };
            }

            var passwordIsCorrect = await _userManager.CheckPasswordAsync(user, model.Password);

            if (!passwordIsCorrect)
            {
                return new UserManagerResponse
                {
                    Message = "The username or password is incorrect",
                    IsSuccess = false
                };
            }


            // Setting up/generating JWT
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, model.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AuthSettings:Key"]));

            var token = new JwtSecurityToken(
               claims: claims,
               signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            );

            string tokenAsString = new JwtSecurityTokenHandler().WriteToken(token);

            return new UserManagerResponse
            {
                Message = "Successfully signed in!",
                Token = tokenAsString,
                IsSuccess = true
            };
        }

        public async Task<UserManagerResponse> RegisterUserAsync(RegisterViewModel model)
        {
            if (model == null)
            {
                throw new NullReferenceException("Register Model is null");
            }

            if (model.Password != model.ConfirmPassword)
            {
                return new UserManagerResponse
                {
                    Message = "Passwords do not match",
                    IsSuccess = false
                };
            }

            var ApplicationUser = new ApplicationUser
            {
                Email = model.Email,
                UserName = model.UserName
            };

            var result = await _userManager.CreateAsync(ApplicationUser, model.Password);

            if (result.Succeeded)
            {
                // Setting up/generating JWT
                var claims = new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, model.UserName)
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AuthSettings:Key"]));

                var token = new JwtSecurityToken(
                   claims: claims,
                   signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
                );

                string tokenAsString = new JwtSecurityTokenHandler().WriteToken(token);

                return new UserManagerResponse
                {
                    Message = "Successfully registered!",
                    Token = tokenAsString,
                    IsSuccess = true
                };

            }

            return new UserManagerResponse
            {
                Message = "Unable to create user",
                IsSuccess = false,
                Errors = result.Errors.Select(e => e.Description)
            };

        }

        public async Task<ApplicationUser> GetUser(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);

            return user;
        }
    }
}
