﻿using AspNetIdentityDemo.Api.Models;
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
        [Route("api/v1/Links")]
        public async Task<IActionResult> AddLink(Link link)
        {
            var userKey = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var userDetails = await _userService.GetUser(userKey);

            _linkService.AddLink(link, userDetails.Id);

            var pathToLink = HttpContext.Request.Scheme + "://" + HttpContext.Request.Host + HttpContext.Request.Path + "/" + link.LinkId;

            return Created(pathToLink, link);
        }

        [HttpGet]
        [Authorize]
        [Route("api/v1/Links")]
        public async Task<IActionResult> GetUserLinks()
        {
            var userKey = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var userDetails = await _userService.GetUser(userKey);

            return Ok(_linkService.GetLinks(userDetails.Id));
        }

        [HttpPatch]
        [Authorize]
        [Route("api/v1/Links/{LinkId}")]
        public async Task<IActionResult> UpdateLink(Guid LinkId, Link link)
        {
            var existingLink = _linkService.GetLink(LinkId);

            if (existingLink != null)
            {
                var userKey = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var userDetails = await _userService.GetUser(userKey);

                if (_linkService.IsLinkOwner(link, userDetails.Id))
                {
                    link.LinkId = existingLink.LinkId;
                    _linkService.UpdateLink(link);
                }
            }

            return Ok(link);
        }

        [HttpDelete]
        [Authorize]
        [Route("api/v1/Links/{LinkId}")]
        public async Task<IActionResult> DeleteLink(Guid LinkId)
        {
            var existingLink = _linkService.GetLink(LinkId);

            if (existingLink != null)
            { 
                _linkService.DeleteLink(existingLink);
                return Ok();
            }

            return NotFound($"Link with Id: {LinkId} was not found");
        }
    }
}
