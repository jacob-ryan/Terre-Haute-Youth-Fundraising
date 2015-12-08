using System;
using System.Linq;
using THYF_Repository.Helpers;
using THYF_Repository.Models;
using THYF_Web_Models.Models;

namespace THYF_Repository.Repositories
{
	public class LoginRepo : BaseRepo
	{
		public int attemptLogin(WebLogin login)
		{
			User user = db.Users
				.SingleOrDefault(u => u.email == login.email);

			if (user != null)
			{
				checkConditions(user);
				if (Passwords.authenticateUser(user, login.password))
				{
					db.SaveChanges();
					return user.id;
				}
				else
				{
					throw new Exception("Invalid password");
				}
			}
			else
			{
				throw new Exception("Invalid email address");
			}
		}

		private void checkConditions(User user)
		{
			if (user.isActive)
			{
				if (user.hasTempPassword)
				{
					TimeSpan difference = DateTime.UtcNow.Subtract(user.tempPasswordDate);
					if (difference.TotalHours > 24.0)
					{
						throw new Exception("Temporary password has expired");
					}
				}
			}
			else
			{
				throw new Exception("User not active");
			}
		}
	}
}