$(document).ready(function()
{

	THYF.hideLoading();
	var userData = [];
	var table;
	var paypalTable;
	var eventTable;
	var checkedValues;
	var eventList = [];
	var eventType;
	var allRegistrations = [];


	// <summary>
    // Get's all event's from database and populates the event selector and
	// event table within the Events tab
	// </summary>
	$.ajax({
		type: "GET",
		url: "/api/EventOccurrence",
		contentType: "application/json",
	}).done(function(d)
	{
		//console.log(d);
		eventList = d;
		$.each(d, function(key, value)
		{
			$('#selectEvent')
                .append($("<option></option>")
                .attr("value", value.id)
                .text(value.type + " " + value.date));
		});
		//eventType = eventList[0].type;
		var registrationsData = [];

		$.ajax({
		    type: "GET",
		    url: "/api/BFKSRegistration",
		    contentType: "application/json",
		}).done(function (f) {
		    for (i = 0; i < f.length; i++) {
		        //console.log(f[i]);
		        registrationsData.push(f[i]);
		    }

		    $.ajax({
		        type: "GET",
		        url: "/api/FrostyRegistration",
		        contentType: "application/json",
		    }).done(function (e) {
		        for (i = 0; i < e.length; i++) {
		            //console.log(e[i]);
		            registrationsData.push(e[i]);
		        }
		        
                console.log(registrationsData);

		        var eventTableData = [];
                var temp = []
                for (i = 0; i < registrationsData.length; i++) {
                    var info = registrationsData[i];
                    temp.push(info.eventOccurrenceId, "Frosty 5K", info.userId, info.id, info.dateCreated);
                    
                }
                //temp.push("12", "Bowling", "1", "6", "November 5");
                eventTableData.push(temp);
		        eventTable = $('#eventUsers').DataTable({
		            "aaData": eventTableData,
		        });
		    });
		    
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
	}).done(function(d)
	{
		var userArray = [];
		//console.log(d);
		for (i = 0; i < d.length; i++)
		{
			userData[i] = [];
			if (d[i].companyName === null || d[i].companyName == "")
			{
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
	// Deactivates all the users selected within Users tab
	// </summary>
	$("#deactivate").on("click", function()
	{
		checkedValues = $('input:checkbox:checked').map(function()
		{
			return this.value;
		}).get()

		for (i = 0; i < checkedValues.length; i++)
		{
			//console.log(i);
			makeAPICalls(checkedValues[i], false);
		}
	});

	// <summary>
	// Activates all the users selected within Users tab
	// </summary>
	$("#activate").on("click", function()
	{
		checkedValues = $('input:checkbox:checked').map(function()
		{
			return this.value;
		}).get()

		for (i = 0; i < checkedValues.length; i++)
		{
			//console.log(i);
			makeAPICalls(checkedValues[i], true);
		}
	});


	// <summary>
	// Allows admin to create a new user within the Users tab
	// </summary>
	$("#addUser").on("click", function()
	{
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
		}).done(function(data)
		{
			alert("User Created" + data + "'");
		}).fail(function()
		{
			alert("Failed to Create User");
		});
	});


	// <summary>
	// Allows admin to create a new event within the Events tab
	// </summary>
	$("#createEventButton").on("click", function()
	{
	    var dateObject = $("#datepickerID").val();
        //Need to do something with the hours here
	    var hours = $("#timePicker").val();
		var data = {
			date: dateObject,
			type: $("#EventType").val(),
			description: $("#description").val()
		};

		//console.log(data);

		$.ajax({
			type: "POST",
			url: "/api/EventOccurrence",
			contentType: "application/json",
			data: data ? JSON.stringify(data) : null,
			datatype: "json"
		}).done(function(data)
		{
			//console.log(data);
		});
	});

	// <summary>
	// Populates existing event information when user click Edit Event
	// within the Events tab
	// </summary>
	$("#editEventButton").on("click", function()
	{
	    if(eventList.length != 0){
	      $("#descriptionEvent").val(eventList[$("#selectEvent").val() - 1].description);
	      $("#datepickerID2").val(eventList[$("#selectEvent").val() - 1].date);
	   }
        
        //Need date so I can populate hours field here
		//$("eventTimeEdit").val(eventList[$("#selectEvent").val() - 1);
	});

	$("#updateEventButton").on("click", function()
	{
	    var eventId = $("#selectEvent").val();
	    if (eventId != null) {
	        var data = {
	            id: eventId,
	            date: $("#datepickerID2").val(),
	            type: eventList[eventId - 1].type,
	            description: $("#descriptionEvent").val()
	        };

	        //console.log(data);
	        //console.log(eventId);

	        $.ajax({
	            type: "PUT",
	            url: "/api/EventOccurrence/" + eventId,
	            contentType: "application/json",
	            data: data ? JSON.stringify(data) : null,
	            datatype: "json"
	        }).fail(function () {
	            alert("Failed To Update Event");
	        });
	    }
	});
});

// <summary>
// An extracted method API that is used to activate and deactivate
// users with in User Tab
// </summary>
function makeAPICalls(userID, activateBoolean)
{
	//console.log(userID);
	$.ajax({
		type: "GET",
		url: "/api/User/" + userID,
		contentType: "application/json",
		datatype: "json"
	}).done(function(data)
	{
		var userInfo = data;
		userInfo.isActive = activateBoolean;
		//console.log(userID);
		$.ajax({
			type: "PUT",
			url: "/api/User/" + userID,
			contentType: "application/json",
			data: data ? JSON.stringify(data) : null,
			datatype: "json"
		}).done(function(data)
		{
			location.reload();
		});
	}).fail(function()
	{
		alert("No user with that ID");
	});
}


// <summary>
// Refreshs information when event is selected with Events tab
// </summary>
function jsFunction()
{
	//console.log("It works");
}