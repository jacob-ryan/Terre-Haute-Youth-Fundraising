$(document).ready(function()
{
	$("#register").on("click", function()
	{
		var data = {
			isMinor: $("#age").is(":checked")
		};
		$.ajax({
			type: "GET",
			url: "/api/Login",
			contentType: "application/json",
			datatype: "json"
		}).done(function(user)
		{
			THYF.go("/frosty-5k/registration");
		}).fail(function()
		{
			alert("Please log in to register.");
		});
	});

	THYF.hideLoading();
});