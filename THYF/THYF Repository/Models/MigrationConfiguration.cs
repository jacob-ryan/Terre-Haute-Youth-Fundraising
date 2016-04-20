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
				addDefaultAdmin(context);
				for (int i = 0; i < 5; i += 1)
				{
					addTestAuthorizations(context);
				}
				//#endif

				System.Diagnostics.Debug.WriteLine("Finished seeding database.");
			}
			else
			{
				System.Diagnostics.Debug.WriteLine("Database already seeded.");
			}
		}

		private void addDefaultAdmin(DatabaseContext db)
		{
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

			db.Users.Add(admin);
			db.SaveChanges();
		}

		private void addTestAuthorizations(DatabaseContext db)
		{
			PayPalAuthorization a = new PayPalAuthorization();
			a.guid = Guid.NewGuid().ToString();
			a.type = "Logged-in";
			a.userId = 1;
			a.email = null;
			a.name = "TEST AUTHORIZATION";
			a.date = DateTime.UtcNow;
			db.PayPalAuthorizations.Add(a);

			PayPalNotification n = new PayPalNotification();
			n.dateReceived = DateTime.UtcNow;
			n.transactionId = "Random hash";
			n.payerId = "Random hash";
			n.paymentGross = "42.00";
			n.paymentFee = "10.00";
			n.mcCurrency = "USD";
			n.mcGross = "42.00";
			n.reasonCode = null;
			n.paymentDate = (DateTime.UtcNow - new TimeSpan(4, 30, 0)).ToString();
			n.paymentStatus = "Completed";
			n.custom = a.guid;
			db.PayPalNotifications.Add(n);

			db.SaveChanges();
		}
	}
}