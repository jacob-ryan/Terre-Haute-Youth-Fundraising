$(document).ready(function()
{
	$("#register").on("click", function()
	{
		$.ajax({
			type: "GET",
			url: "/api/Login",
			contentType: "application/json",
			datatype: "json"
		}).done(function(user)
		{
			THYF.go("/bfks/registration");
		}).fail(function()
		{
			alert("Please log in to register.");
		});
	});

	THYF.hideLoading();
});