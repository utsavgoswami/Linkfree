using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetIdentityDemo.Api.Models
{
    public class Link
    {
        // Primary key
        public Guid LinkId { get; set; }

        [Required]
        public int Priority { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string URL { get; set; }

    }
}
