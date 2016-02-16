using System;
using System.ComponentModel.DataAnnotations;

namespace THYF_Repository.Models
{
	public class EventOccurrence
	{
		public int id { get; set; }
		[Required, MaxLength(255)]
		public string type { get; set; }
		[Required, MaxLength(255)]
		public string description { get; set; }

		private DateTime _date;
		[Required]
		public DateTime date
		{
			get
			{
				return DateTime.SpecifyKind(_date, DateTimeKind.Utc);
			}
			set
			{
				_date = value;
			}
		}
	}
}