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
	/// This API call controls accessing and updating user information.
	/// It is *not* used for resetting passwords (see TBD-Controller).
	/// </summary>
	public class UserController : BaseController
	{
		private UserRepo repo;

		public UserController()
		{
			this.repo = new UserRepo();
		}

		// GET api/User
		/// <summary>
		/// Returns all users that the current user has access to view.
		/// </summary>
		/// <returns>User[] - all users</returns>
		[Authorize]
		public HttpResponseMessage GetUsers()
		{
			try
			{
				List<WebUser> users = repo.getUsers(this.currentUserId);
				return Request.CreateResponse(HttpStatusCode.OK, users);
			}
			catch (Exception e)
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, e);
			}
		}

		// GET api/User/5
		/// <summary>
		/// Returns the user with the given ID.
		/// </summary>
		/// <param name="id">int - ID</param>
		/// <returns>User - selected user</returns>
		[Authorize]
		public HttpResponseMessage GetUser(int id)
		{
			try
			{
				WebUser user = repo.getUser(this.currentUserId, id);
				return Request.CreateResponse(HttpStatusCode.OK, user);
			}
			catch (Exception e)
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, e);
			}
		}

		// PUT api/User/5
		/// <summary>
		/// Updates the user with the given ID with the information in the given User object.
		/// </summary>
		/// <param name="id">int - ID</param>
		/// <param name="user">User - user info</param>
		/// <returns>int - ID</returns>
		[Authorize]
		public HttpResponseMessage PutUser(int id, WebUser user)
		{
			if (!ModelState.IsValid || user == null || id != user.id)
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
			}

			try
			{
				repo.updateUser(this.currentUserId, id, user);
				return Request.CreateResponse(HttpStatusCode.OK, id);
			}
			catch (Exception e)
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, e);
			}
		}

		// POST api/User
		/// <summary>
		/// Adds a new user with the information in the given User object.
		/// </summary>
		/// <param name="user">User - user info</param>
		/// <returns>int - ID</returns>
		[AllowAnonymous]
		public HttpResponseMessage PostUser(WebUser user)
		{
			if (!ModelState.IsValid || user == null)
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
			}

			try
			{
				int id = repo.addUser(user);
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