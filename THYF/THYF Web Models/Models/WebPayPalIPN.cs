namespace THYF_Web_Models.Models
{
	public class WebPayPalIPN
	{
		public string payer_id { get; set; }
		public string charset { get; set; }
		public string payment_gross { get; set; }
		public string parent_txn_id { get; set; }
		public string verify_sign { get; set; }
		public string txb_type { get; set; }
		public string payment_fee { get; set; }
		public string mc_currency { get; set; }
		public string reason_code { get; set; }
		public string payer_status { get; set; }
		public string mc_gross { get; set; }
		public string payment_date { get; set; }
		public string payment_status { get; set; }
		public string txn_id { get; set; }
		public string resend { get; set; }
		public string notify_version { get; set; }
		public string payer_email { get; set; }

		public string custom { get; set; }
	}
}