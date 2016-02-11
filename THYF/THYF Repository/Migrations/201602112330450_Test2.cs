namespace THYF_Repository.Models
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Test2 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ContactUs",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        date = c.DateTime(nullable: false),
                        userId = c.Int(nullable: false),
                        ipAddress = c.String(),
                        firstName = c.String(nullable: false, maxLength: 255),
                        lastName = c.String(nullable: false, maxLength: 255),
                        emailAddress = c.String(maxLength: 255),
                        phone = c.String(maxLength: 255),
                        message = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.ContactUs");
        }
    }
}
