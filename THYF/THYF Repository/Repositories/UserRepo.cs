using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using THYF_Repository.Models;
using THYF_Web_Models.Models;

namespace THYF_Repository.Repositories
{
	public class UserRepo : BaseRepo
	{
		public List<WebUser> getUsers()
		{
			List<User> users = this.db.Users.ToList();
			return users.convertList<User, WebUser>();
		}

		public int addUser(WebUser webUser)
		{
			User user = new User();
			user.email = webUser.email;
			user.name = webUser.name;
			db.Users.Add(user);
			db.SaveChanges();

			return user.id;
		}
	}
}