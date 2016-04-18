using System;
using System.ComponentModel.DataAnnotations;

namespace THYF_Web_Models.Models
{
	public class WebPayPalAuthorization
	{
		public int id { get; set; }
		public string guid { get; set; }
		// One of "Logged-in", "Email", or "Anonymous"
		[Required]
		public string type { get; set; }

		public int? userId { get; set; }
		public WebUser user { get; set; }

		public string email { get; set; }
		public string name { get; set; }

		public DateTime date { get; set; }
	}
}