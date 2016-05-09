using System;
using System.Collections.Generic;
using System.Linq;
using THYF_Repository.Helpers;
using THYF_Repository.Models;
using THYF_Web_Models.Models;

namespace THYF_Repository.Repositories
{
	public class FrostyRegistrationRepo : BaseRepo
	{
		public FrostyRegistrationRepo(int currentUserId) : base(currentUserId)
		{
		}

		public List<WebFrostyRegistration> getFrostyRegistrations()
		{
			if (this.me.type == "admin")
			{
				List<FrostyRegistration> registrations = db.FrostyRegistrations.ToList();
				return registrations.convertList<FrostyRegistration, WebFrostyRegistration>();
			}
			else
			{
				throw new PermissionDeniedException();
			}
		}

		public List<WebFrostyRegistration> getFrostyRegistrations(int userId)
		{
			if (this.me.id == userId || this.me.type == "admin")
			{
				List<FrostyRegistration> registrations = db.FrostyRegistrations
					.Where(r => r.userId == userId)
					.ToList();
				return registrations.convertList<FrostyRegistration, WebFrostyRegistration>();
			}
			else
			{
				throw new PermissionDeniedException();
			}
		}

		public int addFrostyRegistration(WebFrostyRegistration webRegistration)
		{
			// Check if registration is enabled for this event occurrence.
			EventOccurrence eventOccurrence = db.EventOccurrences
				.SingleOrDefault(e => e.id == webRegistration.eventOccurrenceId);
			if (eventOccurrence != null)
			{
				if (!eventOccurrence.isActive)
				{
					throw new Exception("You cannot register for this event because it is not active");
				}
				FrostyRegistration registration = new FrostyRegistration();
				registration.eventOccurrenceId = webRegistration.eventOccurrenceId;
				registration.userId = this.me.id;
				registration.isPaid = false;
				registration.isMinor = webRegistration.isMinor;
				registration.dateCreated = DateTime.UtcNow;

				db.FrostyRegistrations.Add(registration);
				db.SaveChanges();

				return registration.id;
			}
			else
			{
				throw new PermissionDeniedException();
			}
		}

		public void updateFrostyRegistration(WebFrostyRegistration webRegistration)
		{
			// Check if registration is enabled for this event occurrence.
			EventOccurrence eventOccurrence = db.EventOccurrences
				.SingleOrDefault(e => e.id == webRegistration.eventOccurrenceId);
			if (eventOccurrence != null)
			{
				if (!eventOccurrence.isActive)
				{
					throw new Exception("You cannot register for this event because it is not active");
				}
				FrostyRegistration registration = db.FrostyRegistrations
					.SingleOrDefault(r => r.id == webRegistration.id);
				if (registration != null && (registration.userId == me.id || me.type == "admin"))
				{
					registration.eventOccurrenceId = webRegistration.eventOccurrenceId;
					// Only allow admins to manually mark registration as being paid (e.g. in person with cash/check).
					if (me.type == "admin")
					{
						registration.isPaid = webRegistration.isPaid;
					}
					registration.isMinor = webRegistration.isMinor;

					db.SaveChanges();
				}
				else
				{
					throw new PermissionDeniedException();
				}
			}
			else
			{
				throw new PermissionDeniedException();
			}
		}
	}
}