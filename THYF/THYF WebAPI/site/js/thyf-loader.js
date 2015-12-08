$(document).ready(function()
{
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

	THYF.initRoutes().done(function()
	{
		$.get("/site/header.html").done(function(header)
		{
			$("#main-header").html(header);
			$.get("/site/footer.html").done(function(footer)
			{
				$("#main-footer").html(footer);
				THYF.go(THYF.getPath());
			});
		});
	});
});