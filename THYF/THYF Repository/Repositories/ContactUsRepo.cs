using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using THYF_Repository.Helpers;
using THYF_Repository.Models;
using THYF_Web_Models.Models;

namespace THYF_Repository.Repositories
{
	public class ContactUsRepo : BaseRepo
	{
		private static readonly string receiver = "hmullenix@casyonline.org";

		public void sendContactUs(int currentUserId, string ipAddress, WebContactUs webContactUs)
		{
			ContactUs contactUs = new ContactUs();
			contactUs.date = DateTime.UtcNow;
			contactUs.userId = currentUserId;
			contactUs.ipAddress = ipAddress;

			contactUs.firstName = webContactUs.firstName;
			contactUs.lastName = webContactUs.lastName;
			contactUs.emailAddress = webContactUs.emailAddress;
			contactUs.phone = webContactUs.phone;
			contactUs.message = webContactUs.message;

			db.ContactUsSubmissions.Add(contactUs);
			db.SaveChanges();

			Email.sendContactUs(receiver, contactUs);
		}
	}
}