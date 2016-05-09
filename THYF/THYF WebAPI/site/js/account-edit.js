$(document).ready(function()
{
	var userId = null;

	$.ajax({
		type: "GET",
		url: "/api/Login",
		contentType: "application/json",
		datatype: "json"
	}).done(function(user)
	{
		userId = user.id;

		$("#email").val(user.email);
		$("#name").val(user.name);
		$("#address").val(user.address);
		$("#city").val(user.city);
		$("#state").val(user.state);
		$("#zip").val(user.zip);
		$("#phone").val(user.phone);
		$("#year").val(user.dateOfBirth);
		$("#type").val(user.type);
		$("#t-shirt").val(user.tshirtSize);
		$("#company").val(user.companyName);

		if (user.type == "volunteer")
		{
			$("#volunteer_sec").show();
			$("#company_sec").hide();
		}
		else
		{
			$("#volunteer_sec").hide();
			$("#company_sec").show();
		}
		THYF.hideLoading();
	});

	$("#updateForm").validate({
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
		$("#sign-up-duplicate-email").slideUp();
		$("#infoUpdated").slideUp();
		$("#sign-up-unknown-error").slideUp();

		if ($("#password").val() != $("#password-check").val())
		{
			alert("Your new passwords don't match.");
		}
		else
		{
			THYF.showLoading();

			var data = {
				id: userId,
				isActive: true,
				name: $("#name").val(),
				email: $("#email").val(),
				address: $("#address").val(),
				city: $("#city").val(),
				state: $("#state").val(),
				zip: $("#zip").val(),
				phone: $("#phone").val(),
				dateOfBirth: $("#year").val(),
				type: $("#type").val(),
				tshirtSize: $("#t-shirt").val(),
				companyName: $("#company_name").val(),
				newPassword: $("#password").val()
			};

			$.ajax({
				type: "PUT",
				url: "/api/User/" + userId,
				contentType: "application/json",
				data: data ? JSON.stringify(data) : null,
				datatype: "json"
			}).done(function()
			{
				$("#logged-in").html("<span class='badge badge-default'>" + data.name + "</span>");
				THYF.go("/");
			}).fail(function(jqXHR, textStatus, error)
			{
				THYF.hideLoading();
				$("#infoUpdated").slideUp();
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
		}
	};
});