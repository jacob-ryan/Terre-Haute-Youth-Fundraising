using System;

namespace THYF_Repository.Helpers
{
	public class PermissionDeniedException : Exception
	{
		public PermissionDeniedException()
			: base("Permission denied")
		{
		}
	}
}