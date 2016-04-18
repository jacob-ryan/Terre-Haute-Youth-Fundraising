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
				foreach (PayPalNotification notification in notifications)
				{
					WebPayPalNotification n = new WebPayPalNotification();
					n.id = notification.id;
					n.dateReceived = notification.dateReceived;
					n.transactionId = notification.transactionId;
					n.payerId = notification.payerId;
					n.paymentGross = notification.paymentGross;
					n.paymentFee = notification.paymentFee;
					n.mcCurrency = notification.mcCurrency;
					n.mcGross = notification.mcGross;
					n.reasonCode = notification.reasonCode;
					n.paymentDate = notification.paymentDate;
					n.paymentStatus = notification.paymentStatus;
					n.custom = notification.custom;
					result.Add(n);
				}
				return result;
			}
			else
			{
				throw new PermissionDeniedException();
			}
		}

		public void addNotification(WebPayPalIPN notification)
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

			n.custom = notification.custom;

			db.PayPalNotifications.Add(n);
			db.SaveChanges();
		}
	}
}