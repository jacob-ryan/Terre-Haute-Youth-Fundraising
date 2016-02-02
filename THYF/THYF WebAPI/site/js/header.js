$(document).ready(function ()
{
	$("#logout-link").on("click", function (e)
	{
		$.ajax({
			type: "DELETE",
			url: "/api/Login",
			contentType: "application/json",
			datatype: "json"
		}).done(function ()
		{
			$("#logged-in").text("");
			$("#logged-in-block").hide();
			$("#notlogged-in-block").show();
			alert("Logged out successfully!");
		});
	});
	var logoutLabels = function ()
	{
		$.ajax({
			type: "DELETE",
			url: "/api/Login",
			contentType: "application/json",
			datatype: "json"
		}).done(function ()
		{
			$("#logged-in").text("");
			$("#logged-in-block").hide();
			$("#notlogged-in-block").show();
			alert("Logged out successfully!\nReturned: '" + data + "'");
		});
	};
	THYF.hideLoading();
});
