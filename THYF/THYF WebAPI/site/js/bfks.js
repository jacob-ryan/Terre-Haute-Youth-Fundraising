$(document).ready(function()
{
	$("#btnOne").on("click", function(e)
	{
		e.preventDefault();
		var userList = []; 

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
			console.log(userList);
		});
	});
	THYF.hideLoading()
});