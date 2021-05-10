using Linkfree.Api.Models;
using Linkfree.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Linkfree.Api.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPut]
        [Authorize]
        [Route("v1/Users/ProfilePicture")]
        public async Task<IActionResult> UpdateProfilePicture(Picture profilePicture)
        {
            var userKey = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            Picture updatedPicture = await _userService.UpdateProfilePicture(userKey, profilePicture.URL);

            return Ok(updatedPicture);
        }

        [HttpGet]
        [Route("v1/Users/{userName}/ProfilePicture")]
        public async Task<IActionResult> GetProfilePicture(string userName)
        {
            var userDetails = await _userService.GetUser(userName);

            if (userDetails != null)
            {
                Picture response = new()
                {
                    URL = userDetails.ProfilePictureURL
                };

                return Ok(response);
            }

            return NotFound($"User with Username: {userName} was not found");
        }
    }
}
