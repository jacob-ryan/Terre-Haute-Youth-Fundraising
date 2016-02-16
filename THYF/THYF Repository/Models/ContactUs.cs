using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using THYF_Web_Models.Models;

namespace THYF_Repository.Models
{
	public class ContactUs : BaseModel<WebContactUs>
	{
		public int id { get; set; }
		public DateTime date { get; set; }
		public int userId { get; set; }
		public string ipAddress { get; set; }

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