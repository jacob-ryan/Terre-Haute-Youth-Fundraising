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
		$("#invalid-email-password").slideUp();

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
		    }).done(function (user) {
		        if (user.type == "admin") {
		            console.log("Logging into admin panel");
		            THYF.go("/admin-home");
		        }else{
		            $("#logged-in").html("<span class='badge badge-default'>" + user.name + "</span>");
		            $("#logged-in-block").show();
		            $("#notlogged-in-block").hide();
		            console.log("Logged in successfully: userId = " + data);
		            THYF.changePage("home.html");
		        }
		    });
		}).fail(function(jqXHR, textStatus, error)
		{
			THYF.hideLoading();
			var message = jqXHR.responseJSON.Message;
			if (message == "Invalid email address" || message == "Invalid password")
			{
				$("#invalid-email-password").slideDown();
			}
		});
	};

	THYF.hideLoading();
});