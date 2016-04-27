$(document).ready(function()
{
	$(".head2 a").removeClass("active");

	$("#login-form").validate(
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
			}
		}
	});

	var submit = function()
	{
		THYF.showLoading();
		$("#login-invalid-email").slideUp();
		$("#login-invalid-password").slideUp();
		$("#login-inactive-user").slideUp();
		$("#login-expired-password").slideUp();
		$("#login-unknown-error").slideUp();

		var data = {
			email: $("#email").val(),
			password: $("#password").val(),
			rememberMe: true
		};

		$.ajax({
			type: "POST",
			url: "/api/Login",
			contentType: "application/json",
			data: data ? JSON.stringify(data) : null,
			datatype: "json"
		}).done(function()
		{
			THYF.performLogin().done(function(user)
			{
				if (user.type === "admin")
				{
					THYF.go("/admin-home");
				}
				else
				{
					THYF.go("/");
				}
			});
		}).fail(function(jqXHR, textStatus, error)
		{
			THYF.hideLoading();
			var message = jqXHR.responseJSON ? jqXHR.responseJSON.Message : "No details";
			if (message === "Invalid email address")
			{
				$("#login-invalid-email").slideDown();
			}
			else if (message === "Invalid password")
			{
				$("#login-invalid-password").slideDown();
			}
			else if (message === "User not active")
			{
				$("#login-inactive-user").slideDown();
			}
			else if (message === "Temporary password has expired")
			{
				$("#login-expired-password").slideDown();
			}
			else
			{
				$("#login-unknown-error").slideDown();
				$("#login-unknown-error > div").text(textStatus + " - " + message);
			}
		});
	};

	THYF.hideLoading();
});