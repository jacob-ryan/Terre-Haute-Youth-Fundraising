namespace THYF_Repository.Models
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreation : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BFKSBowlers",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        userId = c.Int(),
                        name = c.String(),
                        tshirtSize = c.String(),
                        BFKSRegistration_id = c.Int(),
                    })
                .PrimaryKey(t => t.id)
                .ForeignKey("dbo.Users", t => t.userId)
                .ForeignKey("dbo.BFKSRegistrations", t => t.BFKSRegistration_id)
                .Index(t => t.userId)
                .Index(t => t.BFKSRegistration_id);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        isActive = c.Boolean(nullable: false),
                        name = c.String(nullable: false, maxLength: 255),
                        email = c.String(nullable: false, maxLength: 255),
                        type = c.String(nullable: false, maxLength: 255),
                        address = c.String(maxLength: 1024),
                        city = c.String(maxLength: 255),
                        state = c.String(maxLength: 2),
                        zip = c.String(maxLength: 5),
                        phone = c.String(nullable: false, maxLength: 255),
                        tshirtSize = c.String(maxLength: 255),
                        companyName = c.String(maxLength: 255),
                        dateCreated = c.DateTime(nullable: false),
                        passwordSalt = c.Binary(nullable: false),
                        passwordHash = c.Binary(nullable: false),
                        passwordIterations = c.Int(nullable: false),
                        hasTempPassword = c.Boolean(nullable: false),
                        tempPasswordDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.id)
                .Index(t => t.email, unique: true);
            
            CreateTable(
                "dbo.BFKSRegistrations",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        teamName = c.String(),
                        teamCaptainId = c.Int(nullable: false),
                        dateCreated = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.id)
                .ForeignKey("dbo.Users", t => t.teamCaptainId, cascadeDelete: true)
                .Index(t => t.teamCaptainId);
            
            CreateTable(
                "dbo.FrostyRegistrations",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        userId = c.Int(nullable: false),
                        isMinor = c.Boolean(nullable: false),
                        dateCreated = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.id)
                .ForeignKey("dbo.Users", t => t.userId, cascadeDelete: true)
                .Index(t => t.userId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.FrostyRegistrations", "userId", "dbo.Users");
            DropForeignKey("dbo.BFKSRegistrations", "teamCaptainId", "dbo.Users");
            DropForeignKey("dbo.BFKSBowlers", "BFKSRegistration_id", "dbo.BFKSRegistrations");
            DropForeignKey("dbo.BFKSBowlers", "userId", "dbo.Users");
            DropIndex("dbo.FrostyRegistrations", new[] { "userId" });
            DropIndex("dbo.BFKSRegistrations", new[] { "teamCaptainId" });
            DropIndex("dbo.Users", new[] { "email" });
            DropIndex("dbo.BFKSBowlers", new[] { "BFKSRegistration_id" });
            DropIndex("dbo.BFKSBowlers", new[] { "userId" });
            DropTable("dbo.FrostyRegistrations");
            DropTable("dbo.BFKSRegistrations");
            DropTable("dbo.Users");
            DropTable("dbo.BFKSBowlers");
        }
    }
}
