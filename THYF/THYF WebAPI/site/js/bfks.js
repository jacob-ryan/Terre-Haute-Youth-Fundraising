$(document).ready(function()
{
	$("#btnOne").on("click", function(e)
	{
		e.preventDefault();
		var data = {
			email: $("#emailOne").val()
		};

		$.ajax({
			type: "POST",
			url: "/api/BFKSBowler",
			contentType: "application/json",
			data: data ? JSON.stringify(data) : null,
			datatype: "json"
		}).done(function(data)
		{
			alert("Registration Successful!\nReturned: '" + data.name + "'");
		});
	});
	THYF.hideLoading()
});