using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
		}
	}
}