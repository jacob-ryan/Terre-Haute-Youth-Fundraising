$(document).ready(function () {
    var userData = [];
    var table;
    var checkedValues;

    // <summary>
    // Creates the user table within the Users tab
    // </summary>
    $.ajax({
        type: "GET",
        url: "/api/User",
        contentType: "application/json",
    }).done(function (d) {
        var userArray = [];
        for (i = 0; i < d.length; i++) {
            userData[i] = [];
            if (d[i].companyName === null || d[i].companyName == "") {
                d[i].companyName = "No Company";
            }
            userData[i].push("<input class = 'boxes' type='checkbox' value='" + d[i].id + "'>", d[i].id, d[i].name, d[i].isActive + "", d[i].email, d[i].type, d[i].address,
            d[i].city, d[i].state, d[i].zip, d[i].phone, d[i].tshirtSize, d[i].companyName + "", d[i].dateCreated + "");
        }

        table = $('#example').DataTable({
            "aaData": userData,
        });
        EventApiCalls(userData);       
    });

    // <summary>
    // Deactivates all the users selected within Users tab
    // </summary>
    $("#deactivate").on("click", function () {
        checkedValues = $('input:checkbox:checked').map(function () {
            return this.value;
        }).get();

        for (i = 0; i < checkedValues.length; i++) {
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
            makeAPICalls(checkedValues[i], true);
        }
    });

    // <summary>
    // Allows admin to create a new user within the Users tab
    // </summary>
    $("#addUser").on("click", function () {
        THYF.showLoading();
        $("#sign-up-duplicate-email").slideUp();
        $("#sign-up-unknown-error").slideUp();

        var userName = $("#userName").val();
        var userEmail = $("#userEmail").val();

        var data = {
            email: userEmail,
            newPassword: "change",
            name: userName,
            address: "change",
            city: "change",
            state: "IN",
            zip: "00000",
            phone: "change",
            year: "change",
            tshirtSize: "change",
            type: "volunteer",
            companyName: "change",
            dateOfBirth: "change",
            isActive: true
        };

        $.ajax({
            type: "POST",
            url: "/api/User",
            contentType: "application/json",
            data: data ? JSON.stringify(data) : null,
            datatype: "json"
        }).done(function (data) {
            THYF.hideLoading();
            alert("User Created" + data + "'");
        }).fail(function (jqXHR, textStatus, error) {
            THYF.hideLoading();
            var message = jqXHR.responseJSON ? jqXHR.responseJSON.Message : "No details";
            if (message === "Email address is already in use") {
                $("#sign-up-duplicate-email").slideDown();
            }
            else {
                $("#sign-up-unknown-error").slideDown();
                $("#sign-up-unknown-error > div").text(textStatus + " - " + message);
            }
        });
    });

    // <summary>
    // An extracted method API that is used to activate and deactivate
    // users with in User Tab
    // </summary>
    function makeAPICalls(userID, activateBoolean) {
        $.ajax({
            type: "GET",
            url: "/api/User/" + userID,
            contentType: "application/json",
            datatype: "json"
        }).done(function (data) {
            var userInfo = data;
            userInfo.isActive = activateBoolean;
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
});