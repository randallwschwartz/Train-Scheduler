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

// database.ref().on("value", function(snapshot) {
//     for(i = 0; i < snapshot.length; i++) {
//         var empName = snapshot[i].empName;
//         var role = snapshot[i].role;
//         var startDate = snapshot[i].startDate;
//         var monthlyRate = snapshot[i].monthlyRate;

//     }
// })

database.ref().on("child_added", function(childSnapshot) {
      
    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().empName);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().startDate);
    console.log(childSnapshot.val().monthlyRate);
    console.log(childSnapshot.val().dateAdded); //
    console.log(moment().diff(childSnapshot.val().startDate, "months"));
    var monthsWorked = moment().diff(childSnapshot.val().startDate, "months");
    $("tbody").append("<tr><td>" + 
     childSnapshot.val().empName + "</td><td>" + 
     childSnapshot.val().role + "</td><td>" +
     childSnapshot.val().startDate + "</td><td>" + 
     monthsWorked + "</td><td>" +
     childSnapshot.val().monthlyRate + "</td><td>" +
     monthsWorked * childSnapshot.val().monthlyRate + "</td>");
});    

function addEmployee() {
    var empName = $("#employee-name").val().trim();
    var role = $("#role").val().trim();
    var startDate = $("#start-date").val();
    var monthlyRate = $("#monthly-rate").val().trim();
    database.ref().push({
        empName: empName,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
}
$("button").on("click", function(event) {
    // don't refresh the page
    event.preventDefault();
    
    console.log("test");
    addEmployee();
});
