using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Linkfree.Api.Models
{
    public class Picture
    {
        [Required]
        public string URL { get; set; }
    }
}
