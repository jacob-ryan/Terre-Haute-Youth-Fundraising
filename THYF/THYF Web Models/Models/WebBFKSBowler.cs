using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace THYF_Web_Models.Models
{
	public class WebBFKSBowler
	{
		public int id { get; set; }
		public int? userId { get; set; }
		public WebUser user { get; set; }
		[MaxLength(255)]
		public string name { get; set; }
		[MaxLength(255)]
		public string tshirtSize { get; set; }
	}
}