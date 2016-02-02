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
			console.log("Made it");
		{
			$.ajax({
				type: "GET",
				url: "/api/User?email=" + $("#emailOne").val(),
				contentType: "application/json",
			}).done(function(call)
			{
				if (call != null)
				{
					$("#nameOne").val(call.name);
					$("#shirtOne").val(call.tshirtSize);
				}
				userList.push({
					userId: call.id,
					name: call.name,
					tshirt: call.tshirt,

				});
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
			}).done(function(call)
			{
				if (typeof call != 'undefined')
				{
					$("#nameTwo").val(call.name);
					$("#shirtTwo").val(call.tshirtSize);

					userList.push({
						userId: call.id,
						name: call.name,
						tshirt: call.tshirt,

					});
				}
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
			}).done(function(call)
			{
				if (typeof call != 'undefined')
				{
					$("#nameThree").val(call.name);
					$("#shirtThree").val(call.tshirtSize);
				}
				userList.push({
					userId: call.id,
					name: call.name,
					tshirt: call.tshirt,

				});
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
			}).done(function(call)
			{
				if (typeof call != 'undefined')
				{
					$("#nameFour").val(call.name);
					$("#shirtFour").val(call.tshirtSize);
				}
				userList.push({
					userId: call.id,
					name: call.name,
					tshirt: call.tshirt,

				});
				checkedEmails.push($("#emailFour").val());
				console.log(userList);
			});
		}
	});

	$("#submit").on("click", function(e)
	{
		var data = {
			teamName: $("#teamName").val(),
			teamCaptainId: userList[0].userId,
			bowlers: userList
		};

		console.log(data);

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