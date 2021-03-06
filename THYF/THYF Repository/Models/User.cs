﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using THYF_Web_Models.Models;

namespace THYF_Repository.Models
{
	public class User : BaseModel<WebUser>
	{
		public int id { get; set; }
		[Required]
		public bool isActive { get; set; }
		[Required, MaxLength(255)]
		public string name { get; set; }
		[Required, MaxLength(255), Index(IsUnique = true)]
		public string email { get; set; }
		[Required, MaxLength(255)]
		public string type { get; set; }
		[Required, MaxLength(1024)]
		public string address { get; set; }
		[Required, MaxLength(255)]
		public string city { get; set; }
		[Required, MaxLength(2)]
		public string state { get; set; }
		[Required, MaxLength(5)]
		public string zip { get; set; }
		[Required, MaxLength(255)]
		public string phone { get; set; }
		[Required, MaxLength(255)]
		public string dateOfBirth { get; set; }
		[MaxLength(255)]
		public string tshirtSize { get; set; }
		[MaxLength(255)]
		public string companyName { get; set; }

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

		public List<BFKSRegistration> bfksRegistrations { get; set; }
		public List<FrostyRegistration> frostyRegistrations { get; set; }

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