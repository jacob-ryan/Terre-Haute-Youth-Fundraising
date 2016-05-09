using System;
using System.Linq;
using THYF_Repository.Helpers;
using THYF_Repository.Models;

namespace THYF_Repository.Repositories
{
	public class PasswordResetRepo : BaseRepo
	{
		public void resetPassword(string email)
		{
			User user = db.Users.SingleOrDefault(u => u.email == email);
			if (user != null)
			{
				string password = Passwords.createRandomPassword();
				Passwords.updateUserPassword(user, password);
				user.hasTempPassword = true;
				user.tempPasswordDate = DateTime.UtcNow;
				try
				{
					Email.sendPasswordResetEmail(user.email, user.name, password);
				}
				catch (Exception)
				{
					throw new Exception("Could not send email");
				}

				db.SaveChanges();
			}
			else
			{
				throw new Exception("Invalid email address");
			}
		}
	}
}