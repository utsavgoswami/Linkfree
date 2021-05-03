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

            string updatedURL = await _userService.UpdateProfilePicture(userKey, profilePicture.URL);

            return Ok(updatedURL);
        }

        [HttpGet]
        [Route("v1/Users/{userName}/ProfilePicture")]
        public async Task<IActionResult> GetProfilePicture(string userName)
        {
            var userDetails = await _userService.GetUser(userName);

            if (userDetails != null)
            {
                return Ok(userDetails.ProfilePictureURL);
            }

            return NotFound($"User with userName: {userName} was not found");
        }
    }
}
