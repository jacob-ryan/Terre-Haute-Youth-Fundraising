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
			alert("Logged out successfully!\nReturned: '" + data + "'");
			$("#logged-in").text("");
			$("#logged-in-block").hide();
			$("#notlogged-in-block").show();
		});
	});
});