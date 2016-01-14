using System;

namespace THYF_Repository.Models
{
	public class FrostyRegistration
	{
		public int id { get; set; }
		public int userId { get; set; }
		public User user { get; set; }
		public DateTime dateCreated { get; set; }
	}
}