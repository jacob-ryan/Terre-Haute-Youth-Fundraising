using System;
using System.ComponentModel.DataAnnotations;

namespace THYF_Web_Models.Models
{
	public class WebFrostyRegistration
	{
		public int id { get; set; }
		[Required]
		public int eventOccurrenceId { get; set; }

		public int userId { get; set; }
		public WebUser user { get; set; }
		[Required]
		public bool isMinor { get; set; }

		public DateTime dateCreated { get; set; }
	}
}