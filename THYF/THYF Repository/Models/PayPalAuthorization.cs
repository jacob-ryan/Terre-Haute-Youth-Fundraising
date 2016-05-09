using System;
using System.ComponentModel.DataAnnotations;

namespace THYF_Repository.Models
{
	public class PayPalAuthorization
	{
		public int id { get; set; }
		// Token that is passed to PayPal using "custom" field.
		[Required, MinLength(36), MaxLength(36)]
		public string guid { get; set; }
		// One of "Logged-in", "Email", or "Anonymous"
		[Required, MaxLength(255)]
		public string type { get; set; }
		
		// Only used when paying for event registrations (must be logged-in).
		public int? bfksRegistrationId { get; set; }
		public BFKSRegistration bfksRegistration { get; set; }
		public int? frostyRegistrationId { get; set; }
		public FrostyRegistration frostyRegistration { get; set; }

		// Only used for "Logged-in" type.
		public int? userId { get; set; }
		public User user { get; set; }

		// Only used for "Email" type.
		[MaxLength(255)]
		public string email { get; set; }
		[MaxLength(255)]
		public string name { get; set; }

		public DateTime date { get; set; }
	}
}