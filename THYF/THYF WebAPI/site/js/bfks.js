$(document).ready(function()
{
	$("#btnOne").on("click", function(e)
	{
		e.preventDefault();
//		var data = {
//			email: $("#emailOne").val()
//		};

		$.ajax({
			type: "POST",
			url: "/api/User?email=" + $("#emailOne").val(),
			contentType: "application/json",
		}).done(function(data)
		{
			alert("Registration Successful!\nReturned: '" + data.name + "'");
		});
	});
	THYF.hideLoading()
});