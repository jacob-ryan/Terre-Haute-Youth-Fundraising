using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using THYF_Repository.Repositories;
using THYF_Web_Models.Models;
using THYF_WebAPI.Helpers;

namespace THYF_WebAPI.Controllers
{
	/// <summary>
	/// This API call does stuff.
	/// </summary>
	[EnableCors("*", "*", "*", SupportsCredentials = true)]
	public class PayPalAuthorizationController : BaseController
	{
		private PayPalAuthorizationRepo repo;

		public PayPalAuthorizationController()
		{
			this.repo = new PayPalAuthorizationRepo();
		}

		// POST api/PayPalAuthorization
		/// <summary>
		/// Blah.
		/// </summary>
		/// <param name="authorization">PayPalAuthorization - authorization type</param>
		/// <returns>string - GUID to use in "custom" field</returns>
		[AllowAnonymous]
		public HttpResponseMessage PostPayPalAuthorization(WebPayPalAuthorization authorization)
		{
			if (!ModelState.IsValid || authorization == null)
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
			}

			try
			{
				string guid = repo.createAuthorization(authorization, this.currentUserId);
				return Request.CreateResponse(HttpStatusCode.OK, guid);
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