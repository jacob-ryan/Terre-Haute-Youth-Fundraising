using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace THYF_Web_Models.Models
{
	public class WebBFKSRegistration
	{
		public int id { get; set; }
		[Required, MaxLength(255)]
		public string teamName { get; set; }
		public int teamCaptainId { get; set; }
		public WebUser teamCaptain { get; set; }
		public List<WebBFKSBowler> bowlers { get; set; }

		public DateTime dateCreated { get; set; }
	}
}