using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using THYF_Repository.Repositories;
using THYF_Web_Models.Models;
using THYF_WebAPI.Helpers;

namespace THYF_WebAPI.Controllers
{
	/// <summary>
	/// This API call allows anonymous users to submit e-mails via the
	/// site's Contact Us page (currently to "hmullenix@casyonline.org").
	/// </summary>
	public class ContactUsController : BaseController
	{
		private ContactUsRepo repo;

		public ContactUsController()
		{
			this.repo = new ContactUsRepo();
		}

		// POST api/ContactUs
		/// <summary>
		/// Sends an e-mail to "hmullenix@casyonline.org" with the information in the given ContactUs object.
		/// </summary>
		/// <param name="contactUs">ContactUs - contact info</param>
		/// <returns>Nothing</returns>
		[AllowAnonymous]
		public HttpResponseMessage Post(WebContactUs contactUs)
		{
			if (!ModelState.IsValid || contactUs == null)
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
			}

			try
			{
				repo.sendContactUs(this.currentUserId, GetIPAddress.Get(this.Request), contactUs);
				return Request.CreateResponse(HttpStatusCode.Created);
			}
			catch (Exception e)
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, e);
			}
		}

		protected override void Dispose(bool disposing)
		{
			if (disposing)
			{
				this.repo.Dispose();
			}
			base.Dispose(disposing);
		}
	}
}