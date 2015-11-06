$(document).ready(function()
{
	$(".form-signup").on("submit", function(e)
	{
		e.preventDefault();

		var data = {
			email: $("#inputEmail").val(),
			name: $("#inputName").val()
		};
		$.post("/api/User", data).done(function()
		{
			alert("Account successfully created!");

			$.get("/api/User").done(function(users)
			{
				var text = "There are currently " + users.length + " users:";
				for (var i = 0; i < users.length; i += 1)
				{
					text += "\n" + users[i].name + " - " + users[i].email;
				}
				alert(text);
			});
		});
	});
});