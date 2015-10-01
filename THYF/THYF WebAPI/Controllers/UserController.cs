using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using THYF_Repository.Repositories;
using THYF_Web_Models.Models;

namespace THYF_WebAPI.Controllers
{
	public class UserController : ApiController
	{
		private UserRepo repo;

		public UserController()
		{
			this.repo = new UserRepo();
		}

		// GET: api/User
		public HttpResponseMessage Get()
		{
			List<WebUser> webUsers = repo.getUsers();
			return Request.CreateResponse(HttpStatusCode.OK, webUsers);
		}

		// POST: api/User
		public HttpResponseMessage Post(WebUser webUser)
		{
			int id = repo.addUser(webUser);
			return Request.CreateResponse(HttpStatusCode.Created, id);
		}
	}
}