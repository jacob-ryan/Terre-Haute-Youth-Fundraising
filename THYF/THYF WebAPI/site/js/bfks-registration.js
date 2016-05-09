$(document).ready(function()
{

    var eventList = [];

    $.ajax({
        type: "GET",
        url: "/api/EventOccurrence",
        contentType: "application/json",
    }).done(function (d) {
        console.log(d);
        $.each(d, function (key, value) {
            if (value.type == "Bowling for Kids") {
                $('#occurrence')
                    .append($("<option></option>")
                    .attr("value", value.id)
                    .text(value.type + " " + value.date));
            }
        });
    });

	$("#bowlers-container").on("click", ".js-check-user", function()
	{
		var number = $(this).attr("data-id");
		var email = $("#bowler-" + number + "-email").val();

		$.ajax({
			type: "GET",
			url: "/api/User?email=" + email,
			contentType: "application/json",
		}).done(function(user)
		{
			if (!user)
			{
				$("#bowler-" + number + "-email").css("background-color", "#FFCCCC");
			}
			else
			{
				$("#bowler-" + number + "-email").css("background-color", "#CCFFCC");
				$("#bowler-" + number + "-name").val(user.name);
				$("#bowler-" + number + "-tshirt").val(user.tshirtSize);
			}
		});
	});

	var init = function()
	{
		for (var i = 1; i < 6; i += 1)
		{
			var html = templateTeamMember(i);
			$("#bowlers-container").append(html);
		}
		addValidation();
		THYF.hideLoading();
	};

	var addValidation = function()
	{
		var generateRules = function()
		{
			var rules = {
				"team-name": {
					required: true,
					required: 255
				}
			};
			for (var i = 0; i < 6; i += 1)
			{
				rules["bowler-" + i + "-email"] = {
					required: i < 4,
					maxlength: 255,
					email: true
				};
				rules["bowler-" + i + "-name"] = {
					required: i < 4,
					maxlength: 255
				};
				rules["bowler-" + i + "-tshirt"] = {
					required: i < 4
				};
			}
			return rules;
		};

		var getUser = function(i)
		{
			var defer = $.Deferred();
			var email = $("#bowler-" + i + "-email").val();
			$.ajax({
				type: "GET",
				url: "/api/User?email=" + email,
				contentType: "application/json"
			}).done(function(user)
			{
				if (!user)
				{
					var name = $("#bowler-" + i + "-name").val();
					var tshirtSize = $("#bowler-" + i + "-tshirt").val();
					if (name != "" && tshirtSize != "")
					{
						defer.resolve({
							userId: null,
							name: name,
							tshirtSize: tshirtSize
						});
					}
					else
					{
						defer.resolve(null);
					}
				}
				else
				{
					defer.resolve({
						userId: user.id,
						name: null,
						tshirtSize: null
					});
				}
			});
			return defer.promise();
		};

		var getData = function()
		{
			var defer = $.Deferred();

			getUser(0).done(function(teamCaptain)
			{
				var bowlers = [];
				var load = function(i)
				{
					getUser(i).done(function(bowler)
					{
						if (bowler)
						{
							bowlers.push(bowler);
						}
						if (i + 1 < 6)
						{
							load(i + 1);
						}
						else
						{
							var data = {
								eventOccurrenceId: $("#occurrence").val(),
								teamName: $("#team-name").val(),
								teamCaptainId: teamCaptain.userId,
								bowlers: bowlers
							};
							defer.resolve(data);
						}
					});
				};
				load(1);
			});

			return defer.promise();
		};

		$("#bfks-form").validate(
		{
			submitHandler: function()
			{
				THYF.showLoading();
				getData().done(function(data)
				{
					$.ajax({
						type: "POST",
						url: "/api/BFKSRegistration",
						contentType: "application/json",
						data: data ? JSON.stringify(data) : null,
						datatype: "json"
					}).done(function(data)
					{
						alert("Your team was registered successfully!");
						THYF.go("/");
					}).fail(function () {
					    alert("Failed to Register For event");
					});;
				});
			},
			rules: generateRules()
		});
	};

	var templateTeamMember = function(number)
	{
		var html = "<div class='form-group'>\
	<h3>Bowler #" + (number + 1) + "</h3>\
	<div class='row'>\
		<div class='form-group col-sm-12'>\
			<label for='bowler-" + number + "-email'>Email:</label>\
			<div class='input-group'>\
				<input type='email' class='form-control' id='bowler-" + number + "-email' name='bowler-" + number + "-email'>\
				<span class='input-group-btn'>\
					<button type='button' class='btn btn-default js-check-user' data-id='" + number + "'>Check User</button>\
				</span>\
			</div>\
		</div>\
	</div>\
	<div class='row'>\
		<div class='form-group col-sm-6'>\
			<label for='bowler-" + number + "-name'>Name:</label>\
			<input type='text' class='form-control' id='bowler-" + number + "-name' name='bowler-" + number + "-name'>\
		</div>\
		<div class='form-group col-sm-6'>\
			<label for='bowler-" + number + "-tshirt'>T-shirt size:</label>\
			<select class='form-control' id='bowler-" + number + "-tshirt'>\
				<option>S</option>\
				<option>M</option>\
				<option>L</option>\
				<option>XL</option>\
				<option>2XL</option>\
				<option>3XL</option>\
			</select>\
		</div>\
	</div>\
</div>";
		return html;
	};

	init();
});