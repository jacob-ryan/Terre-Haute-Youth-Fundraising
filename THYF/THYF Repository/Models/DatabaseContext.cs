using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace THYF_Repository.Models
{
	public class DatabaseContext : DbContext
	{
		public DatabaseContext() : base()
		{
			this.Configuration.LazyLoadingEnabled = false;
			this.Configuration.ProxyCreationEnabled = false;
			this.Database.CommandTimeout = 20;

			Database.SetInitializer<DatabaseContext>(new MigrateDatabaseToLatestVersion<DatabaseContext, MigrationConfiguration>());
		}

		public DbSet<User> Users { get; set; }
		public DbSet<EventOccurrence> EventOccurrences { get; set; }
		public DbSet<BFKSRegistration> BFKSRegistrations { get; set; }
		public DbSet<BFKSBowler> BFKSBowlers { get; set; }
		public DbSet<FrostyRegistration> FrostyRegistrations { get; set; }
		public DbSet<ContactUs> ContactUsSubmissions { get; set; }
		public DbSet<PayPalNotification> PayPalNotifications { get; set; }
		public DbSet<PayPalAuthorization> PayPalAuthorizations { get; set; }

		protected override void OnModelCreating(DbModelBuilder modelBuilder)
		{
			modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
			modelBuilder.Entity<BFKSRegistration>().HasRequired(r => r.teamCaptain).WithMany(u => u.bfksRegistrations);
		}
	}
}