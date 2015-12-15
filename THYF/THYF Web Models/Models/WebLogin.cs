using System.ComponentModel.DataAnnotations;

namespace THYF_Web_Models.Models
{
	public class WebLogin
	{
		[Required, MaxLength(255), EmailAddress]
		public string email { get; set; }
		[Required, MaxLength(255)]
		public string password { get; set; }
		[Required]
		public bool rememberMe { get; set; }
	}
}