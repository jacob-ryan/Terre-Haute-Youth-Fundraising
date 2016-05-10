﻿using System;
using System.ComponentModel.DataAnnotations;

namespace THYF_Web_Models.Models
{
	public class WebPayPalAuthorization
	{
		public int id { get; set; }
		// Token that is passed to PayPal using "custom" field.
		[MinLength(36), MaxLength(36)]
		public string guid { get; set; }
		// One of "Logged-in", "Email", or "Anonymous"
		[Required, MaxLength(255)]
		public string type { get; set; }

		// Only used when paying for event registrations (must be logged-in).
		public int? bfksRegistrationId { get; set; }
		public int? frostyRegistrationId { get; set; }

		// Only used for "Logged-in" type.
		public int? userId { get; set; }
		public WebUser user { get; set; }

		// Only used for "Email" type.
		[MaxLength(255)]
		public string email { get; set; }
		[MaxLength(255)]
		public string name { get; set; }

		public DateTime date { get; set; }
	}
}