// Initialize Firebase

var config = 																		// go to firebase, create new project then get source code and this is all there
{
	apiKey: "AIzaSyClVGqb18g_qKLqRFzpxsLQ0vGnj5Ywltc",
	authDomain: "trainschedule-11c3d.firebaseapp.com",
	databaseURL: "https://trainschedule-11c3d.firebaseio.com",
	projectId: "trainschedule-11c3d",
	storageBucket: "",
	messagingSenderId: "365514939145"
};

firebase.initializeApp(config);

var database = firebase.database();
var trainRef = "/train";

function saveTrainData()
{

	$("#submit").on("click", function(e)
	{
		e.preventDefault();												// stops the website from reloading and keeps forms active
		var trainname = $("#trainname").val().trim();					// setting the user input in field #trainname to var name and trimming extra spaces out, val will return the value in that id
		var traindestination = $("#traindestination").val().trim();
		var traintimer = $("#traintimer").val().trim();
		var trainfrequency = $("#trainfrequency").val().trim();
		database.ref(trainRef).push(									// pushing updated information to variables with key value pairs by reference
		{
			trainname: trainname,
			traindestination: traindestination,
			traintimer: traintimer,
			trainfrequency: trainfrequency
		});

		$("#trainname").val("");								// clearing the field 
		$("#traindestination").val("");							// clearing the field 
		$("#traintimer").val("");								// clearing the field 
		$("#trainfrequency").val("");							// clearing the field 
	});

}



function loadTrainData()
{
	database.ref(trainRef).on("child_added", function(snapshot)									// child_added is used when retrieving a list of items from a database.  Value is pulling the entire contents but child will be triggered once for each child then each subsequent child.
	{							
		var tableRow = $("<tr>");



		tableRow.html(
			"<th> </th>"+
			"<td>"+ snapshot.val().trainname +"</td>"+
			"<td>"+ snapshot.val().traindestination +"</td>"+
			"<td>"+ snapshot.val().traintimer +"</td>"+
			"<td>"+ snapshot.val().trainfrequency +"</td>");			// we are reading data from a database via snapshot.  This is passed with event callback like on or once
		$("#tablebody").prepend(tableRow);														// val for snapshot will extract all the contents as an object from the snapshot
	}, 
	function(err)
	{

		console.log("Error occured" + err);
	});
}

$(document).ready(function()
{
	$("#tablebody").empty();
	saveTrainData();
	loadTrainData();
	
});