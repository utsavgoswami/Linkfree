using AspNetIdentityDemo.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Linkfree.Api.Services
{
    interface ILinkService
    {
        List<Link> GetLinks(string applicationUserId);

        Link AddLink(Link link);

        void DeleteLink(Link link);

        Link EditLink(Link link);
    }

    public class LinkService : ILinkService
    {
        private ApplicationDbContext _appDbContext;
        public LinkService(ApplicationDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public Link AddLink(Link link)
        {
            throw new NotImplementedException();
        }

        public void DeleteLink(Link link)
        {
            throw new NotImplementedException();
        }

        public Link EditLink(Link link)
        {
            throw new NotImplementedException();
        }

        public List<Link> GetLinks(string applicationUserId)
        {
            throw new NotImplementedException();
        }
    }
}
