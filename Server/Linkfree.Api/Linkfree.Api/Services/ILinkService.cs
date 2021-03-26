using AspNetIdentityDemo.Api.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Linkfree.Api.Services
{
    public interface ILinkService
    {
        List<Link> GetLinks(string applicationUserId);

        Link AddLink(Link link, string applicationUserId);

        void DeleteLink(Link linkToDelete);

        Link UpdateLink(Link changedLink);

        Link GetLink(Guid LinkId);

        bool IsLinkOwner(Link link, string applicationUserId);

        int GetNumUserLinks(string applicationUserId);

        string GetLinkApplicationUserId(Link link);
    }

    public class LinkService : ILinkService
    {
        private ApplicationDbContext _appDbContext;
        public LinkService(ApplicationDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public Link AddLink(Link link, string applicationUserId)
        {
            link.LinkId = Guid.NewGuid();
            _appDbContext.Links.Add(link);
            _appDbContext.Entry(link).Property("ApplicationUserId").CurrentValue = applicationUserId;
            _appDbContext.SaveChanges();
            return link;
        }

        public void DeleteLink(Link linkToDelete)
        {
            var existingLink = GetLink(linkToDelete.LinkId);
            if (existingLink != null)
            {
                string userId = GetLinkApplicationUserId(existingLink);

                _appDbContext.Links.Remove(linkToDelete);

                // Normalize priority numbers on the rest of the links
                // ex: You delete a link with a priority of 2 and 4 links remain
                // You want to change the sequence of priorities from 
                // 0 -> 1 -> 3 -> 4 to 0 -> 1 -> 2 -> 3 -> 4
                var remainingLinks = _appDbContext.Links
                                                  .Where(link => link.LinkId != linkToDelete.LinkId)
                                                  .OrderBy(link => link.Priority)
                                                  .ToList();

                int normalizedPriorityNum = 0;
                foreach(var remainingLink in remainingLinks)
                {
                    remainingLink.Priority = normalizedPriorityNum;
                    _appDbContext.Links.Update(remainingLink);
                    ++normalizedPriorityNum;
                }

                _appDbContext.SaveChanges();
            }
        }

        public Link UpdateLink(Link changedLink)
        {
            var existingLink = _appDbContext.Links.Find(changedLink.LinkId);
            if (existingLink != null)
            {
                existingLink.Title = changedLink.Title;
                existingLink.URL = changedLink.URL;

                string userId = GetLinkApplicationUserId(existingLink);
                int numUserLinks = GetNumUserLinks(userId);

                if (existingLink.Priority != changedLink.Priority && (changedLink.Priority >= 0 && changedLink.Priority <= numUserLinks - 1))
                {
                    // Swap priority value with the link that currently has the priority this link wants to change to
                    Link swapLink = _appDbContext.Links
                                                 .Where(curLink => curLink.Priority == changedLink.Priority)
                                                 .FirstOrDefault();

                    swapLink.Priority = existingLink.Priority;
                    existingLink.Priority = changedLink.Priority;

                    _appDbContext.Links.Update(swapLink);
                }

                _appDbContext.Links.Update(existingLink);
                _appDbContext.SaveChanges();
            }

            return changedLink;
        }

        public List<Link> GetLinks(string applicationUserId)
        {
            return _appDbContext.Links
                                .Where(link => EF.Property<string>(link, "ApplicationUserId") == applicationUserId)
                                .OrderBy(link => link.Priority)
                                .ToList();
        }

        public Link GetLink(Guid LinkId)
        {
            return _appDbContext.Links.Find(LinkId);
        }

        public bool IsLinkOwner(Link link, string applicationUserId)
        {
            return GetLinkApplicationUserId(link) == applicationUserId;
        }

        public int GetNumUserLinks(string applicationUserId)
        {
            return _appDbContext.Links
                                .Where(link => EF.Property<string>(link, "ApplicationUserId") == applicationUserId)
                                .Count();
        }

        public string GetLinkApplicationUserId(Link link)
        {
            var existingLink = GetLink(link.LinkId);
            if (existingLink != null)
            {
                return _appDbContext.Entry(existingLink).Property("ApplicationUserId").CurrentValue.ToString();
            }

            return "";
        }
    }
}
