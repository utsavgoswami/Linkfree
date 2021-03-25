using AspNetIdentityDemo.Api.Models;
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
    //[Route("api/[controller]")]
    [ApiController]
    public class LinksController : ControllerBase
    {
        private ILinkService _linkService;
        private IUserService _userService; 
        public LinksController(ILinkService linkService, IUserService userService)
        {
            _linkService = linkService;
            _userService = userService;
        }

        [HttpPost]
        [Authorize]
        [Route("api/v1/links")]
        public async Task<IActionResult> AddLink(Link link)
        {
            var userKey = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var userDetails = await _userService.GetUser(userKey);

            _linkService.AddLink(link, userDetails.Id);

            var pathToLink = HttpContext.Request.Scheme + "://" + HttpContext.Request.Host + HttpContext.Request.Path + "/" + link.LinkId;

            return Created(pathToLink, link);
        }
    }
}
