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
				maxlength: 2
			},
			"zip": {
				required: true,
				maxlength: 5
			},
			"phone": {
				required: true,
				maxlength: 23 // 23 characters represents longest form, e.g.: "1 (123) 456-7890 ext. 1234"
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

	var submit = function()
	{
		THYF.showLoading();
		$("#sign-up-duplicate-email").slideUp();
		$("#sign-up-unknown-error").slideUp();

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

		$.ajax({
			type: "POST",
			url: "/api/User",
			contentType: "application/json",
			data: data ? JSON.stringify(data) : null,
			datatype: "json"
		}).done(function(data)
		{
			alert("You have successfully signed-up!  Please login to continue.");
			THYF.go("/login");
		}).fail(function(jqXHR, textStatus, error)
		{
			THYF.hideLoading();
			var message = jqXHR.responseJSON ? jqXHR.responseJSON.Message : "No details";
			if (message === "Email address is already in use")
			{
				$("#sign-up-duplicate-email").slideDown();
			}
			else
			{
				$("#sign-up-unknown-error").slideDown();
				$("#sign-up-unknown-error > div").text(textStatus + " - " + message);
			}
		});
	};

	$("#type").on("change", function()
	{
		var current = $("#type").val();
		if (current == "volunteer")
		{
			$("#volunteer_sec").show();
			$("#company_sec").hide();
		}
		else if (current == "company")
		{
			$("#volunteer_sec").hide();
			$("#company_sec").show();
		}
	})
});