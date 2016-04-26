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
		}).done(function(data)
		{
			$.ajax({
				type: "GET",
				url: "/api/Login",
				contentType: "application/json",
				datatype: "json"
			}).done(function(user)
			{
				$("#logged-in").html("<span class='badge badge-default'>" + user.name + "</span>");
				$("#logged-in-block").show();
				$("#notlogged-in-block").hide();
				if (user.type === "admin")
				{
					$("#admin-link").parent().show();
					THYF.go("/admin-home");
				}
				else
				{
				    $("#user_event").parent().show();
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