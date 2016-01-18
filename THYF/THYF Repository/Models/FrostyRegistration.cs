using System;
using THYF_Web_Models.Models;

namespace THYF_Repository.Models
{
	public class FrostyRegistration : BaseModel<WebFrostyRegistration>
	{
		public int id { get; set; }
		public int userId { get; set; }
		public User user { get; set; }
		public bool isMinor { get; set; }
		public DateTime dateCreated { get; set; }
	}
}