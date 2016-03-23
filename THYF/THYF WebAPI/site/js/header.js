$(document).ready(function()
{
    $.ajax({
        type: "GET",
        url: "/api/Login",
        contentType: "application/json",
        datatype: "json"
    }).done(function (user) {
        if (user != "undefined") {
            $("#logged-in").html("<span class='badge badge-default'>" + user.name + "</span>");
            $("#logged-in-block").show();
            $("#notlogged-in-block").hide();
        }
    });

	$("#signout-link").on("click", function()
	{
		$.ajax({
			type: "DELETE",
			url: "/api/Login",
			contentType: "application/json",
			datatype: "json"
		}).done(function(data)
		{
			$("#logged-in").text("");
			$("#logged-in-block").hide();
			$("#notlogged-in-block").show();
			THYF.go("/login");
		});
	});

	$(".head2 a").on("click", function()
	{
		var element = $(this);
		$(".head2 a").removeClass("active");
		element.addClass("active");
	});
	$(".header-top a").on("click", function ()
	{
		$(".head2 a").removeClass("active");
		$("#home-link").addClass("active");
	});
});