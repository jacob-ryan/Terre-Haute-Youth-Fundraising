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
		public int addFrostyRegistration(WebFrostyRegistration webRegistration)
		{
			// Perhaps check if registration is enabled for this event (future?).
			if (true)
			{
				FrostyRegistration registration = new FrostyRegistration();
				registration.userId = webRegistration.userId;
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
	}
}