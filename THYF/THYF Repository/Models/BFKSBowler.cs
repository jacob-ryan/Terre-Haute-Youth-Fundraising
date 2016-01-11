using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using THYF_Web_Models.Models;

namespace THYF_Repository.Models
{
	public class BFKSBowler : BaseModel<WebBFKSBowler>
	{
		public int id { get; set; }
		public int? userId { get; set; }
		public User user { get; set; }
		public string name { get; set; }
		public string tshirtSize { get; set; }
	}
}