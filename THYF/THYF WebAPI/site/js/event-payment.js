$(document).ready(function ()
{
	$("#make-event-payment").on("click", function ()
	{
		var type =  THYF.pageParams.type;
		var registrationId = THYF.pageParams.registrationId;

		if (type === "frosty")
		{
			$.ajax({
				type: "POST",
				url: "/api/PaypalAuthorization",
				contentType: "application/json",
				datatype: "json",
				data: JSON.stringify({
					type: "Logged-in",
					frostyRegistrationId: registrationId
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
			$.ajax({
				type: "POST",
				url: "/api/PaypalAuthorization",
				contentType: "application/json",
				datatype: "json",
				data: JSON.stringify({
					type: "Logged-in",
					bfksRegistrationId: registrationId
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
})