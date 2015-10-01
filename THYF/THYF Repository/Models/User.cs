using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using THYF_Web_Models.Models;

namespace THYF_Repository.Models
{
	public class User : BaseModel<WebUser>
	{
		public int id { get; set; }
		public string email { get; set; }
		public string name { get; set; }
	}
}