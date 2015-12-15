using System;
using System.Linq;
using THYF_Repository.Models;

namespace THYF_Repository.Repositories
{
	public class BaseRepo : IDisposable
	{
		public DatabaseContext db = new DatabaseContext();
		public User me { get; set; }

		public BaseRepo()
		{
			this.me = null;
		}

		public BaseRepo(int currentUserId)
		{
			this.me = getMe(currentUserId);
		}

		public User getMe(int currentUserId)
		{
			return db.Users
				.FirstOrDefault(u => u.id == currentUserId);
		}

		protected virtual void Dispose(bool disposing)
		{
			if (disposing)
			{
				this.db.Dispose();
			}
		}

		public void Dispose()
		{
			Dispose(true);
		}
	}
}