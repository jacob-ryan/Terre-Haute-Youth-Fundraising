$(document).ready(function () {
    THYF.hideLoading();
    var userEventsTable; 

    $.ajax({
        type: "GET",
        url: "/api/Login",
        contentType: "application/json",
        datatype: "json"
    }).done(function (user) {
        var activeId = user.id;
        console.log("User ID: " + activeId);

        $.ajax({
            type: "GET",
            url: "/api/FrostyRegistration?userId=" + activeId,
            contentType: "application/json",
        }).done(function (f) {
            console.log(f);
        });
    });
    //userEventsTable = $('#registeredFor').DataTable({
    //    "aaData": userData,
    //});
});