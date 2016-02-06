$(document).ready(function()
{
	THYF.hideLoading()
});

$("#registerButton").on("click", function(e)
{
	e.preventDefault();
	console.log("Register Button Pressed");
	$.ajax({
		type: "GET",
		url: "/api/Login",
		contentType: "application/json",
		datatype: "json"
	}).done(function(user)
	{
		if (user != null)
		{
			THYF.changePage("frosty-5k.html");
			console.log(user);
		}
		else
		{
			alert("Please Login to Register!");
		}
	});
});
