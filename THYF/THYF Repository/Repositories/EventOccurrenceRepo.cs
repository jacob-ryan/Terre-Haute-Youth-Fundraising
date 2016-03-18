using System.Collections.Generic;
using System.Linq;
using THYF_Repository.Helpers;
using THYF_Repository.Models;
using THYF_Web_Models.Models;

namespace THYF_Repository.Repositories
{
	public class EventOccurrenceRepo : BaseRepo
	{
		public EventOccurrenceRepo(int currentUserId) : base(currentUserId)
		{
		}

		public List<WebEventOccurrence> getEventOccurrences()
		{
			List<EventOccurrence> eventOccurrences = db.EventOccurrences.ToList();
			return eventOccurrences.convertList<EventOccurrence, WebEventOccurrence>();
		}

		public WebEventOccurrence getEventOccurrence(int id)
		{
			EventOccurrence eventOccurrence = db.EventOccurrences.SingleOrDefault(u => u.id == id);
			if (eventOccurrence != null)
			{
				return eventOccurrence.convert();
			}
			else
			{
				throw new PermissionDeniedException();
			}
		}
		
		public void updateEventOccurrence(int id, WebEventOccurrence webEventOccurrence)
		{
			EventOccurrence eventOccurrence = db.EventOccurrences.SingleOrDefault(u => u.id == id);
			if (eventOccurrence != null && me.type == "admin")
			{
				eventOccurrence.type = webEventOccurrence.type;
				eventOccurrence.date = webEventOccurrence.date;
				eventOccurrence.description = webEventOccurrence.description;
				db.SaveChanges();
			}
			else
			{
				throw new PermissionDeniedException();
			}
		}

		public int addEventOccurrence(WebEventOccurrence webEventOccurrence)
		{
			if (me.type == "admin")
			{
				EventOccurrence eventOccurrence = new EventOccurrence();
				eventOccurrence.type = webEventOccurrence.type;
				eventOccurrence.date = webEventOccurrence.date;
				eventOccurrence.description = webEventOccurrence.description;
				db.EventOccurrences.Add(eventOccurrence);
				db.SaveChanges();

				return eventOccurrence.id;
			}
			else
			{
				throw new PermissionDeniedException();
			}
		}
	}
}