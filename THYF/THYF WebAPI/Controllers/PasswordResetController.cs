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
	/// This API call allows a user to reset their password.
	/// </summary>
	public class PasswordResetController : BaseController
	{
		private PasswordResetRepo repo = new PasswordResetRepo();

		// POST api/PasswordReset
		/// <summary>
		/// Used to reset a user's password.
		/// </summary>
		/// <param name="login">Login - login information</param>
		/// <returns>int - user ID on success\n"BadRequest" on failure with one of the following messages: "Invalid username", "Invalid password", "Temporary password has expired", or "User not active"</returns>
		[AllowAnonymous]
		public HttpResponseMessage PostLogin(WebEmail email)
		{
			if (!ModelState.IsValid || email == null)
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
			}

			try
			{
				Random random = new Random();
				Thread.Sleep(random.Next(5000));
				repo.resetPassword(email.email);

				return Request.CreateResponse(HttpStatusCode.NoContent);
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