﻿using System;
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
	/// registrations for the Frosty 5K event.
	/// </summary>
	public class FrostyRegistrationController : BaseController
	{
		private FrostyRegistrationRepo repo;

		public FrostyRegistrationController()
		{
			this.repo = new FrostyRegistrationRepo(this.currentUserId);
		}

		// GET api/FrostyRegistration
		/// <summary>
		/// Gets all Frosty registrations.
		/// </summary>
		/// <returns>FrostyRegistration[] - all registrations</returns>
		[Authorize]
		public HttpResponseMessage Get()
		{
			try
			{
				List<WebFrostyRegistration> registrations = repo.getFrostyRegistrations();
				return Request.CreateResponse(HttpStatusCode.OK, registrations);
			}
			catch (Exception e)
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, e);
			}
		}

		// GET api/FrostyRegistration?userId=42
		/// <summary>
		/// Gets all Frosty registrations for the user with the given ID.
		/// </summary>
		/// <returns>FrostyRegistration[] - all registrations</returns>
		[Authorize]
		public HttpResponseMessage Get(int userId)
		{
			try
			{
				List<WebFrostyRegistration> registrations = repo.getFrostyRegistrations(userId);
				return Request.CreateResponse(HttpStatusCode.OK, registrations);
			}
			catch (Exception e)
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, e);
			}
		}

		// POST api/FrostyRegistration
		/// <summary>
		/// Adds a new Frosty registration with the information in the given FrostyRegistration object.
		/// </summary>
		/// <param name="registration">FrostyRegistration - registration info</param>
		/// <returns>int - ID</returns>
		[Authorize]
		public HttpResponseMessage Post(WebFrostyRegistration registration)
		{
			if (!ModelState.IsValid || registration == null)
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
			}

			try
			{
				int id = repo.addFrostyRegistration(registration);
				return Request.CreateResponse(HttpStatusCode.Created, id);
			}
			catch (Exception e)
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, e);
			}
		}

		// PUT api/FrostyRegistration/42
		/// <summary>
		/// Updates an existing Frosty registration with the information in the given FrostyRegistration object.
		/// </summary>
		/// <param name="id">int - registration ID</param>
		/// <param name="registration">FrostyRegistration - registration info</param>
		/// <returns>int - ID</returns>
		[Authorize]
		public HttpResponseMessage Put(int id, WebFrostyRegistration registration)
		{
			if (!ModelState.IsValid || registration == null || id != registration.id)
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
			}

			try
			{
				repo.updateFrostyRegistration(registration);
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