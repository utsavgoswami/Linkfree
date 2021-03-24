using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetIdentityDemo.Api.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string ProfilePictureURL { get; set; }

        // Navigation property for 1:N relationship
        // between ApplicationUser and Link
        public ICollection<Link> Links { get; set; }
    }
}
