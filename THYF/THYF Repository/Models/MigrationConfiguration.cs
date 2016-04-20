using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using THYF_Repository.Helpers;

namespace THYF_Repository.Models
{
	public class MigrationConfiguration : DbMigrationsConfiguration<DatabaseContext>
	{
		public MigrationConfiguration()
		{
			this.AutomaticMigrationsEnabled = false;
		}

		protected override void Seed(DatabaseContext context)
		{
			System.Diagnostics.Debug.WriteLine("MigrationConfiguration.Seed() method called - Initializing database...");
			
			if (context.Users.Count() == 0)
			{
				//#if DEBUG
				User admin = new User();
				admin.isActive = true;
				admin.name = "Default Admin";
				admin.email = "admin@admin.com";
				admin.type = "admin";
				admin.address = "Somewhere";
				admin.city = "Terre Haute";
				admin.state = "IN";
				admin.zip = "47802";
				admin.phone = "812-123-1234";
				admin.tshirtSize = "L";
				admin.companyName = null;
				admin.dateCreated = DateTime.UtcNow;

				Passwords.updateUserPassword(admin, "admin");
				admin.hasTempPassword = false;
				admin.tempPasswordDate = DateTime.UtcNow;

				context.Users.Add(admin);
				context.SaveChanges();
				//#endif

				System.Diagnostics.Debug.WriteLine("Finished seeding database.");
			}
			else
			{
				System.Diagnostics.Debug.WriteLine("Database already seeded.");
			}
		}
	}
}