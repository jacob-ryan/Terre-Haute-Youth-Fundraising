using System;
using THYF_Web_Models.Models;

namespace THYF_Repository.Models
{
	public class FrostyRegistration : BaseModel<WebFrostyRegistration>
	{
		public int id { get; set; }
		public int eventOccurrenceId { get; set; }
		public EventOccurrence eventOccurrence { get; set; }
		public int userId { get; set; }
		public User user { get; set; }
		public bool isPaid { get; set; }

		public bool isMinor { get; set; }

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