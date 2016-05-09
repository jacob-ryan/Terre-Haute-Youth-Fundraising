using System.ComponentModel.DataAnnotations;

namespace THYF_Web_Models.Models
{
	public class WebEmail
	{
		[Required, MaxLength(255), EmailAddress]
		public string email { get; set; }
	}
}