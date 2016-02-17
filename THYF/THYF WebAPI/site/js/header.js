$(document).ready(function()
{
	$("#signout-link").on("click", function()
	{
		$.ajax({
			type: "DELETE",
			url: "/api/Login",
			contentType: "application/json",
			datatype: "json"
		}).done(function(data)
		{
			$("#logged-in").text("");
			$("#logged-in-block").hide();
			$("#notlogged-in-block").show();
			THYF.go("/login");
		});
	});

	$(".head2 a").on("click", function()
	{
		var element = $(this);
		$(".head2 a").removeClass("active");
		element.addClass("active");
	});
});