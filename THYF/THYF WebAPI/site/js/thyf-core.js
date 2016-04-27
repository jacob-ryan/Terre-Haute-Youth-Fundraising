$(document).ready(function()
{
	window.THYF = {};

	THYF.showLoading = function(status)
	{
		status = status || "Loading...";
		$("#loading-text").html(status);
		return $("#loading-overlay").fadeIn().promise();
	};

	THYF.hideLoading = function()
	{
		return $("#loading-overlay").fadeOut().promise();
	};

	THYF.changePage = function(location)
	{
		return THYF.getPage(location, true).done(function(page)
		{
			$("#main-body").empty();
			$("#main-body").html(page);
		});
	};

	THYF.getPage = function(location)
	{
		var result = $.Deferred();
		$.ajax({
			cache: true,
			url: "/site/" + location
		}).done(function(data)
		{
			result.resolve(data);
		}).fail(function(error)
		{
			alert(error.status + "\n" + error.statusText + "\n" + "Could not load the page at: " + location);
			result.reject(error.status, error.statusText, "Could not load the page at: " + location);
		});
		return result.promise();
	};

	THYF.performLogin = function()
	{
		var defer = $.Deferred();

		$.ajax({
			type: "GET",
			url: "/api/Login",
			contentType: "application/json",
			datatype: "json"
		}).done(function(user)
		{
			$("#logged-in").html("<span class='badge badge-default'>" + user.name + "</span>");
			$("#logged-in-block").show();
			$("#notlogged-in-block").hide();
			if (user.type === "admin")
			{
				$("#admin-link").parent().show();
			}
			else
			{
				$("#user_event").parent().show();
			}

			defer.resolve(user);
		}).fail(function()
		{
			defer.reject();
		});

		return defer.promise();
	};
});