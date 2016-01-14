using System;

namespace THYF_Web_Models.Models
{
	public class WebFrostyRegistration
	{
		public int id { get; set; }
		public int userId { get; set; }
		public WebUser user { get; set; }
		public DateTime dateCreated { get; set; }
	}
}