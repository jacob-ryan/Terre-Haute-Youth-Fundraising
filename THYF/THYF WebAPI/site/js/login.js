$(document).ready(function()
{
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

	var loginLabels = function()
	{
		$.ajax({
			type: "GET",
			url: "/api/Login",
			contentType: "application/json",
			datatype: "json"
		}).done(function(user)
		{
			$("#logged-in").text("User:" + user.name);
			$("#logged-in-block").show();
			$("#notlogged-in-block").hide();
		});
	};

	var submit = function()
	{
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
			alert("Logged in successfully!\nID = '" + data + "'");
			loginLabels();
		});
	};

	THYF.hideLoading();
});