﻿THYF.initRoutes = function()
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
			path: "/bowl-for-kids",
			callbacks: function()
			{
				THYF.changePage("bowl-for-kids.html");
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
				THYF.changePage("signup.html").done(function()
				{
					THYF.hideLoading();
				});
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
			}
		}
	];

	YUI({
		//combine: false,
		//base: "/site/js/yui/build/"
	}).use("router", function(Y)
	{
		var router = new Y.Router({
			html5: false,
			root: "/site/",
			routes: routes
		});

		THYF.go = function(location)
		{
			console.log("router.save = " + location);
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