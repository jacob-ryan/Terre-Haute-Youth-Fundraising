var registrationsGlobal = [];

$(document).ready(function () {

    THYF.hideLoading();
    var userData = [];
    var paypalTable;
    var eventTable;
    var checkedValues;
    var eventList = [];
    var eventType;
    var allRegistrations = [];
    var globalTable = [];
    var event;

    $.ajax({
        type: "GET",
        url: "/api/PayPalNotification",
        contentType: "application/json",
    }).done(function (d) {
        var paypalData = [];
        for (i = 0; i < d.length; i++) {
            var row = [];
            var n = d[i];
            var userInfo = n.authorization.user;
            row.push(n.transactionId, userInfo ? userInfo.email : "None", userInfo ? userInfo.name : "None", n.dateReceived, n.paymentFee, n.paymentGross, n.paymentStatus);
            paypalData.push(row);
        }
        paypalTable = $('#paypal').DataTable({
            "aaData": paypalData,
        });
    });

    // <summary>
    // Allows admin to create a new event within the Events tab
    // </summary>
    $("#createEventButton").on("click", function () {
        var dateObject = $("#datepickerID").val();
        //Need to do something with the hours here
        var hours = $("#timePicker").val();
        var data = {
            date: dateObject,
            type: $("#EventType").val(),
            isActive: $("#activeCreate").is(":checked"),
            description: $("#description").val()
        };
        $.ajax({
            type: "POST",
            url: "/api/EventOccurrence",
            contentType: "application/json",
            data: data ? JSON.stringify(data) : null,
            datatype: "json"
        }).done(function (data) {
            alert("Event Created");
        }).fail(function () {
            alert("Failed To Create Event");
        });
    });

    // <summary>
    // Marks all checked users as paid
    // </summary>
    $("#eventPay").on("click", function () {
        checkedValues = $('input:checkbox:checked').map(function () {
            return this.value;
        }).get()

        //console.log(checkedValues);
        //console.log(registrationsGlobal);
        for (var i = 0; i < checkedValues; i++) {
            for (var j = 0; j < registrationsGlobal.length; j++) {
                if (registrationsGlobal[j][0].id == checkedValues[i]) {
                    makeAPICalls(registrationsGlobal[j]);
                }
            }
        }
    });

    // <summary>
    // Populates existing event information when user click Edit Event
    // within the Events tab
    // </summary>
    $("#editEventButton").on("click", function () {
        $.ajax({
            type: "GET",
            url: "/api/EventOccurrence",
            contentType: "application/json",
        }).done(function (d) {

            for (var i = 0; i < d.length; i++) {
                if (d[i].id == ($("#selectEvent").val())) {
                    event = d[i];
                }
            }
            if (event.isActive) {
                $("#activeEdit").attr("checked", "checked");
            }

            $("#descriptionEvent").val(event.description);
        });
    });

    $("#updateEventButton").on("click", function () {
        var eventId = $("#selectEvent").val();
        if (eventId != null) {
            var data = {
                id: event.id,
                isActive: $("#activeEdit").is(":checked"),
                date: $("#datepickerID2").val(),
                type: event.type,
                description: $("#descriptionEvent").val()
            };
            $.ajax({
                type: "PUT",
                url: "/api/EventOccurrence/" + event.id,
                contentType: "application/json",
                data: data ? JSON.stringify(data) : null,
                datatype: "json"
            }).done(function () {
                alert("Event Updated");
            }).fail(function () {
                alert("Failed To Update Event");
            });
        }
    });
});

