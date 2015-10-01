using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace THYF_Repository.Models
{
	public class DatabaseContext : DbContext
	{
		public DatabaseContext() : base()
		{
			this.Configuration.LazyLoadingEnabled = false;
			this.Configuration.ProxyCreationEnabled = false;
			this.Database.CommandTimeout = 10;

			Database.SetInitializer<DatabaseContext>(new MigrateDatabaseToLatestVersion<DatabaseContext, MigrationConfiguration>());
		}

		public DbSet<User> Users { get; set; }
	}
}