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
			"email": {
				required: true,
				maxlength: 255,
				email: true
			}
		}
	});

	var submit = function()
	{
		THYF.showLoading();
		$("#reset-unknown-error").slideUp();

		var data = {
			email: $("#email").val()
		};

		$.ajax({
			type: "POST",
			url: "/api/PasswordReset",
			contentType: "application/json",
			data: data ? JSON.stringify(data) : null,
			datatype: "json"
		}).done(function()
		{
			alert("Your password has been reset successfully.  Follow the link provided in your reset e-mail.");
			THYF.go("/login");
		}).fail(function(jqXHR, textStatus, error)
		{
			THYF.hideLoading();
			var message = jqXHR.responseJSON ? jqXHR.responseJSON.Message : "No details";
			$("#reset-unknown-error").slideDown();
			$("#reset-unknown-error > div").text(textStatus + " - " + message);
		});
	};

	THYF.hideLoading();
});