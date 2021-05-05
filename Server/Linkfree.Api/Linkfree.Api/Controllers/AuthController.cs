using Linkfree.Api.Models;
using Linkfree.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Linkfree.Api.Controllers
{
    [Route("v1/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        // /api/auth/register
        [HttpPost("Register")]
        public async Task<IActionResult> RegisterAsync([FromBody]RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _userService.RegisterUserAsync(model);

                if (result.IsSuccess)
                {
                    return Ok(result); // Status Code: 200
                }

                return BadRequest(result);
            }

            return BadRequest("Some properties are not valid"); // Error code: 400
        }

        [HttpPost("Login")]
        public async Task<IActionResult> LoginAsync([FromBody]LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var loginCheck = await _userService.LoginUserAsync(model);

                if (loginCheck.IsSuccess)
                {
                    return Ok(loginCheck);
                }

                return BadRequest(loginCheck);
            }

            return BadRequest("Some properties are not valid");
        }
    }
}
