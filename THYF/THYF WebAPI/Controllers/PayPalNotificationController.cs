using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Threading.Tasks;
using System.Web.Http;
using THYF_Repository.Repositories;
using THYF_Web_Models.Models;
using THYF_WebAPI.Helpers;

namespace THYF_WebAPI.Controllers
{
	/// <summary>
	/// This API call serves as a web hook for PayPal's IPN notifications.
	/// </summary>
	public class PayPalNotificationController : BaseController
	{
		private PayPalNotificationRepo repo;

		public PayPalNotificationController()
		{
			this.repo = new PayPalNotificationRepo();
		}

		// GET api/PayPalNotification
		/// <summary>
		/// Blah.
		/// </summary>
		/// <returns>PayPalNotification[] - all notifications</returns>
		[Authorize]
		public HttpResponseMessage GetPayPalNotification()
		{
			if (!ModelState.IsValid)
			{
				return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ModelState);
			}

			try
			{
				List<WebPayPalNotification> notifications = repo.getNotifications(this.currentUserId);
				return Request.CreateResponse(HttpStatusCode.OK, notifications);
			}
			catch (Exception e)
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, e);
			}
		}

		// POST api/PayPalNotification
		/// <summary>
		/// Blah.
		/// </summary>
		/// <param name="notification">PayPalNotification - IPN notification content</param>
		/// <returns>Nothing</returns>
		[AllowAnonymous]
		public HttpResponseMessage PostPayPalNotification(WebPayPalIPN notification)
		{
			if (!ModelState.IsValid || notification == null)
			{
				return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ModelState);
			}

			try
			{
				repo.addNotification(notification);
				return Request.CreateResponse(HttpStatusCode.OK);
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