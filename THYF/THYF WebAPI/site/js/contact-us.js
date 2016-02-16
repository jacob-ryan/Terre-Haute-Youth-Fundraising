$(document).ready(function()
{
	$("#submit").on("click", function(e)
	{
		var data = {
			firstName: $("#fname").val(),
			lastName: $("#lname").val(),
			emailAddress: $("#email").val(),
			phone: $("#phone").val(),
			message: $("#message").val()
		};
		console.log(data);
//		$.ajax({
//			type: "POST",
//			url: "/api/ContactUs",
//			contentType: "application/json",
//			data: data ? JSON.stringify(data) : null,
//			datatype: "json"
//		}).done(function(data)
//		{
//			alert("Information sent!");
//		});
	});

	THYF.hideLoading();
});