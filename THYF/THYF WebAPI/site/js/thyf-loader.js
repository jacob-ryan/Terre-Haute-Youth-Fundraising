$(document).ready(function()
{
	THYF.initRoutes().done(function()
	{
		var header = THYF.getPage("header.html");
		var footer = THYF.getPage("footer.html");
		$.when(header, footer).done(function(header, footer)
		{
			$("#main-header").html(header);
			$("#main-footer").html(footer);

			THYF.performLogin();
			THYF.go(THYF.getPath());
		});
	});
});