using System;
using System.Web;
using System.Web.Http;
using System.Web.Security;

namespace THYF_WebAPI.Controllers
{
	public class BaseController : ApiController
	{
		public int currentUserId
		{
			get
			{
				if (HttpContext.Current.Request.IsAuthenticated)
				{
					try
					{
						return int.Parse(HttpContext.Current.User.Identity.Name);
					}
					catch (Exception)
					{
						// If the above parse happens to fail, force the user to log in again.
						FormsAuthentication.SignOut();
					}
				}
				System.Diagnostics.Debug.WriteLine("No current user exists because the request is not authenticated.");
				return -1;
			}
		}
	}
}