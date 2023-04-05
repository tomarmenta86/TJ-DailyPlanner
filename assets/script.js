// // Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// // the code isn't run until the browser has finished rendering all the elements
// // in the html.
$(function () {
//Global variables
var theDate = $('#currentDay');

//   // TODO: Add a listener for click events on the save button. This code should
//   // use the id in the containing time-block as a key to save the user input in
//   // local storage. HINT: What does `this` reference in the click listener
//   // function? How can DOM traversal be used to get the "hour-x" id of the
//   // time-block containing the button that was clicked? How might the id be
//   // useful when saving the description in local storage?

const allSaveBtns = document.querySelectorAll('[aria-label="save"]')

function HandleSaveButtonClicks(){
  for(let i = 0; i<allSaveBtns.length; i++)
  {
    allSaveBtns[i].addEventListener("click", SaveTimeSlot);
  }
}

function SaveTimeSlot(){
  
}

//   // TODO: Add code to apply the past, present, or future class to each time
//   // block by comparing the id to the current hour. HINTS: How can the id
//   // attribute of each time-block be used to conditionally add or remove the
//   // past, present, and future classes? How can Day.js be used to get the
//   // current hour in 24-hour time?
function SetTimeColor(){
  const allTimeDivs = document.getElementsByClassName('col-2 col-md-1 hour text-center py-3');
  
  for(let i = 0; i<allTimeDivs.length; i++)
  {
    var workingHour = allTimeDivs[i].textContent; 
    var currentHour = parseInt(dayjs().hour());

    var militaryWorkingHours = MakeMilitaryTime(workingHour);

    var colorDiv = allTimeDivs[i].parentElement;
    var colorDivClass = colorDiv.className;
    var splitClassName = colorDivClass.split(" ");
    var classNameToReplace = splitClassName[splitClassName.length-1];

    if(militaryWorkingHours < currentHour)
    {
      colorDiv.classList.replace(classNameToReplace, 'past');
    }
    else if(militaryWorkingHours == currentHour)
    {
      colorDiv.classList.replace(classNameToReplace, 'present');
    }
    else if(militaryWorkingHours > currentHour)
    {
      colorDiv.classList.replace(classNameToReplace, 'future');
    }
  }
}

//Make all working hours into 24 hour format for future comparison
function MakeMilitaryTime(workHour){
  if(workHour.includes("PM") && !workHour.includes("12"))
  {
    var hour = parseInt(workHour.replace("PM", ""));
    hour = 12 + hour;
  }
  else
  {
    var hour = parseInt(workHour.replace("AM", ""));
  }

  return hour;
}

//   // TODO: Add code to get any user input that was saved in localStorage and set
//   // the values of the corresponding textarea elements. HINT: How can the id
//   // attribute of each time-block be used to do this?
//   //
//   // TODO: Add code to display the current date in the header of the page.
// 

//Code to dynamically display date and time in header
function DisplayDateTime(){
  setInterval(function displayDate(){
    var rightNow = dayjs().format('dddd, MMMM D, YYYY h:mm:ss A');
    theDate.text(rightNow);
  },1000);
}

//Function calls
DisplayDateTime();
SetTimeColor();

});