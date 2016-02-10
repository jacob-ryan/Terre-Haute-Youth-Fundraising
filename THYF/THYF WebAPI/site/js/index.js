$(document).ready(function ()
{
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
	var logoutLabels = function ()
	{
			$("#logged-in").text("");
			$("#logged-in-block").hide();
			$("#notlogged-in-block").show();
	};
	THYF.hideLoading();
});
