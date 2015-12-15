using System;
using System.Collections.Generic;
using System.Linq;
using THYF_Repository.Helpers;
using THYF_Repository.Models;
using THYF_Web_Models.Models;

namespace THYF_Repository.Repositories
{
	public class UserRepo : BaseRepo
	{
		public List<WebUser> getUsers(int currentUserId)
		{
			this.me = getMe(currentUserId);
			List<User> users = getAllowedUsers().ToList();
			return users.convertList<User, WebUser>();
		}

		public WebUser getUser(int currentUserId, int id)
		{
			this.me = getMe(currentUserId);
			User user = getAllowedUsers().FirstOrDefault(u => u.id == id);
			if (user != null)
			{
				return user.convert();
			}
			else
			{
				throw new PermissionDeniedException();
			}
		}

		public void updateUser(int currentUserId, int id, WebUser webUser)
		{
			this.me = getMe(currentUserId);
			User user = db.Users.Find(id);
			if (user != null && me.id == id)
			{
				// Do not allow duplicate email addresses.
				int others = db.Users.Count(u => u.email == webUser.email && u.id != id);
				if (others > 0)
				{
					throw new Exception("Email address is already in use");
				}
				// Do not allow a user to make their own account inactive (or re-activate it).
				if (me.id != id)
				{
					user.isActive = webUser.isActive;
				}
				user.name = webUser.name;
				user.email = webUser.email;
				if (webUser.newPassword != null && me.id == id)
				{
					Passwords.updateUserPassword(user, webUser.newPassword);
				}
				db.SaveChanges();
			}
			else
			{
				throw new PermissionDeniedException();
			}
		}

		public int addUser(WebUser webUser)
		{
			// Anonymous access allowed, needs safe-guard.
			if (true)
			{
				// Do not allow duplicate email addresses.
				int others = db.Users.Count(u => u.email == webUser.email);
				if (others > 0)
				{
					throw new Exception("Email address is already in use");
				}

				User user = new User();
				user.isActive = webUser.isActive;
				user.name = webUser.name;
				user.email = webUser.email;
				user.dateCreated = DateTime.UtcNow;

				if (webUser.newPassword == null)
				{
					throw new Exception("Password is required");
				}
				Passwords.updateUserPassword(user, webUser.newPassword);
				user.hasTempPassword = false;
				user.tempPasswordDate = DateTime.UtcNow;

				db.Users.Add(user);
				db.SaveChanges();

				return user.id;
			}
			else
			{
				throw new PermissionDeniedException();
			}
		}

		private IQueryable<User> getAllowedUsers()
		{
			return db.Users;
		}
	}
}