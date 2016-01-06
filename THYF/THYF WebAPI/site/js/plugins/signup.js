$(document).ready(function()
{
    $("#signup-button").on("click", function(e)
    {
        e.preventDefault();
        var data = {
            email: $("#email").val(),
            password: $("#password").val(),
            name: $("#name").val(),
            address: $("#address").val(),
            city: $("#city").val(),
            state: $("#state").val(),
            zip: $("#zip").val(),
            phone: $("#phone").val(),
            year: $("#year").val(),
            tshirt: $("#t-shirt").val(),
            rememberMe: true
        };
        $.post({
            url: "/api/User",
            contentType: "application/json",
        data: data ? JSON.stringify(data) : null,
        datatype: "json"
    }).done(function(data)
    {
        alert("Logged in successfully!\nReturned: '" + data + "'");
    });
});
});