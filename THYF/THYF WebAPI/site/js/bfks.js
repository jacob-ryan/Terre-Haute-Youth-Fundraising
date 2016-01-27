$(document).ready(function()
{
	var userList = [];
	var checkedEmails = [];
	$("#btnOne").on("click", function(e)
	{
		e.preventDefault();

		if ($.inArray($("#emailOne").val(), checkedEmails) != -1)
		{
			alert("Email " + $("#emailOne").val() + " already added");
		} else
		{

			$.ajax({
				type: "GET",
				url: "/api/User?email=" + $("#emailOne").val(),
				contentType: "application/json",
			}).done(function(data)
			{
				if (typeof data != 'undefined')
				{
					$("#nameOne").val(data.name);
					$("#shirtOne").val(data.tshirtSize);
				}
				userList.push(data);
				checkedEmails.push($("#emailOne").val());
				console.log(userList);
			});
		}
	});

	$("#btnTwo").on("click", function(e)
	{
		e.preventDefault();
		if ($.inArray($("#emailTwo").val(), checkedEmails) != -1)
		{
			alert("Email " + $("#emailTwo").val() + " already added");
		} else
		{
			$.ajax({
				type: "GET",
				url: "/api/User?email=" + $("#emailTwo").val(),
				contentType: "application/json",
			}).done(function(data)
			{
				if (typeof data != 'undefined')
				{
					$("#nameTwo").val(data.name);
					$("#shirtTwo").val(data.tshirtSize);
				}
				userList.push(data);
				checkedEmails.push($("#emailTwo").val());
				console.log(userList);
			});
		}
	});

	$("#btnThree").on("click", function(e)
	{
		e.preventDefault();
		if ($.inArray($("#emailThree").val(), checkedEmails) != -1)
		{
			alert("Email " + $("#emailThree").val() + " already added");
		} else
		{
			$.ajax({
				type: "GET",
				url: "/api/User?email=" + $("#emailThree").val(),
				contentType: "application/json",
			}).done(function(data)
			{
				if (typeof data != 'undefined')
				{
					$("#nameThree").val(data.name);
					$("#shirtThree").val(data.tshirtSize);
				}
				userList.push(data);
				checkedEmails.push($("#emailThree").val());
				console.log(userList);
			});
		}
	});

	$("#btnFour").on("click", function(e)
	{
		e.preventDefault();
		if ($.inArray($("#emailFour").val(), checkedEmails) != -1)
		{
			alert("Email " + $("#emailFour").val() + " already added");
		} else
		{
			$.ajax({
				type: "GET",
				url: "/api/User?email=" + $("#emailFour").val(),
				contentType: "application/json",
			}).done(function(data)
			{
				if (typeof data != 'undefined')
				{
					$("#nameFour").val(data.name);
					$("#shirtFour").val(data.tshirtSize);
				}
				userList.push(data);
				checkedEmails.push($("#emailFour").val());
				console.log(userList);
			});
		}
	});

	$("#submit").on("click", function(e)
	{

		var data = {
			teamName: $("#teamName").val(),
			teamCaptain: userList[1],
			bowlers: userList
		};

		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "api/BFKSRegistration",
			contentType: "application/json",
			data: data ? JSON.stringify(data) : null,
			datatype: "json"
		}).done(function(data)
		{
			alert("Team Registered\nReturned: '" + data + "'");
		});
		console.log(data);
	});


	THYF.hideLoading()
});