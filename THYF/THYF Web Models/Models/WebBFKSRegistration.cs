using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace THYF_Web_Models.Models
{
	public class WebBFKSRegistration
	{
		public int id { get; set; }
		[Required]
		public int eventOccurrenceId { get; set; }
		public int userId { get; set; }
		public WebUser user { get; set; }
		public bool isPaid { get; set; }
		
		[Required, MaxLength(255)]
		public string teamName { get; set; }
		[Required]
		public int teamCaptainId { get; set; }
		public WebUser teamCaptain { get; set; }
		public List<WebBFKSBowler> bowlers { get; set; }

		public DateTime dateCreated { get; set; }
	}
}