﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using THYF_Repository.Helpers;
using THYF_Repository.Models;
using THYF_Web_Models.Models;

namespace THYF_Repository.Repositories
{
	public class PayPalAuthorizationRepo : BaseRepo
	{
		public PayPalAuthorizationRepo() : base()
		{
		}

		public WebPayPalAuthorization getAuthorization(User me, string guid)
		{
			if (me.type == "admin")
			{
				PayPalAuthorization authorization = db.PayPalAuthorizations.SingleOrDefault(a => a.guid == guid);
				if (authorization != null)
				{
					WebPayPalAuthorization webAuth = new WebPayPalAuthorization();
					webAuth.id = authorization.id;
					webAuth.guid = authorization.guid;
					webAuth.type = authorization.type;
					webAuth.userId = authorization.userId;
					webAuth.user = authorization.user != null ? authorization.user.convert() : null;
					webAuth.email = authorization.email;
					webAuth.name = authorization.name;
					webAuth.date = authorization.date;
					return webAuth;
				}
				else
				{
					return null;
				}
			}
			else
			{
				throw new PermissionDeniedException();
			}
		}

		public string createAuthorization(WebPayPalAuthorization authorization, int currentUserId)
		{
			if ((authorization.type == "Logged-in" && currentUserId >= 0)
				|| (authorization.type == "Email" && currentUserId == -1)
				|| (authorization.type == "Anonymous" && currentUserId == -1))
			{
				PayPalAuthorization a = new PayPalAuthorization();
				a.guid = Guid.NewGuid().ToString();
				a.type = authorization.type;
				if (currentUserId >= 0)
				{
					a.userId = currentUserId;
				}
				else
				{
					a.userId = null;
				}
				a.email = authorization.email;
				a.name = authorization.name;
				a.date = DateTime.UtcNow;

				db.PayPalAuthorizations.Add(a);
				db.SaveChanges();

				return a.guid;
			}
			else
			{
				throw new Exception("Invalid authorization type or currentUserId: type=" + authorization.type + ", currentUserId=" + currentUserId);
			}
		}
	}
}