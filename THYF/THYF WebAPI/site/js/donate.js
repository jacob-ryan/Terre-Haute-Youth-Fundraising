$(document).ready(function ()
{
	$("#anon-or-loggedin-call").on("click", function ()
	{
		var userInfo = null;
		$.ajax({
			type: "GET",
			url: "/api/Login",
			contentType: "application/json",
			datatype: "json"
		}).done(function (user)
		{
			userInfo = user;
		});

		if (!userInfo)
		{
			//Anonymous Call
			$.ajax({
				type: "POST",
				url: "http://localhost:8888/api/PaypalAuthorization",
				contentType: "application/json",
				datatype: "json",
				data: JSON.stringify({
					type: "Anonymous"
				})
			}).done(function (authorization)
			{
				$("input[name = 'custom']").val(authorization);
				$("#paypalform").submit();
			}).fail(function ()
			{
				alert("Call to Database failed.");
			});
		} else
		{
			//var email = userInfo.email;
			//var name = userInfo.name;
			//var userId = userInfo.userId;
			//var user = userInfo
			$.ajax({
				type: "POST",
				url: "http://localhost:8888/api/PaypalAuthorization",
				contentType: "application/json",
				datatype: "json",
				data: JSON.stringify({
					type: "Logged-in"
				})
			}).done(function (authorization)
			{
				$("input[name = 'custom']").val(authorization);
				$("#paypalform").submit();
			}).fail(function ()
			{
				alert("Call to Database failed.");
			});
		}
	});

	/*$.ajax({
		type: "POST",
		url: "https://api.sandbox.paypal.com/v1/payments/payment",
		contentType: "application/json",
		datatype: "json",
		data: JSON.Stringify({
			intent: "sale",
		payer: {
			payment_method: "paypal"
		},
		transactions: {
			amount: {
				total: "1.00",
				currency: "USD",
				details: {}
			},
		},
		description: "Donation to BBBS"})
	}).done(function (user)
	{
		alert(user);
	}).fail(function ()
	{
		alert("Please log in to register.");
	});*/
})