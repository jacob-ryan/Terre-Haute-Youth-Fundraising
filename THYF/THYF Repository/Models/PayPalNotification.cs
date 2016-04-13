using System;
using System.ComponentModel.DataAnnotations;

namespace THYF_Repository.Models
{
	public class PayPalNotification
	{
		public int id { get; set; }
		public DateTime dateReceived { get; set; }

		[MaxLength(1024)]
		public string transactionId { get; set; }
		[MaxLength(1024)]
		public string payerId { get; set; }
		[MaxLength(1024)]
		public string paymentGross { get; set; }
		[MaxLength(1024)]
		public string paymentFee { get; set; }
		[MaxLength(1024)]
		public string mcCurrency { get; set; }
		[MaxLength(1024)]
		public string mcGross { get; set; }
		[MaxLength(1024)]
		public string reasonCode { get; set; }
		[MaxLength(1024)]
		public string paymentDate { get; set; }
		[MaxLength(1024)]
		public string paymentStatus { get; set; }
	}
}