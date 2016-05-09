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
        //console.log("User ID: " + activeId);

        $.ajax({
            type: "GET",
            url: "/api/FrostyRegistration?userId=" + activeId,
            contentType: "application/json",
        }).done(function (f) {                 
            for(var i = 0; i < f.length; i++){
                registered.push(f[i]);
            }
            //console.log(registered);
            $.ajax({
                type: "GET",
                url: "/api/BFKSRegistration?userId=" + activeId,
                contentType: "application/json",
            }).done(function (b) {
                for(var i = 0; i < b.length; i++){
                    registered.push(b[i]);
                    //console.log(registered);
                }

                $.ajax({
                    type: "GET",
                    url: "/api/EventOccurrence",
                    contentType: "application/json",
                }).done(function (eventsOcc) {                   
                    console.log(eventsOcc);
                    console.log(registered);
                    
                    var deActButton = "<button type='button' disabled>Pay Now</button>"; 
                
                    for (var i = 0; i < registered.length; i++) {
                        for (var j = 0; j < eventsOcc.length; j++) {
                            if (registered[i].eventOccurrenceId == eventsOcc[j].id) {
                                if (registered[i].isPaid == false) {
                                    var activeButton = "<a href = #/event-payment/" + eventsOcc[j].id + "><button>Pay Now</button></a>";
                                    console.log(activeButton);
                                    userData.push(eventsOcc[j].type, eventsOcc[j].date, eventsOcc[j].description, registered[i].isPaid, activeButton);
                                } else {
                                    userData.push(eventsOcc[j].type, eventsOcc[j].date, eventsOcc[j].description, registered[i].isPaid, deActButton);
                                }                                                             
                            }
                        }
                    }

                    //userData[i].push("<input class = 'boxes' type='checkbox' value='" + d[i].id + "'>", d[i].id, d[i].name, d[i].isActive + "", d[i].email, d[i].type, d[i].address,
                    //d[i].city, d[i].state, d[i].zip, d[i].phone, d[i].tshirtSize, d[i].companyName + "", d[i].dateCreated + "");

                    console.log(userData);
                    var tableData = [];
                    tableData.push(userData);
                    userEventsTable = $('#registeredFor').DataTable({
                        "aaData": tableData,
                    });
                });
            });
        });
    });
});

