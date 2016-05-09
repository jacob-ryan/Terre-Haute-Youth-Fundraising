$(document).ready(function () {

    var eventList = [];

    $.ajax({
        type: "GET",
        url: "/api/EventOccurrence",
        contentType: "application/json",
    }).done(function (d) {
        console.log(d);
        $.each(d, function (key, value) {
            if (value.type == "frosty" && value.isActive == true) {
                $('#occurrence')
                    .append($("<option></option>")
                    .attr("value", value.id)
                    .text(value.type + " " + value.date));
            }
        });
    });

    $("#submit").on("click", function (e) {
        var data = {
            eventOccurrenceId: $("#occurrence").val(),
            isMinor: $("#age").is(":checked")
        };
        $.ajax({
            type: "POST",
            url: "/api/FrostyRegistration",
            contentType: "application/json",
            data: data ? JSON.stringify(data) : null,
            datatype: "json"
        }).done(function (data) {
            alert("Registration Successful!\nReturned: '" + data + "'");
            THYF.changePage("home.html");
        }).fail(function () {
            alert("Failed to Register for event");
        });;
    });

    THYF.hideLoading();
});