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
            $.post({
                url: "/api/Login",
                contentType: "application/json",
            data: data ? JSON.stringify(data) : null,
            datatype: "json"
        }).done(function(data)
        {
            alert("Logged in successfully!\nReturned: '" + data + "'");
        });
    });
});
