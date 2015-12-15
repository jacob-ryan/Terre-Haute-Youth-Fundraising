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
		[MaxLength(255)]
		public string newPassword { get; set; }
		public DateTime dateCreated { get; set; }
	}
}