using System;
using System.ComponentModel.DataAnnotations;

namespace THYF_Web_Models.Models
{
	public class WebUser
	{
		public int id { get; set; }
		[Required]
		public bool isActive { get; set; }
		[Required, MaxLength(255)]
		public string name { get; set; }
		[Required, MaxLength(255), EmailAddress]
		public string email { get; set; }
		[Required, MaxLength(255)]
		public string type { get; set; }
		[MaxLength(1024)]
		public string address { get; set; }
		[MaxLength(255)]
		public string city { get; set; }
		[MaxLength(2)]
		public string state { get; set; }
		[MaxLength(5)]
		public string zip { get; set; }
		[MaxLength(255)]
		public string phone { get; set; }
		[MaxLength(255)]
		public string tshirtSize { get; set; }
		[MaxLength(255)]
		public string companyName { get; set; }

		[MaxLength(255)]
		public string newPassword { get; set; }
		public DateTime dateCreated { get; set; }
	}
}