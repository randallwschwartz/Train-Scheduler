// Javascript for Train Scheduler

// blake's config stuff
// var config = {
//     apiKey: "AIzaSyBZ2wqchht5bptCEfTVq6o499LGqeQlJcI",
//     authDomain: "june20project.firebaseapp.com",
//     databaseURL: "https://june20project.firebaseio.com",
//     projectId: "june20project",
//     storageBucket: "",
//     messagingSenderId: "922663254867"
//   };

var config = {
    apiKey: "AIzaSyCnGXOVqempZj1dED-p5ECHUexvHzFt-wU",
    authDomain: "my-first-firebase-projec-250a7.firebaseapp.com",
    databaseURL: "https://my-first-firebase-projec-250a7.firebaseio.com",
    projectId: "my-first-firebase-projec-250a7",
    storageBucket: "my-first-firebase-projec-250a7.appspot.com",
    messagingSenderId: "62207198057"
  };

firebase.initializeApp(config);
console.log(moment().format("L"));
var database = firebase.database();


database.ref().on("child_added", function(childSnapshot) {
      
    // Log everything that's coming out of snapshot
    console.log("trainName: " + childSnapshot.val().trainName);
    // console.log(childSnapshot.val().trainName);
    console.log("destinationName: " + childSnapshot.val().destinationName);
    // console.log(childSnapshot.val().destinationName);
    console.log("firstTrainTime: " + childSnapshot.val().firstTrainTime);
    console.log("firstTrainTime: " + moment(childSnapshot.val().firstTrainTime).format("h:mm a"));
    // console.log("firstTrainTime: " + moment(childSnapshot.val().firstTrainTime, "H:mm a"));
    console.log("frequencyRate: " + childSnapshot.val().frequencyRate);
    // console.log(childSnapshot.val().frequencyRate);
    console.log("dateAdded: " + childSnapshot.val().dateAdded);
    // console.log(childSnapshot.val().dateAdded); //
    // console.log(moment().diff(childSnapshot.val().firstTrainTime, "minutes"));
    // var monthsWorked = moment().diff(childSnapshot.val().startDate, "months");

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(childSnapshot.val().firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm a"));
    console.log("CURRENT TIME: " + moment(currentTime).format("LT"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % childSnapshot.val().frequencyRate;
    console.log("tRemainder: " + tRemainder);

    // Minutes Until Train Arrives
    var tMinutesTillTrain = childSnapshot.val().frequencyRate - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train Arrival Time
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("LT"));
    console.log("--------------------------------------");

    // append the line to the html
    $("tbody").append("<tr><td>" + 
     childSnapshot.val().trainName + "</td><td>" + 
     childSnapshot.val().destinationName + "</td><td>" +
     childSnapshot.val().frequencyRate + "</td><td>" + 
     moment(nextTrain).format("LT") + "</td><td>" +
     tMinutesTillTrain + "</td>");
});    

// this function writes a table to the html when called (when a child object is added to firebase)


// this function adds a new train from the input boxes as a new child object in firebase
function addTrain() {
    var trainName = $("#train-name").val().trim();
    var destinationName = $("#destination-name").val().trim();
    var firstTrainTime = $("#first-train").val();
    var frequencyRate = $("#frequency-rate").val().trim();
    database.ref().push({
        trainName: trainName,
        destinationName: destinationName,
        firstTrainTime: firstTrainTime,
        frequencyRate: frequencyRate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
}

$("button").on("click", function(event) {
    // don't refresh the page
    event.preventDefault();
    
    console.log("test");
    addTrain();
});

