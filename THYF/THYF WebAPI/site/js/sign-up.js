$(document).ready(function()
{
	$(".head2 a").removeClass("active");

	$("#signup-form").validate(
	{
		submitHandler: function()
		{
			submit();
		},
		rules: {
			"email": {
				required: true,
				maxlength: 255,
				email: true
			},
			"password": {
				required: true,
				maxlength: 255
			},
			"password-check": {
				required: true,
				maxlength: 255
			},
			"name": {
				required: true,
				maxlength: 255
			},
			"address": {
				required: true,
				maxlength: 255
			},
			"city": {
				required: true,
				maxlength: 255
			},
			"state": {
				required: true,
				maxlength: 255
			},
			"zip": {
				required: true,
				maxlength: 255
			},
			"phone": {
				required: true,
				maxlength: 255
			},
			"year": {
				required: true,
				maxlength: 255
			},
			"type": {
				required: true,
				maxlength: 255
			},
			"t-shirt": {
				required: false,
				maxlength: 255
			},
			"company_name": {
				required: false,
				maxlength: 255
			}
		}
	});

	var submit = function(e)
	{
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
			tshirtSize: $("#t-shirt").val(),
			type: $("#type").val(),
			companyName: $("#company_name").val(),
			isActive: true
		};

		console.log(data.type);
		$.ajax({
			type: "POST",
			url: "/api/User",
			contentType: "application/json",
			data: data ? JSON.stringify(data) : null,
			datatype: "json"
		}).done(function(data)
		{
			alert("Sign-up Successful!\nReturned: '" + data + "'");
			THYF.changePage("home.html");
		});
	};

	$("#type").on("change", function()
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