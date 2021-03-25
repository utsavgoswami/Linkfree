using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Linkfree.Api.Models
{
    public class RegisterViewModel
    {
        [Required]
        [EmailAddress]
        // Ex: bob@gmail.com
        public string Email { get; set; }

        [Required]
        // Ex: bobthebuilder
        public string UserName { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 5)]
        public string Password { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 5)]
        public string ConfirmPassword { get; set; }

    }
}
