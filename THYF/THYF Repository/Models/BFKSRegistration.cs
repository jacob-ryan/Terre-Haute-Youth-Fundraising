using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using THYF_Web_Models.Models;

namespace THYF_Repository.Models
{
	public class BFKSRegistration : BaseModel<WebBFKSRegistration>
	{
		public int id { get; set; }
		public int eventOccurrenceId { get; set; }
		public EventOccurrence eventOccurrence { get; set; }
		public int userId { get; set; }
		public User user { get; set; }
		public bool isPaid { get; set; }

		public string teamName { get; set; }
		public int teamCaptainId { get; set; }
		public User teamCaptain { get; set; }
		public List<BFKSBowler> bowlers { get; set; }

		private DateTime _dateCreated;
		public DateTime dateCreated
		{
			get
			{
				return DateTime.SpecifyKind(_dateCreated, DateTimeKind.Utc);
			}
			set
			{
				_dateCreated = value;
			}
		}
	}
}