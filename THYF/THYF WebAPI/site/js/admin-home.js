$(document).ready(function () {

    THYF.hideLoading();
    var userData = [];
    var table;
    var checkedValues;
    var eventList = [];

    // <summary>
    // Get's all event's from database and populates the event selector within the
    // Events tab
    // </summary>
     $.ajax({
        type: "GET",
        async: false,
        url: "/api/EventOccurrence",
        contentType: "application/json",
    }).done(function (d) {
        //console.log(d);
        eventList = d;
        $.each(d, function (key, value) {
            $('#selectEvent')
                .append($("<option></option>")
                .attr("value", value.id)
                .text(value.type + " " + value.date));
        });
    });
    //console.log(eventList);

    // <summary>
    // Creates the user table within the Users tab
    // </summary>
    $.ajax({
        type: "GET",
        url: "/api/User",
        contentType: "application/json",
    }).done(function (d) {
        var userArray = [];
        //console.log(d);
        for (i = 0; i < d.length; i++) {
            userData[i] = [];
            if (d[i].companyName === null || d[i].companyName == "") {
                d[i].companyName = "No Company";
            }
            userData[i].push("<input class = 'boxes' type='checkbox' value='" + d[i].id + "'>", d[i].id, d[i].name, d[i].isActive + "", d[i].email, d[i].type, d[i].address,
            d[i].city, d[i].state, d[i].zip, d[i].phone, d[i].tshirtSize, d[i].companyName + "", d[i].dateCreated + "");
        }
        //console.log(userData);

        table = $('#example').DataTable({
            "aaData": userData,
        });
    });

    // <summary>
    // Deactivates all the users selected within Users tab
    // </summary>
    $("#deactivate").on("click", function () {
        checkedValues = $('input:checkbox:checked').map(function () {
            return this.value;
        }).get()

        for (i = 0; i < checkedValues.length; i++) {
            //console.log(i);
            makeAPICalls(checkedValues[i], false);
        }
    });

    // <summary>
    // Activates all the users selected within Users tab
    // </summary>
    $("#activate").on("click", function () {
        checkedValues = $('input:checkbox:checked').map(function () {
            return this.value;
        }).get()

        for (i = 0; i < checkedValues.length; i++) {
            //console.log(i);
            makeAPICalls(checkedValues[i], true);
        }
    });


    // <summary>
    // Allows admin to create a new user within the Users tab
    // </summary>
    $("#addUser").on("click", function () {
        var userName = $("#userName").val();
        var userEmail = $("#userEmail").val();

        var data = {
            email: userName,
            newPassword: "change",
            name: userName,
            address: "change",
            city: "change",
            state: "IN",
            zip: "47804",
            phone: "change",
            year: "change",
            tshirtSize: "change",
            type: "volunteer",
            companyName: "change",
            isActive: true
        };

        //console.log(data);
        $.ajax({
            type: "POST",
            url: "/api/User",
            contentType: "application/json",
            data: data ? JSON.stringify(data) : null,
            datatype: "json"
        }).done(function (data) {
            alert("User Created" + data + "'");
        }).fail(function () {
            alert("Failed to Create User");
        });
    });


    // <summary>
    // Allows admin to create a new event within the Events tab
    // </summary>
    $("#createEventButton").on("click", function () {
        var data = {
            date: $("#datepickerID").val(),
            type: $("#EventType").val(),
            description: $("#description").val()
        };

        console.log(data);

        $.ajax({
            type: "POST",
            url: "/api/EventOccurrence",
            contentType: "application/json",
            data: data ? JSON.stringify(data) : null,
            datatype: "json"
        }).done(function (data) {
            console.log(data);
        });
    });

    // <summary>
    // Populates existing event information when user click Edit Event
    // within the Events tab
    // </summary>
    $("#editEventButton").on("click", function () {
        $("#descriptionEvent").val(eventList[$("#selectEvent").val() - 1].description);
        $("#datepickerID2").val(eventList[$("#selectEvent").val() - 1].date);
    });

    $("#updateEventButton").on("click", function () {
        var eventId = $("#selectEvent").val();       
        var data = {
            date: $("#datepickerID2").val(),
            type: eventList[eventId - 1].type,
            description: $("#descriptionEvent").val()
        };

        console.log(data);
        console.log(eventId);

        $.ajax({
            type: "PUT",
            url: "/api/EventOccurrence/" + eventId,
            contentType: "application/json",
            data: data ? JSON.stringify(data) : null,
            datatype: "json"
        }).fail(function () {
            alert("Failed To Update Event");
        });
    });

});

// <summary>
// An extracted method API that is used to activate and deactivate
// users with in User Tab
// </summary>
function makeAPICalls(userID, activateBoolean) {
    //console.log(userID);
    $.ajax({
        type: "GET",
        url: "/api/User/" + userID,
        contentType: "application/json",
        datatype: "json"
    }).done(function (data) {
        var userInfo = data;
        userInfo.isActive = activateBoolean;
        //console.log(userID);
        $.ajax({
            type: "PUT",
            url: "/api/User/" + userID,
            contentType: "application/json",
            data: data ? JSON.stringify(data) : null,
            datatype: "json"
        }).done(function (data) {
            location.reload();
        });
    }).fail(function () {
        alert("No user with that ID");
    });
}


// <summary>
// Refreshs information when event is selected with Events tab
// </summary>
function jsFunction() {
    //console.log("It works");
}