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
                .ForeignKey("dbo.BFKSRegistrations", t => t.BFKSRegistration_id)
                .ForeignKey("dbo.Users", t => t.userId)
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
                        address = c.String(nullable: false, maxLength: 1024),
                        city = c.String(nullable: false, maxLength: 255),
                        state = c.String(nullable: false, maxLength: 2),
                        zip = c.String(nullable: false, maxLength: 5),
                        phone = c.String(nullable: false, maxLength: 255),
                        dateOfBirth = c.String(nullable: false, maxLength: 255),
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
                        eventOccurrenceId = c.Int(nullable: false),
                        userId = c.Int(nullable: false),
                        isPaid = c.Boolean(nullable: false),
                        teamName = c.String(),
                        teamCaptainId = c.Int(nullable: false),
                        dateCreated = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.id)
                .ForeignKey("dbo.EventOccurrences", t => t.eventOccurrenceId)
                .ForeignKey("dbo.Users", t => t.teamCaptainId)
                .ForeignKey("dbo.Users", t => t.userId)
                .Index(t => t.eventOccurrenceId)
                .Index(t => t.userId)
                .Index(t => t.teamCaptainId);
            
            CreateTable(
                "dbo.EventOccurrences",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        isActive = c.Boolean(nullable: false),
                        type = c.String(nullable: false, maxLength: 255),
                        description = c.String(nullable: false, maxLength: 1024),
                        date = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.id);
            
            CreateTable(
                "dbo.FrostyRegistrations",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        eventOccurrenceId = c.Int(nullable: false),
                        userId = c.Int(nullable: false),
                        isPaid = c.Boolean(nullable: false),
                        isMinor = c.Boolean(nullable: false),
                        dateCreated = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.id)
                .ForeignKey("dbo.EventOccurrences", t => t.eventOccurrenceId)
                .ForeignKey("dbo.Users", t => t.userId)
                .Index(t => t.eventOccurrenceId)
                .Index(t => t.userId);
            
            CreateTable(
                "dbo.ContactUs",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        userId = c.Int(nullable: false),
                        ipAddress = c.String(),
                        date = c.DateTime(nullable: false),
                        firstName = c.String(nullable: false, maxLength: 255),
                        lastName = c.String(nullable: false, maxLength: 255),
                        emailAddress = c.String(maxLength: 255),
                        phone = c.String(maxLength: 255),
                        message = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.id);
            
            CreateTable(
                "dbo.PayPalAuthorizations",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        guid = c.String(nullable: false, maxLength: 36),
                        type = c.String(nullable: false, maxLength: 255),
                        bfksRegistrationId = c.Int(),
                        frostyRegistrationId = c.Int(),
                        userId = c.Int(),
                        email = c.String(maxLength: 255),
                        name = c.String(maxLength: 255),
                        date = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.id)
                .ForeignKey("dbo.BFKSRegistrations", t => t.bfksRegistrationId)
                .ForeignKey("dbo.FrostyRegistrations", t => t.frostyRegistrationId)
                .ForeignKey("dbo.Users", t => t.userId)
                .Index(t => t.bfksRegistrationId)
                .Index(t => t.frostyRegistrationId)
                .Index(t => t.userId);
            
            CreateTable(
                "dbo.PayPalNotifications",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        dateReceived = c.DateTime(nullable: false),
                        transactionId = c.String(maxLength: 1024),
                        payerId = c.String(maxLength: 1024),
                        paymentGross = c.String(maxLength: 1024),
                        paymentFee = c.String(maxLength: 1024),
                        mcCurrency = c.String(maxLength: 1024),
                        mcGross = c.String(maxLength: 1024),
                        reasonCode = c.String(maxLength: 1024),
                        paymentDate = c.String(maxLength: 1024),
                        paymentStatus = c.String(maxLength: 1024),
                        custom = c.String(maxLength: 36),
                    })
                .PrimaryKey(t => t.id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.PayPalAuthorizations", "userId", "dbo.Users");
            DropForeignKey("dbo.PayPalAuthorizations", "frostyRegistrationId", "dbo.FrostyRegistrations");
            DropForeignKey("dbo.PayPalAuthorizations", "bfksRegistrationId", "dbo.BFKSRegistrations");
            DropForeignKey("dbo.BFKSBowlers", "userId", "dbo.Users");
            DropForeignKey("dbo.FrostyRegistrations", "userId", "dbo.Users");
            DropForeignKey("dbo.FrostyRegistrations", "eventOccurrenceId", "dbo.EventOccurrences");
            DropForeignKey("dbo.BFKSRegistrations", "userId", "dbo.Users");
            DropForeignKey("dbo.BFKSRegistrations", "teamCaptainId", "dbo.Users");
            DropForeignKey("dbo.BFKSRegistrations", "eventOccurrenceId", "dbo.EventOccurrences");
            DropForeignKey("dbo.BFKSBowlers", "BFKSRegistration_id", "dbo.BFKSRegistrations");
            DropIndex("dbo.PayPalAuthorizations", new[] { "userId" });
            DropIndex("dbo.PayPalAuthorizations", new[] { "frostyRegistrationId" });
            DropIndex("dbo.PayPalAuthorizations", new[] { "bfksRegistrationId" });
            DropIndex("dbo.FrostyRegistrations", new[] { "userId" });
            DropIndex("dbo.FrostyRegistrations", new[] { "eventOccurrenceId" });
            DropIndex("dbo.BFKSRegistrations", new[] { "teamCaptainId" });
            DropIndex("dbo.BFKSRegistrations", new[] { "userId" });
            DropIndex("dbo.BFKSRegistrations", new[] { "eventOccurrenceId" });
            DropIndex("dbo.Users", new[] { "email" });
            DropIndex("dbo.BFKSBowlers", new[] { "BFKSRegistration_id" });
            DropIndex("dbo.BFKSBowlers", new[] { "userId" });
            DropTable("dbo.PayPalNotifications");
            DropTable("dbo.PayPalAuthorizations");
            DropTable("dbo.ContactUs");
            DropTable("dbo.FrostyRegistrations");
            DropTable("dbo.EventOccurrences");
            DropTable("dbo.BFKSRegistrations");
            DropTable("dbo.Users");
            DropTable("dbo.BFKSBowlers");
        }
    }
}
