using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using THYF_Web_Models.Models;

namespace THYF_Repository.Models
{
	public class User : BaseModel<WebUser>
	{
		public int id { get; set; }
		public bool isActive { get; set; }
		public string name { get; set; }
		[Index(IsUnique = true), MaxLength(255)]
		public string email { get; set; }

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

		[Required]
		public byte[] passwordSalt { get; set; }
		[Required]
		public byte[] passwordHash { get; set; }
		public int passwordIterations { get; set; }
		public bool hasTempPassword { get; set; }

		private DateTime _tempPasswordDate;
		public DateTime tempPasswordDate
		{
			get
			{
				return DateTime.SpecifyKind(_tempPasswordDate, DateTimeKind.Utc);
			}
			set
			{
				_tempPasswordDate = value;
			}
		}
	}
}