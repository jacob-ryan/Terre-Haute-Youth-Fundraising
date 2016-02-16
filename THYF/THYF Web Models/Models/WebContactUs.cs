using System.ComponentModel.DataAnnotations;

namespace THYF_Web_Models.Models
{
	public class WebContactUs
	{
		[Required, MaxLength(255)]
		public string firstName { get; set; }
		[Required, MaxLength(255)]
		public string lastName { get; set; }
		[MaxLength(255)]
		public string emailAddress { get; set; }
		[MaxLength(255)]
		public string phone { get; set; }
		[Required, MaxLength(5000)]
		public string message { get; set; }
	}
}