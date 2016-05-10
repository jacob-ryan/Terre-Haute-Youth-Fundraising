$(document).ready(function () {
    THYF.hideLoading();
    var userEventsTable;
    var userData = [];
    var registered = [];


    $.ajax({
        type: "GET",
        url: "/api/Login",
        contentType: "application/json",
        datatype: "json"
    }).done(function (user) {
        var activeId = user.id;

        $.ajax({
            type: "GET",
            url: "/api/FrostyRegistration?userId=" + activeId,
            contentType: "application/json",
        }).done(function (f) {                 
            for(var i = 0; i < f.length; i++){
                registered.push(f[i]);
            }
            $.ajax({
                type: "GET",
                url: "/api/BFKSRegistration?userId=" + activeId,
                contentType: "application/json",
            }).done(function (b) {
                for(var i = 0; i < b.length; i++){
                    registered.push(b[i]);
                }

                $.ajax({
                    type: "GET",
                    url: "/api/EventOccurrence",
                    contentType: "application/json",
                }).done(function (eventsOcc) {                                
                    var deActButton = "<button type='button' disabled>Pay Now</button>"; 
                    var temp = [];
                    //console.log(registered);
                    //console.log(eventsOcc);
                    var count = 0;
                    for (var i = 0; i < registered.length; i++) {
                        for (var j = 0; j < eventsOcc.length; j++) {
                            if (registered[i].eventOccurrenceId == eventsOcc[j].id) {
                                userData[count] = [];
                                if (registered[i].isPaid == false) {
                                    var activeButton = "<a href = #/event-payment/" + eventsOcc[j].id + "><button>Pay Now</button></a>";
                                    userData[count].push(eventsOcc[j].type, eventsOcc[j].date, eventsOcc[j].description, registered[i].isPaid, activeButton);
                                } else {
                                    userData[count].push(eventsOcc[j].type, eventsOcc[j].date, eventsOcc[j].description, registered[i].isPaid, deActButton);
                                }
                                count++;
                            }
                        }
                    }
                    userEventsTable = $('#registeredFor').DataTable({
                        "aaData": userData,
                    });
                });
            });
        });
    });
});

