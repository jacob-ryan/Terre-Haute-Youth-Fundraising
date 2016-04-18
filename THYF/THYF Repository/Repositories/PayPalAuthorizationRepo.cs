using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using THYF_Repository.Models;
using THYF_Web_Models.Models;

namespace THYF_Repository.Repositories
{
	public class PayPalAuthorizationRepo : BaseRepo
	{
		public PayPalAuthorizationRepo() : base()
		{
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