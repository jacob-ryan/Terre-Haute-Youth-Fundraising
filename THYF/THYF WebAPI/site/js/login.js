$(document).ready(function()
    {
        $("#login-button").on("click", function(e)
        {
            e.preventDefault();
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
        	alert("Logged in successfully!\nReturned: '" + data + "'");
        	loginLabels();
        });
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
        THYF.hideLoading();
});