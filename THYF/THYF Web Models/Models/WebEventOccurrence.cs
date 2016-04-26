using System;
using System.ComponentModel.DataAnnotations;

namespace THYF_Web_Models.Models
{
	public class WebEventOccurrence
	{
		public int id { get; set; }
		public bool isActive { get; set; }
		[Required, MaxLength(255)]
		public string type { get; set; }
		[Required, MaxLength(1024)]
		public string description { get; set; }
		[Required]
		public DateTime date { get; set; }
	}
}