var EventApiCalls = function (userData) {
    // <summary>
    // Get's all event's from database and populates the event selector and
    // event table within the Events tab
    // </summary>

    //Create option to get see registrations for all Events
    $('#selectEvent')
                .append($("<option></option>")
                .attr("value", 0)
                .text("ALL EVENTS"));


    $.ajax({
        type: "GET",
        url: "/api/EventOccurrence",
        contentType: "application/json",
    }).done(function (d) {
        eventList = d;
        $.each(d, function (key, value) {
            $('#selectEvent')
                .append($("<option></option>")
                .attr("value", value.id)
                .text(value.type + ": ID - " + value.id + " - " + value.date));
        });
        var registrationsData = [];

        $.ajax({
            type: "GET",
            url: "/api/BFKSRegistration",
            contentType: "application/json",
        }).done(function (f) {
            var checkDataTemp = [];
            for (i = 0; i < f.length; i++) {
                checkDataTemp[i] = [];
                registrationsData.push(f[i]);
                checkDataTemp[i].push(f[i]);
                checkDataTemp[i].push("bfks");
                registrationsGlobal.push(checkDataTemp[i]);
            }

            $.ajax({
                type: "GET",
                url: "/api/FrostyRegistration",
                contentType: "application/json",
            }).done(function (e) {
                //console.log(e);
                for (i = 0; i < e.length; i++) {
                    checkDataTemp[i] = [];
                    registrationsData.push(e[i]);
                    checkDataTemp[i].push(e[i]);
                    checkDataTemp[i].push("frosty");
                    registrationsGlobal.push(checkDataTemp[i]);
                }

                var temp = [];
                for (i = 0; i < registrationsData.length; i++) {
                    temp[i] = [];                     
                    var info = registrationsData[i];
                    var type = findEventType(info.eventOccurrenceId);                  
                    var user = findUserData(userData, info.userId);
                    var payCheck;
                    if (info.isPaid != true) {
                        payCheck = "<input class = 'boxes' type='checkbox' value='" + info.id + "'>";
                    } else {
                        payCheck = "X";
                    }

                    temp[i].push(info.eventOccurrenceId, type, info.userId, info.id, user[2], user[4], info.dateCreated, payCheck);
                }
                globalTable = temp;
              
                var eventTableData = [];
                eventTable = $('#eventUsers').DataTable({
                    "aaData": eventTableData,
                });

                eventTable.clear().draw();
                for (var i = 0; i < globalTable.length; i++) {
                    eventTableData.push(globalTable[i]);                                    
                }
                eventTable.rows.add(eventTableData);
                eventTable.columns.adjust().draw();
            });
        });
    });
}

function findEventType(eventOccId) {
    for (var i = 0; i < registrationsGlobal.length; i++) {
        if (registrationsGlobal[i][0].eventOccurrenceId == eventOccId) {
            return registrationsGlobal[i][1];
        }
    }
}

function findUserData(userData, userId) {
    for (var i = 0; i < userData.length; i++) {
        if (userData[i][1] == userId) {
            return userData[i];
        }
    }
    return -1;
}

// <summary>
// Refreshs information when event is selected with Events tab
// </summary>
function jsFunction() {
    var eventTableData = [];

    eventTable.clear().draw();
    if ($("#selectEvent").val() == 0) {
        for (var i = 0; i < globalTable.length; i++) {
            eventTableData.push(globalTable[i]);          
        }
        eventTable.rows.add(eventTableData);
    } else {
        for (var i = 0; i < globalTable.length; i++) {
            if (globalTable[i][0] == $("#selectEvent").val()) {
                eventTableData.push(globalTable[i]);             
            }
        }
        eventTable.rows.add(eventTableData);
    }
    eventTable.columns.adjust().draw();
}

// <summary>
// An extracted method API that is used to activate and deactivate
// users who have paid
// </summary>
function makeAPICalls(registration) {
    var info;

    info = {
        id: registration[0].id,
        eventOccurrenceId: registration[0].eventOccurrenceId,
        userId: registration[0].userId,
        isPaid: true,
        isMinor: registration[0].isMinor,
        dateCreated: registration[0].dateCreated
    };
    console.log(info);
    if (registration[1] == "frosty") {
        $.ajax({
            type: "PUT",
            url: "/api/FrostyRegistration/" + info.id,
            contentType: "application/json",
            datatype: "json"
        }).done(function (data) {
            location.reload();
        }).fail(function () {
            alert("Failed To Pay for Event");
        });

    } else {
        $.ajax({
            type: "PUT",
            url: "/api/BFKSRegistration" + info.id,
            contentType: "application/json",
            datatype: "json"
        }).done(function (data) {
            location.reload();
        }).fail(function () {
            alert("Failed To Pay for Event");
        });
    }
}
