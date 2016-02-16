$(document).ready(function ()
{
	//Click handlers
	$("#signout-link").on("click", function (e)
	{
		e.preventDefault();
		$.ajax({
			type: "DELETE",
			url: "/api/Login",
			contentType: "application/json",
			datatype: "json"
		}).done(function (data)
		{
			alert("Logged out successfully!\nReturned: '" + data + "'");
			logoutLabels();
		});
	});
	$("#home-link").on("click", function (e)
	{
		$("a").removeClass("active");
		$("#home-link").addClass("active");
	});
	$("#contact-us-link").on("click", function (e)
	{
		$("a").removeClass("active");
		$("#contact-us-link").addClass("active");
	});
	$("#donate-link").on("click", function (e)
	{
		$("a").removeClass("active");
		$("#donate-link").addClass("active");
	});
	$("#frosty-link").on("click", function (e)
	{
		$("a").removeClass("active");
		$("#frosty-link").addClass("active");
	});
	$("#bowl-link").on("click", function (e)
	{
		$("a").removeClass("active");
		$("#bowl-link").addClass("active");
	});
	//Helper functions
	var logoutLabels = function ()
	{
			$("#logged-in").text("");
			$("#logged-in-block").hide();
			$("#notlogged-in-block").show();
	};
	THYF.hideLoading();
});
