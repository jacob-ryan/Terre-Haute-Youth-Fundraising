$(document).ready(function () {

    THYF.hideLoading();

    $.ajax({
        type: "GET",
        url: "/api/User",
        contentType: "application/json",
        data: data ? JSON.stringify(data) : null,
        datatype: "json"
    }).done(function (data) {
        console.log("WTF");
    });

});