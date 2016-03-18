using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using THYF_Repository.Helpers;
using THYF_Repository.Models;
using THYF_Web_Models.Models;

namespace THYF_Repository.Repositories
{
	public class BFKSRegistrationRepo : BaseRepo
	{
		public BFKSRegistrationRepo(int currentUserId) : base(currentUserId)
		{
		}

		public List<WebBFKSRegistration> getBFKSRegistrations()
		{
			if (this.me.type == "admin")
			{
				List<BFKSRegistration> registrations = db.BFKSRegistrations.ToList();
				return registrations.convertList<BFKSRegistration, WebBFKSRegistration>();
			}
			else
			{
				throw new PermissionDeniedException();
			}
		}

		public List<WebBFKSRegistration> getBFKSRegistrations(int userId)
		{
			if (this.me.id == userId || this.me.type == "admin")
			{
				List<BFKSRegistration> registrations = db.BFKSRegistrations
					.Include(r => r.bowlers)
					.Where(r => r.teamCaptainId == userId || r.bowlers.Any(b => b.userId == userId))
					.ToList();
				return registrations.convertList<BFKSRegistration, WebBFKSRegistration>();
			}
			else
			{
				throw new PermissionDeniedException();
			}
		}

		public int addBFKSRegistration(WebBFKSRegistration webRegistration)
		{
			// Perhaps check if registration is enabled for this event (future?).
			if (true)
			{
				BFKSRegistration registration = new BFKSRegistration();
				registration.eventOccurrenceId = webRegistration.eventOccurrenceId;
				registration.teamName = webRegistration.teamName;
				registration.teamCaptainId = webRegistration.teamCaptainId;
				registration.dateCreated = DateTime.UtcNow;

				registration.bowlers = new List<BFKSBowler>();
				foreach (WebBFKSBowler webBowler in webRegistration.bowlers)
				{
					BFKSBowler bowler = new BFKSBowler();
					bowler.userId = webBowler.userId;
					bowler.name = webBowler.name;
					bowler.tshirtSize = webBowler.tshirtSize;
					registration.bowlers.Add(bowler);
				}

				db.BFKSRegistrations.Add(registration);
				db.SaveChanges();

				return registration.id;
			}
			else
			{
				throw new PermissionDeniedException();
			}
		}
	}
}