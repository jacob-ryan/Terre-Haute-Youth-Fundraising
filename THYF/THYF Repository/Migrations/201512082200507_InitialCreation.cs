namespace THYF_Repository.Models
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreation : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        isActive = c.Boolean(nullable: false),
                        name = c.String(),
                        email = c.String(maxLength: 255),
                        dateCreated = c.DateTime(nullable: false),
                        passwordSalt = c.Binary(nullable: false),
                        passwordHash = c.Binary(nullable: false),
                        passwordIterations = c.Int(nullable: false),
                        hasTempPassword = c.Boolean(nullable: false),
                        tempPasswordDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.id)
                .Index(t => t.email, unique: true);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.Users", new[] { "email" });
            DropTable("dbo.Users");
        }
    }
}
