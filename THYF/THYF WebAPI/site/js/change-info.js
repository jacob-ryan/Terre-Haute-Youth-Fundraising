﻿$(document).ready(function()
{
	var data; 
	$.ajax({
		type: "GET",
		url: "/api/Login",
		contentType: "application/json",
		datatype: "json"
	}).done(function(user)
	{
		$("#newPass").val(user.password);
		$("#name").val(user.name);
		$("#address").val(user.address);
		$("#city").val(user.city);
		$("#state").val(user.state);
		$("#zip").val(user.zip);
		$("#phone").val(user.phone);
		$("#year").val(user.year);
		$("#t-shirt").val(user.tshirtSize);
		data = user;
		console.log(data);
		THYF.hideLoading();
	});

	$("#update").on("click", function(e)
	{
		e.preventDefault();
		console.log("Button Pressed");
		var newPass = $("#password").val();
		var newPassCheck = $("#passwordCheck").val();
		var newName = $("#name").val();
		var newAddress = $("#address").val();
		var newCity = $("#city").val();
		var newState = $("#state").val();
		var newZip = $("#zip").val();
		var newPhone = $("#phone").val();
		var newSize = $("#t-shirt").val();

		if (newPass != newPassCheck)
		{
			var newPassElement = document.getElementById("password");
			var newPassCheckElement = document.getElementById("passwordCheck");
			newPassElement.style.backgroundColor = "#C0C0C0";
			newPassCheckElement.style.backgroundColor = "#C0C0C0";
			alert("New Passwords do no match!");
		} else
		{
			if (newPass == "")
			{
				data.newPassword = null;
			} else
			{
				data.newPassword = newPass;
			}
			alert("Passwords Matched!");
		}

		data.name = newName
		data.address = newAddress
		data.city = newCity;
		data.state = newState;
		data.zip = newZip;
		data.phone = newPhone;
		data.tshirtSize = newSize;

		console.log(data);

		$.ajax({
			type: "PUT",
			url: "/api/User/" + data.id,
			contentType: "application/json",
			data: data ? JSON.stringify(data) : null,
			datatype: "json"
		}).done(function(data)
		{
			alert("Information Updated!\nReturned: '" + data + "'");
		});
	});
});