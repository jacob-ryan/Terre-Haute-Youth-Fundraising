$(document).ready(function () {
    var data;
    $.ajax({
        type: "GET",
        url: "/api/Login",
        contentType: "application/json",
        datatype: "json"
    }).done(function (user) {
        $("#newPass").val(user.password);
        $("#email").val(user.email);
        $("#name").val(user.name);
        $("#address").val(user.address);
        $("#city").val(user.city);
        $("#state").val(user.state);
        $("#zip").val(user.zip);
        $("#phone").val(user.phone);
        $("#year").val(user.year);
        $("#t-shirt").val(user.tshirtSize);
        $("#company").val(user.companyName);
        data = user;
       // console.log(data);

        if (user.companyName == "") {
            $("#volunteer_sec").show();
            $("#company_sec").hide();
        } else {
            $("#volunteer_sec").hide();
            $("#company_sec").show();
        }
        THYF.hideLoading();
    });

    $("#updateForm").validate({
        rules: {
            "email": {
                required: true,
                maxlength: 255,
                email: true
            },
            "password": {
                required: true,
                maxlength: 255
            },
            "password-check": {
                required: true,
                maxlength: 255
            },
            "name": {
                required: true,
                maxlength: 255
            },
            "address": {
                required: true,
                maxlength: 255
            },
            "city": {
                required: true,
                maxlength: 255
            },
            "state": {
                required: true,
                maxlength: 2
            },
            "zip": {
                required: true,
                maxlength: 5
            },
            "phone": {
                required: true,
                maxlength: 23 // 23 characters represents longest form, e.g.: "1 (123) 456-7890 ext. 1234"
            },
            "year": {
                required: true,
                maxlength: 255
            },
            "type": {
                required: true,
                maxlength: 255
            },
            "t-shirt": {
                required: false,
                maxlength: 255
            },
            "company_name": {
                required: false,
                maxlength: 255
            }
        }
    });

    $("#update").on("click", function (e) {
        e.preventDefault();
        $("#updateForm").valid();
        THYF.showLoading();
        $("#sign-up-duplicate-email").slideUp();
        $("#infoUpdated").slideUp();
        $("#sign-up-unknown-error").slideUp();
        var newPass = $("#password").val();
        var newPassCheck = $("#passwordCheck").val();
        var newName = $("#name").val();
        var newEmail = $("#email").val();
        var newAddress = $("#address").val();
        var newCity = $("#city").val();
        var newState = $("#state").val();
        var newZip = $("#zip").val();
        var newPhone = $("#phone").val();
        var newSize = $("#t-shirt").val();
        var newCompany = $("#company").val();

        if (newPass != newPassCheck) {
            var newPassElement = document.getElementById("password");
            var newPassCheckElement = document.getElementById("passwordCheck");
            newPassElement.style.backgroundColor = "#C0C0C0";
            newPassCheckElement.style.backgroundColor = "#C0C0C0";
            alert("New Passwords do no match!");
        } else if (isEmptyOrSpaces(newPass)) {
            alert("Password cannot be blank!");
        } else {
            data.name = newName
            data.email = newEmail;
            data.address = newAddress
            data.city = newCity;
            data.state = newState;
            data.zip = newZip;
            data.phone = newPhone;
            data.tshirtSize = newSize;
            data.company = newCompany;

            console.log(data);

            $.ajax({
                type: "PUT",
                url: "/api/User/" + data.id,
                contentType: "application/json",
                data: data ? JSON.stringify(data) : null,
                datatype: "json"
            }).done(function (data) {
               THYF.hideLoading();
               $("#logged-in").html("<span class='badge badge-default'>" + newName + "</span>");
               $("#infoUpdated").slideDown();
            }).fail(function (jqXHR, textStatus, error) {
                THYF.hideLoading();
                $("#infoUpdated").slideUp();
                var message = jqXHR.responseJSON ? jqXHR.responseJSON.Message : "No details";
                if (message === "Email address is already in use") {
                    $("#sign-up-duplicate-email").slideDown();
                }
                else {
                    $("#sign-up-unknown-error").slideDown();
                    $("#sign-up-unknown-error > div").text(textStatus + " - " + message);
                }
            });
        }
    });

    function isEmptyOrSpaces(str) {
        return str === null || str.match(/^ *$/) !== null;
    }
});