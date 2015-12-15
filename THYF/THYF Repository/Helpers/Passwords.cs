using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using THYF_Repository.Models;

namespace THYF_Repository.Helpers
{
	// *** NOTE: Do not modify code in this class (and, if necessary, after code review).
	// Otherwise user passwords may be stored insecurely (and possibly exposed).

	public class Passwords
	{
		public static bool authenticateUser(User user, string password)
		{
			bool result;

			if (user.passwordIterations > 0)
			{
				using (DeriveBytes pbkdf2 = new Rfc2898DeriveBytes(password, user.passwordSalt, user.passwordIterations))
				{
					byte[] test = pbkdf2.GetBytes(160 / 8);
					result = test.SequenceEqual(user.passwordHash);
				}
			}
			else
			{
				using (DeriveBytes pbkdf2 = new Rfc2898DeriveBytes(password, user.passwordSalt))
				{
					byte[] test = pbkdf2.GetBytes(64);
					result = test.SequenceEqual(user.passwordHash);
				}
			}

			if (result && user.passwordIterations < getIdealIterationCount())
			{
				updateUserPassword(user, password);
			}

			return result;
		}

		public static void updateUserPassword(User user, string password)
		{
			using (RandomNumberGenerator rng = new RNGCryptoServiceProvider())
			{
				user.passwordSalt = new byte[160 / 8];
				rng.GetBytes(user.passwordSalt);
				user.passwordIterations = getIdealIterationCount();
				using (DeriveBytes pbkdf2 = new Rfc2898DeriveBytes(password, user.passwordSalt, user.passwordIterations))
				{
					user.passwordHash = pbkdf2.GetBytes(20);
				}
			}
		}

		private static int getIdealIterationCount()
		{
			// Using a basis of 150,000 iterations in the year 2015
			// requires roughly 1200 ms of CPU time on Azure.
			// Assuming that CPU speeds double every 2.5 years
			// (an updated claim of Moore's Law), then the ideal number
			// of iterations will double every 2.5 years.  This formula
			// is used to keep hashing time roughly the same throughout
			// the future, updating the count every year.
			int count = 150000;
			int age = Math.Max(DateTime.UtcNow.Year - 2015, 0);
			double result = count * Math.Pow(2.0, age / 2.5);
			return (int) result;
		}

		public static string createRandomPassword()
		{
			using (RandomNumberGenerator seeder = new RNGCryptoServiceProvider())
			{
				byte[] array = new byte[4];
				seeder.GetBytes(array);
				int seed = BitConverter.ToInt32(array, 0);

				Random random = new Random(seed);
				char[] chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".ToCharArray();
				string result = "";
				for (int i = 0; i < 16; i += 1)
				{
					result += chars[random.Next(chars.Length)];
				}
				return result;
			}
		}
	}
}