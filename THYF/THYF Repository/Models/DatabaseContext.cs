using System.Data.Entity;

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
		public DbSet<BFKSRegistration> BFKSRegistrations { get; set; }
		public DbSet<BFKSBowler> BFKSBowlers { get; set; }
		public DbSet<FrostyRegistration> FrostyRegistrations { get; set; }
	}
}