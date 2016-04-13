using System;
using System.Collections.Generic;
using System.Linq;
using THYF_Repository.Helpers;
using THYF_Repository.Models;
using THYF_Web_Models.Models;

namespace THYF_Repository.Repositories
{
	public class PayPalNotificationRepo : BaseRepo
	{
		public PayPalNotificationRepo()
		{
		}

		public List<WebPayPalNotification> getNotifications(int currentUserId)
		{
			this.me = getMe(currentUserId);

			if (me.type == "admin")
			{
				List<PayPalNotification> notifications = db.PayPalNotifications.ToList();
				List<WebPayPalNotification> result = new List<WebPayPalNotification>();
				foreach (PayPalNotification n in notifications)
				{
					WebPayPalNotification r = new WebPayPalNotification();
					// TODO: Decide on field names.
					result.Add(r);
				}
				return result;
			}
			else
			{
				throw new PermissionDeniedException();
			}
		}

		public void addNotification(WebPayPalNotification notification)
		{
			PayPalNotification n = new PayPalNotification();
			n.dateReceived = DateTime.UtcNow;
			n.transactionId = notification.txn_id;
			n.payerId = notification.payer_id;
			n.paymentGross = notification.payment_gross;
			n.paymentFee = notification.payment_fee;
			n.mcCurrency = notification.mc_currency;
			n.mcGross = notification.mc_gross;
			n.reasonCode = notification.reason_code;
			n.paymentDate = notification.payment_date;
			n.paymentStatus = notification.payment_status;

			db.PayPalNotifications.Add(n);
			db.SaveChanges();
		}
	}
}