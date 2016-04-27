$(document).ready(function()
{
	var submit = function()
	{
		THYF.showLoading();

		var data = {
			firstName: $("#contact-first-name").val(),
			lastName: $("#contact-last-name").val(),
			emailAddress: $("#contact-email").val(),
			phone: $("#contact-phone").val(),
			message: $("#contact-message").val()
		};

		$.ajax({
			type: "POST",
			url: "/api/ContactUs",
			contentType: "application/json",
			data: data ? JSON.stringify(data) : null,
			datatype: "json"
		}).done(function()
		{
			alert("Your contact request was received successfully.");
			THYF.go("/");
		});
	};

	$("#contact-form").validate(
	{
		submitHandler: function()
		{
			submit();
		},
		rules: {
			"contact-first-name": {
				required: true,
				maxlength: 255
			},
			"contact-last-name": {
				required: true,
				maxlength: 255
			},
			"contact-email": {
				required: true,
				maxlength: 255,
				email: true
			},
			"contact-phone": {
				required: false,
				maxlength: 23 // 23 characters represents longest form, e.g.: "1 (123) 456-7890 ext. 1234"
			},
			"contact-message": {
				required: true,
				minlength: 10,
				maxlength: 255
			}
		}
	});

	THYF.hideLoading();
});