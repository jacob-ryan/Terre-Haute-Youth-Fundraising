using System;
using System.ComponentModel.DataAnnotations;
using THYF_Web_Models.Models;

namespace THYF_Repository.Models
{
	public class EventOccurrence : BaseModel<WebEventOccurrence>
	{
		public int id { get; set; }
		public bool isActive { get; set; }
		[Required, MaxLength(255)]
		public string type { get; set; }
		[Required, MaxLength(1024)]
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