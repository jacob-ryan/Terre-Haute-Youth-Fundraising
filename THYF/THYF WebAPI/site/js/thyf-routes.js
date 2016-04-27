$(document).ready(function()
{
	THYF.initRoutes = function()
	{
		var defer = $.Deferred();

		var routes = [
			{
				path: "*",
				callbacks: function(request, respond, next)
				{
					THYF.showLoading();
					THYF.pageParams = null;
					next();
				}
			},
			{
				path: "/",
				callbacks: function()
				{
					THYF.changePage("home.html");
				}
			},
			{
				path: "/frosty-5k",
				callbacks: function()
				{
					THYF.changePage("frosty-5k.html");
				}
			},
			{
				path: "/admin-home",
				callbacks: function()
				{
					THYF.changePage("admin-home.html");
				}
			},
			{
				path: "/registeredEvents",
				callbacks: function()
				{
					THYF.changePage("registeredEvents.html");
				}
			},
			{
				path: "/frosty-5k/registration",
				callbacks: function()
				{
					THYF.changePage("frosty-5k-registration.html");
				}
			},
			{
				path: "/bfks",
				callbacks: function()
				{
					THYF.changePage("bfks.html");
				}
			},
			{
				path: "/bfks/registration",
				callbacks: function()
				{
					THYF.changePage("bfks-registration.html");
				}
			},
			{
				path: "/donate",
				callbacks: function()
				{
					THYF.changePage("donate.html");
				}
			},
			{
				path: "/contact-us",
				callbacks: function()
				{
					THYF.changePage("contact-us.html");
				}
			},
			{
				path: "/sign-up",
				callbacks: function()
				{
					THYF.changePage("sign-up.html").done(function()
					{
						THYF.hideLoading();
					});
				}
			},
			{
				path: "/account/edit",
				callbacks: function()
				{
					THYF.changePage("account-edit.html");
				}
			},
			{
				path: "/login",
				callbacks: function()
				{
					THYF.changePage("login.html");
				}
			},
			/* Must be last!  This is the default route handler for invalid locations. */
			{
				path: "*",
				callbacks: function()
				{
					alert("The location you requested was invalid: " + THYF.getPath());
					THYF.hideLoading();
				}
			}
		];

		YUI({
			combine: false,
			base: "/site/js/plugins/yui.min/"
		}).use("router", function(Y)
		{
			var router = new Y.Router({
				html5: false,
				root: "/site/",
				routes: routes
			});

			THYF.go = function(location)
			{
				router.save(location);
			};

			THYF.getPath = function()
			{
				return router.getPath();
			};

			defer.resolve();
		});

		return defer.promise();
	};
});