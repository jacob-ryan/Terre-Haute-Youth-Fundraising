$(document).ready(function()
{
	THYF = {};
	THYF.hideLoading = function()
	{
		$("#loading-overlay").fadeOut();
	};

	$.get("/site/header.html").done(function(header)
	{
		$("#main-header").html(header);
		$.get("/site/footer.html").done(function(footer)
		{
			$("#main-footer").html(footer);
			$.get("/site/signup.html").done(function(body)
			{
				$("#main-body").html(body);
				THYF.hideLoading();
			});
		});
	});
});