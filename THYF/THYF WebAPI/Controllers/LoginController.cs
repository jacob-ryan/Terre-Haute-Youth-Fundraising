using System;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using System.Web.Security;
using THYF_Repository.Repositories;
using THYF_Web_Models.Models;

namespace THYF_WebAPI.Controllers
{
	/// <summary>
	/// This API call controls logging users in and out, and identifying the current user.
	/// </summary>
	public class LoginController : BaseController
	{
		private LoginRepo repo = new LoginRepo();

		// GET api/Login
		/// <summary>
		/// Finds and returns the currently logged in user.
		/// </summary>
		/// <returns>User - current user</returns>
		[Authorize]
		public HttpResponseMessage GetLogin()
		{
			using (UserRepo repo = new UserRepo())
			{
				try
				{
					WebUser user = repo.getUser(this.currentUserId, this.currentUserId);
					return Request.CreateResponse(HttpStatusCode.OK, user);
				}
				catch (Exception e)
				{
					return Request.CreateResponse(HttpStatusCode.BadRequest, e);
				}
			}
		}

		// POST api/Login
		/// <summary>
		/// Used to log in with the given Login object.
		/// </summary>
		/// <param name="login">Login - login information</param>
		/// <returns>int - user ID on success\n"BadRequest" on failure with one of the following messages: "Invalid username", "Invalid password", "Temporary password has expired", or "User not active"</returns>
		[AllowAnonymous]
		public HttpResponseMessage PostLogin(WebLogin login)
		{
			if (!ModelState.IsValid || login == null)
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
			}

			try
			{
				Random random = new Random();
				Thread.Sleep(random.Next(2000));
				int id = repo.attemptLogin(login);

				FormsAuthentication.SetAuthCookie(id.ToString(), login.rememberMe);
				return Request.CreateResponse(HttpStatusCode.Created, id);
			}
			catch (Exception e)
			{
				FormsAuthentication.SignOut();
				Thread.Sleep(2000);
				return Request.CreateResponse(HttpStatusCode.BadRequest, e);
			}
		}

		// DELETE api/Login
		/// <summary>
		/// Used to log out the current user.
		/// </summary>
		/// <returns>Nothing</returns>
		[Authorize]
		public HttpResponseMessage DeleteLogin()
		{
			FormsAuthentication.SignOut();
			return Request.CreateResponse(HttpStatusCode.NoContent);
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