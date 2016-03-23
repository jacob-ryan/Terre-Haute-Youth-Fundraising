$(document).ready(function () {

    THYF.hideLoading();
    var userData = [];
    var table;

    $.ajax({
        type: "GET",
        url: "/api/User",
        contentType: "application/json",
    }).done(function (d) {
        var userArray = [];
        console.log(d);
        for (i = 0; i < d.length; i++) {
            userData[i] = [];
            if (d[i].companyName === null || d[i].companyName == "") {
                d[i].companyName = "No Company";
            }
            userData[i].push(d[i].id, d[i].name, d[i].isActive + "", d[i].email, d[i].type, d[i].address,
            d[i].city, d[i].state, d[i].zip, d[i].phone, d[i].tshirtSize, d[i].companyName + "", d[i].dateCreated + "");
        }
        console.log(userData);

        table = $('#example').DataTable({
            "aaData": userData,
        });
    });

    $("#deactivate").on("click", function () {
        var id = $("#userID").val();

        $.ajax({
            type: "GET",
            url: "/api/User/" + id,
            contentType: "application/json",
            datatype: "json"
        }).done(function(data){
            var userInfo = data;
            userInfo.isActive = false;

            $.ajax({
                type: "PUT",
                url: "/api/User/" + id,
                contentType: "application/json",
                data: data ? JSON.stringify(data) : null,
                datatype: "json"
            }).done(function (data) {
                alert("Test user is inactive");
            });


        }).fail(function()
        {
            alert("No user with that ID");
        });
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

       console.log(data);
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
});