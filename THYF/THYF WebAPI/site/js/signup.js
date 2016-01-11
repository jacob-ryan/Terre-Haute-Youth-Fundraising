$(document).ready(function ()
{
	$("#signup-button").on("click", function (e)
	{
		e.preventDefault();
		var data = {
			email: $("#email").val(),
			newPassword: $("#password").val(),
			name: $("#name").val(),
			address: $("#address").val(),
			city: $("#city").val(),
			state: $("#state").val(),
			zip: $("#zip").val(),
			phone: $("#phone").val(),
			year: $("#year").val(),
			tshirt: $("#t-shirt").val(),
			type: $("#type").val(),
			companyName: $("#company_name").val(),
			isActive: true
		};
		$.ajax({
			type: "POST",
			url: "/api/User",
			contentType: "application/json",
			data: data ? JSON.stringify(data) : null,
			datatype: "json"
		}).done(function (data)
		{
			alert("Sign-up Successful!\nReturned: '" + data + "'");
		});
	});
	$("#type").on("change", function ()
	{
		var current = $("#type").val();
		if (current == "volunteer")
		{
			$("#volunteer_sec").show();
			$("#company_sec").hide();
		} else if (current == "company")
		{
			$("#volunteer_sec").hide();
			$("#company_sec").show();
		}
	})
});