using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using THYF_Repository.Models;

namespace THYF_Repository.Repositories
{
	public class BaseRepo : IDisposable
	{
		public DatabaseContext db = new DatabaseContext();

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