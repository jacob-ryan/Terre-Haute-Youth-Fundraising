using System;
using System.ComponentModel.DataAnnotations;

namespace THYF_Repository.Models
{
	public class PayPalAuthorization
	{
		public int id { get; set; }
		[MinLength(36), MaxLength(36)]
		public string guid { get; set; }
		// One of "Logged-in", "Email", or "Anonymous"
		[MaxLength(255)]
		public string type { get; set; }

		public int? userId { get; set; }
		public User user { get; set; }

		[MaxLength(255)]
		public string email { get; set; }
		[MaxLength(255)]
		public string name { get; set; }

		public DateTime date { get; set; }
	}
}