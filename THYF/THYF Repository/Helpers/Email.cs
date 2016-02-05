using System.IO;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using THYF_Web_Models.Models;

namespace THYF_Repository.Helpers
{
	public class Email
	{
		private static readonly string username = "bbbs.vigo@gmail.com";
		private static readonly string password = EmailSecret.password;
		private static readonly string mailServer = "smtp.gmail.com";

		public static void sendNewAccount(WebUser user)
		{
			string to = user.email;
			string subject = "Welcome " + user.name + " - BBBS of Vigo County";
			string body = "A new user account has been created for you.  You can log in using your e-mail address and password at: <a href='https://thyf.azurewebsites.net/' target='_blank'>https://thyf.azurewebsites.net/</a>.";
			sendEmail(to, subject, body, null, null);
		}

		private static void sendEmail(string to, string subject, string body, string attachmentName, Stream attachmentStream)
		{
			MailAddress mailFrom = new MailAddress(Email.username);
			MailAddress mailTo = new MailAddress(to);
			// NOTE: Override to address if debugging.
			#if DEBUG
			mailTo = new MailAddress(Email.username);
			#endif

			MailMessage email = new MailMessage(mailFrom, mailTo);
			email.Subject = subject;
			email.Body = body;
			email.IsBodyHtml = true;

			if (attachmentStream != null)
			{
				var attachment = new System.Net.Mail.Attachment(attachmentStream, MediaTypeNames.Text.Plain);
				attachment.Name = attachmentName;
				email.Attachments.Add(attachment);
			}

			ContentType mimeType = new ContentType("text/html");
			AlternateView view = AlternateView.CreateAlternateViewFromString(email.Body, mimeType);
			email.AlternateViews.Add(view);

			SmtpClient client = new SmtpClient(Email.mailServer);
			client.Timeout = 10;
			client.DeliveryMethod = SmtpDeliveryMethod.Network;
			client.Credentials = new NetworkCredential(Email.username, Email.password);
			client.Port = 587;
			client.EnableSsl = true;

			client.Send(email);
		}
	}
}