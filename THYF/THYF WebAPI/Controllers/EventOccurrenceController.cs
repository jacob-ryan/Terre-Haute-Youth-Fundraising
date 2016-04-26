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
	/// This API call controls accessing and updating event occurrences,
	/// which represent dates when a given fundraising event will take place,
	/// of type "bfks" or "frosty".
	/// </summary>
	public class EventOccurrenceController : BaseController
	{
		private EventOccurrenceRepo repo;

		public EventOccurrenceController()
		{
			this.repo = new EventOccurrenceRepo(this.currentUserId);
		}

		// GET api/EventOccurrence
		/// <summary>
		/// Returns all EventOccurrences currently available.
		/// </summary>
		/// <returns>EventOccurrence[] - all eventOccurrences</returns>
		[Authorize]
		public HttpResponseMessage GetEventOccurrences()
		{
			try
			{
				List<WebEventOccurrence> eventOccurrences = repo.getEventOccurrences();
				return Request.CreateResponse(HttpStatusCode.OK, eventOccurrences);
			}
			catch (Exception e)
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, e);
			}
		}

		// GET api/EventOccurrence/5
		/// <summary>
		/// Returns the EventOccurrence with the given ID.
		/// </summary>
		/// <param name="id">int - ID</param>
		/// <returns>EventOccurrence - selected eventOccurrence</returns>
		[Authorize]
		public HttpResponseMessage GetEventOccurrence(int id)
		{
			try
			{
				WebEventOccurrence eventOccurrence = repo.getEventOccurrence(id);
				return Request.CreateResponse(HttpStatusCode.OK, eventOccurrence);
			}
			catch (Exception e)
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, e);
			}
		}

		// PUT api/EventOccurrence/5
		/// <summary>
		/// Updates the EventOccurrence with the given ID with the information in the given EventOccurrence object.
		/// </summary>
		/// <param name="id">int - ID</param>
		/// <param name="eventOccurrence">EventOccurrence - eventOccurrence info</param>
		/// <returns>int - ID</returns>
		[Authorize]
		public HttpResponseMessage PutEventOccurrence(int id, WebEventOccurrence eventOccurrence)
		{
			if (!ModelState.IsValid || eventOccurrence == null || id != eventOccurrence.id)
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
			}

			try
			{
				repo.updateEventOccurrence(id, eventOccurrence);
				return Request.CreateResponse(HttpStatusCode.OK, id);
			}
			catch (Exception e)
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, e);
			}
		}

		// POST api/EventOccurrence
		/// <summary>
		/// Adds a new EventOccurrence with the information in the given EventOccurrence object.
		/// </summary>
		/// <param name="eventOccurrence">EventOccurrence - eventOccurrence info</param>
		/// <returns>int - ID</returns>
		[Authorize]
		public HttpResponseMessage PostEventOccurrence(WebEventOccurrence eventOccurrence)
		{
			if (!ModelState.IsValid || eventOccurrence == null)
			{
				return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
			}

			try
			{
				int id = repo.addEventOccurrence(eventOccurrence);
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