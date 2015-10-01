using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using THYF_Web_Models.Models;

namespace THYF_Repository.Models
{
	public class BaseModel<T> where T : new()
	{
		public T convert()
		{
			BaseModel<T> src = this;
			T dst = new T();
			PropertyInfo[] srcProps = src.GetType().GetProperties(BindingFlags.Instance | BindingFlags.Public);
			PropertyInfo[] dstProps = dst.GetType().GetProperties(BindingFlags.Instance | BindingFlags.Public);

			foreach (PropertyInfo srcProp in srcProps.Where(p => p.Name != null))
			{
				foreach (PropertyInfo dstProp in dstProps.Where(p => p.Name != null))
				{
					if (srcProp.Name.ToLower() == dstProp.Name.ToLower())
					{
						if (srcProp.GetValue(src) != null)
						{
							Type listType = typeof(List<>);
							Type t = srcProp.PropertyType;
							if (t.IsGenericType && listType.IsAssignableFrom(t.GetGenericTypeDefinition()))
							{
								// Don't auto-convert List properties.
							}
							else
							{
								dstProp.SetValue(dst, srcProp.GetValue(src));
							}
						}
					}
				}
			}

			return dst;
		}
	}

	public static class ListExtensions
	{
		public static List<R> convertList<T, R>(this List<T> list) where T : BaseModel<R> where R : new()
		{
			List<R> result = new List<R>();
			foreach (T item in list)
			{
				result.Add(item.convert());
			}
			return result;
		}
	}
}