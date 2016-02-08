$(document).ready(function () {
    THYF.hideLoading();
});

$("#registerButton").on("click", function (e) {
    $.ajax({
        type: "GET",
        url: "/api/Login",
        contentType: "application/json",
        datatype: "json"
    }).done(function (user) {
        THYF.changePage("bowling_signup.html");
    }).fail(function () {
        alert("Please log in to register.");
    });
});