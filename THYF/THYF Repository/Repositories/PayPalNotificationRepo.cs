using System;
using System.Collections.Generic;
using System.Data.Entity;
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

				using (PayPalAuthorizationRepo authorizationRepo = new PayPalAuthorizationRepo())
				{
					foreach (PayPalNotification notification in notifications)
					{
						WebPayPalNotification webNotification = notification.convert();
						webNotification.authorization = authorizationRepo.getAuthorization(this.me, notification.custom);
						result.Add(webNotification);
					}
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

			updateRegistrationPayment(n);
		}

		private void updateRegistrationPayment(PayPalNotification notification)
		{
			PayPalAuthorization authorization = db.PayPalAuthorizations
				.Include(a => a.bfksRegistration)
				.Include(a => a.frostyRegistration)
				.SingleOrDefault(a => a.guid == notification.custom);
			if (authorization != null)
			{
				if (authorization.bfksRegistration != null)
				{
					authorization.bfksRegistration.isPaid = true;
				}
				if (authorization.frostyRegistration != null)
				{
					authorization.frostyRegistration.isPaid = true;
				}
				db.SaveChanges();
			}
		}
	}
}