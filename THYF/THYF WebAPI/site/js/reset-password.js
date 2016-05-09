$(document).ready(function()
{
	$(".head2 a").removeClass("active");

	$("#reset-form").validate(
	{
		submitHandler: function()
		{
			submit();
		},
		rules: {
			"password": {
				required: true,
				maxlength: 255
			},
			"confirm-password": {
				required: true,
				maxlength: 255
			}
		}
	});

	THYF.showLoading("Checking link...");

	var data = {
		email: THYF.pageParams.email,
		password: THYF.pageParams.password,
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
		THYF.hideLoading();
	}).fail(function(status, statusText, message)
	{
		alert("Invalid link (or temporary password has expired).");
		THYF.hideLoading();
	});

	var submit = function()
	{
		$("#reset-unknown-error").slideUp();

		if ($("#password").val() != $("#confirm-password").val())
		{
			alert("Your passwords do not match.");
			return;
		}

		THYF.showLoading();

		$.ajax({
			type: "GET",
			url: "/api/Login",
			contentType: "application/json",
			datatype: "json"
		}).done(function(user)
		{
			user.newPassword = $("#password").val();

			$.ajax({
				type: "PUT",
				url: "/api/User/" + user.id,
				contentType: "application/json",
				data: data ? JSON.stringify(user) : null,
				datatype: "json"
			}).done(function()
			{
				THYF.go("/login");
			}).fail(function(jqXHR, textStatus, error)
			{
				THYF.hideLoading();
				var message = jqXHR.responseJSON ? jqXHR.responseJSON.Message : "No details";
				$("#reset-unknown-error").slideDown();
				$("#reset-unknown-error > div").text(textStatus + " - " + message);
			});
		}).fail(function(jqXHR, textStatus, error)
		{
			THYF.hideLoading();
			var message = jqXHR.responseJSON ? jqXHR.responseJSON.Message : "No details";
			$("#reset-unknown-error").slideDown();
			$("#reset-unknown-error > div").text(textStatus + " - " + message);
		});
	};
});