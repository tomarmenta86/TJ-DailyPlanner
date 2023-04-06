$(function () {
  //Global variables
  var theDate = $('#currentDay');

  //Dynamically display date and time in header
  function DisplayDateTime(){
    setInterval(function displayDate(){
      var rightNow = dayjs().format('dddd, MMMM D, YYYY h:mm:ss A');
      theDate.text(rightNow);
    },1000);
  }

  //Change color of time blocks according to past/present/future
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

  //Make all div IDs of hours into 24-hour format
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

  //Handle user input into scheduled time blocks
  function HandleSaveButtonClicks(){
    const allSaveBtns = document.querySelectorAll('[aria-label="save"]');

    for(let i = 0; i<allSaveBtns.length; i++)
    {
      allSaveBtns[i].addEventListener("click", () => {
        var hourSaveBtn = allSaveBtns[i].parentElement;
        var hourSaveBtnId = hourSaveBtn.id;
        var childTextArea = hourSaveBtn.children[1]
        var scheduleInput = childTextArea.value;

        localStorage.setItem(hourSaveBtnId, scheduleInput);
      });
    }
  }

  //Function calls
  DisplayDateTime();
  SetTimeColor();
  HandleSaveButtonClicks();
});