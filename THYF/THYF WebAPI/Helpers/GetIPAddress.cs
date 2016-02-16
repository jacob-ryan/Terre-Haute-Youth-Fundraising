using System.Net.Http;
using System.Web;

namespace THYF_WebAPI.Helpers
{
	// Copied from: http://stackoverflow.com/questions/9565889/get-the-ip-address-of-the-remote-host

	public class GetIPAddress
	{
		private const string HttpContext = "MS_HttpContext";
		private const string RemoteEndpointMessage =
			"System.ServiceModel.Channels.RemoteEndpointMessageProperty";
		private const string OwinContext = "MS_OwinContext";

		public static string Get(HttpRequestMessage request)
		{
			// Web-hosting
			if (request.Properties.ContainsKey(HttpContext))
			{
				HttpContextWrapper ctx =
					(HttpContextWrapper) request.Properties[HttpContext];
				if (ctx != null)
				{
					return ctx.Request.UserHostAddress;
				}
			}

			return null;
		}
	}
}