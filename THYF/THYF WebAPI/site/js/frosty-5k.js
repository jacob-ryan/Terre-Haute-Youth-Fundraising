$(document).ready(function () {
    THYF.hideLoading()
});

$(document).ready(function ()
{
	$("#submit").on("click", function (e)
	{
		var data = {
			isMinor: $("#age").is(":checked")
		};
		$.ajax({
			type: "POST",
			url: "/api/FrostyRegistration",
			contentType: "application/json",
			data: data ? JSON.stringify(data) : null,
			datatype: "json"
		}).done(function (data)
		{
		    alert("Registration Successful!\nReturned: '" + data + "'");
		    THYF.changePage("home.html");
		});
	});
});