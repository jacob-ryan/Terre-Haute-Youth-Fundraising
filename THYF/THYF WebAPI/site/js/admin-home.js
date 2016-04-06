$(document).ready(function () {

    THYF.hideLoading();
    var userData = [];
    var table;
    var checkedValues;
    var eventList = [];

    $.ajax({
        type: "GET",
        url: "/api/EventOccurrence",
        contentType: "application/json",
    }).done(function (d) {
        console.log(d);
        $.each(d, function (key, value) {
            $('#selectEvent')
                .append($("<option></option>")
                .attr("value", value.id)
                .text(value.type));
        });
    });

    console.log(eventList);

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

    $("#deactivate").on("click", function () {
        checkedValues = $('input:checkbox:checked').map(function () {
            return this.value;
        }).get()

        for (i = 0; i < checkedValues.length; i++) {
            //console.log(i);
            makeAPICalls(checkedValues[i], false);
        }
    });

    $("#activate").on("click", function () {
        checkedValues = $('input:checkbox:checked').map(function () {
            return this.value;
        }).get()

        for (i = 0; i < checkedValues.length; i++) {
            //console.log(i);
            makeAPICalls(checkedValues[i], true);
        }
    });

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

});

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