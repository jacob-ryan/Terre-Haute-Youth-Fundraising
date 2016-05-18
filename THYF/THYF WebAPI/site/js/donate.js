$(document).ready(function ()
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
		$("#anon-or-loggedin-call").text("Make Donation");
	}).fail(function ()
	{
		$("#anon-or-loggedin-call").text("Make Anonymous Donation");
	});
	$("#anon-or-loggedin-call").on("click", function ()
	{		
		if (!userInfo)
		{
			//Anonymous Call
			$.ajax({
				type: "POST",
				url: "/api/PaypalAuthorization",
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
			//Logged-in user call
			$.ajax({
				type: "POST",
				url: "/api/PaypalAuthorization",
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
	$("#emailcall").on("click", function ()
	{
		//E-mail call
		if (!userInfo)
		{
			var localemail = $("#email-email").val();
			var localname = $("#email-name").val();
			//alert(localname + " " + localemail);
			$.ajax({
				type: "POST",
				url: "/api/PaypalAuthorization",
				contentType: "application/json",
				datatype: "json",
				data: JSON.stringify({
					type: "Email",
					email: localemail,
					name: localname
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
		else
		{
			alert("Please log out to send e-mail/name donations.");
		}
	});
})