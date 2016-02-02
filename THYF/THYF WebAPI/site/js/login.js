$(document).ready(function()
    {
	$("#login-button").on("click", function(e)
	{
		//e.preventDefault();
		$("#login-form").validate(
			{
				submitHandler: function ()
				{
					submitLogic();
				},
				errorClass: "help-block animation-slideDown",
				errorElement: "div",
				errorPlacement: function (error, e)
				{
					e.parents(".form-group > div").append(error);
				},
				highlight: function (e)
				{
					$(e).closest(".form-group").removeClass("has-success has-error").addClass("has-error");
					$(e).closest(".help-block").remove();
				},
				success: function (e)
				{
					e.closest(".form-group").removeClass("has-success has-error");
					e.closest(".help-block").remove();
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
		alert("validation code");
	});
        var loginLabels = function ()
        {
        	alert("users");
        	$.ajax({
        		type: "GET",
        		url: "/api/Login",
        		contentType: "application/json",
        		datatype: "json"
        	}).done(function (user)
        	{
        		$("#logged-in").text("User:" + user.name);
        		$("#logged-in-block").show();
        		$("#notlogged-in-block").hide();
        	});
        };
        var submitLogic = function ()
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
        	}).done(function (data)
        	{
        		alert("Logged in successfully!\nReturned: '" + data + "'");
        		loginLabels();
        	});
        };
        THYF.hideLoading();
});