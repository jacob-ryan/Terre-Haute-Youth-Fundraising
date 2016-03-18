using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using THYF_Repository.Repositories;
using THYF_Web_Models.Models;

namespace THYF_WebAPI.Controllers
{
	/// <summary>
	/// This API call controls submitting, updating, and accessing
	/// registrations for the Bowl For Kids' Sake (BFKS) event.
	/// </summary>
	public class BFKSRegistrationController : BaseController
	{
		private BFKSRegistrationRepo repo;

		public BFKSRegistrationController()
		{
			this.repo = new BFKSRegistrationRepo(this.currentUserId);
		}

		// GET api/BFKSRegistration
		/// <summary>
		/// Gets all BFKS registrations.
		/// </summary>
		/// <returns>BFKSRegistration[] - all registrations</returns>
		[Authorize]
		public HttpResponseMessage GetBFKSRegistrations()
		{
			try
			{
				List<WebBFKSRegistration> registrations = repo.getBFKSRegistrations();
				return Request.CreateResponse(HttpStatusCode.Created, registrations);
			}
			catch (Exception e)
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, e);
			}
		}

		// GET api/BFKSRegistration?userId=42
		/// <summary>
		/// Gets all BFKS registrations for the user with the given ID.
		/// </summary>
		/// <returns>BFKSRegistration[] - all registrations</returns>
		[Authorize]
		public HttpResponseMessage GetBFKSRegistrations(int userId)
		{
			try
			{
				List<WebBFKSRegistration> registrations = repo.getBFKSRegistrations(userId);
				return Request.CreateResponse(HttpStatusCode.Created, registrations);
			}
			catch (Exception e)
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, e);
			}
		}

		// POST api/BFKSRegistration
		/// <summary>
		/// Adds a new BFKS registration with the information in the given BFKSRegistration object.
		/// </summary>
		/// <param name="registration">BFKSRegistration - registration info</param>
		/// <returns>int - ID</returns>
		[Authorize]
		public HttpResponseMessage PostBFKSRegistration(WebBFKSRegistration registration)
		{
			if (!ModelState.IsValid || registration == null)
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
			}

			try
			{
				int id = repo.addBFKSRegistration(registration);
				return Request.CreateResponse(HttpStatusCode.Created, id);
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