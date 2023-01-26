// Array, list and audio variables
let alarms=[]
const alarmList = document.querySelector("#list")
let audioAdd = new Audio('static/audio/add.mp3');
let audioDelete = new Audio('static/audio/delete.mp3');
let audioTimeup = new Audio('static/audio/timeup.mp3')

// Live Watch Variables
var liveWatchElement = document.querySelector("#liveWatch")
var hourElement = document.querySelector("#hour")
var minuteElement = document.querySelector("#minute")
var secondElement = document.querySelector("#second")
var meridiemElement = document.querySelector("#meridiem")

// Set Alarm Variables
var hourInput = document.querySelector('#hourInput')
var minuteInput = document.querySelector('#minuteInput')
var secondInput = document.querySelector('#secondInput')
var meridiemInput = document.querySelector('#meridiemInput')

// Set Alarm btn variables
var incBtnHour = document.querySelector('#incbuttonhour')
var decBtnHour = document.querySelector('#decbuttonhour')
var incBtnminute = document.querySelector('#incbuttonminute')
var decBtnminute = document.querySelector('#decbuttonminute')
var incBtnsecond = document.querySelector('#incButtonSecond')
var decBtnsecond = document.querySelector('#decButtonSecond')
var meridiemBtn = document.querySelector('#meridiemBtn')
var setAlarmButton = document.querySelector("#setAlarm")


// Action when the alarm time matches the live time
function actionAfterAlarmMatched(action){
    document.getElementById(action.id).style.backgroundColor = "#FF5733"
    audioTimeup.play()
    setTimeout(function(){
        alert("Time Up")
    },500)
}


// Matching the live time to alarm time
function matchAlarm(){
    let newDate = new Date()
    for(let i=0;i<alarms.length;i++){
        let matchHour;
        if(newDate.getHours()>12){
            matchHour = newDate.getHours() - 12
        }else{
            matchHour = newDate.getHours()
        }
        if(matchHour == alarms[i].hour && alarms[i].minute == newDate.getMinutes() &&  alarms[i].second == newDate.getSeconds()){
            // Taking action when the alarm time meets live time
            actionAfterAlarmMatched(alarms[i])
        }
    }
    setTimeout(function(){
        matchAlarm()
    },1000)

}
matchAlarm()

// Adding list element to alarm list
function addToAlarmList(alarm){
    let appendHour,appendMinute,appendSecond;

    alarm.hour<10 ? appendHour = "0" + alarm.hour : appendHour = alarm.hour
    alarm.minute<10 ? appendMinute = "0" + alarm.minute : appendMinute = alarm.minute
    alarm.second<10 ? appendSecond = "0" + alarm.second : appendSecond = alarm.second

    const li = document.createElement('li')
    li.innerHTML = 
        `   <div class="left flex a-c" >
                <i class="fa-regular fa-bell"></i><p class="ringTime">${appendHour}:${appendMinute}:${appendSecond}&nbsp;${alarm.meridiem}</p>
            </div>
            <div class="right flex a-c" >
                <p class="status">Status</p>
                <p id="${alarm.id}" class="statusSign"></p>
            </div>
            <div class="delete flex j-c a-c">
                <i class="fa-solid fa-trash"data-id="${alarm.id}"></i>
            </div>
        `
    alarmList.append(li);
    
}

// Render the Alarm List
function renderList(){
    alarmList.innerHTML = "";
    for(let i=0;i<alarms.length;i++){
        
        // Calling addToAlarmList function and passing the each element of array index wise
        addToAlarmList(alarms[i])
    }
    hourInput.value=""
    minuteInput.value=""
    secondInput.value=""
}

// Add alarm to array 
function addAlarm(alarm){
    if(alarm){
        alarms.push(alarm)
        renderList()
    }else{
        alert("Can't Add Alarm")
    }
    // Playing add audio
    audioAdd.play();
}

// Delete Alarm from Array
function deleteAlarm(alarmId){
    const newAlarms = alarms.filter(function(alarm){
        return alarm.id !== alarmId
    })
    alarms = newAlarms;
    // Playing delete audio
    audioDelete.play()
    // Calling render list function
    renderList();
}


// Taking input for setting the alarm
function settingTimeForAlarm(){ 
    incBtnHour.addEventListener("click",function(){   
        if(hourInput.value<12){
            hourInput.value++;
        }
    })
    decBtnHour.addEventListener('click',function(){     
        if(hourInput.value>0){
            hourInput.value--;
        }
    })
    incBtnminute.addEventListener("click",function(){    
        if(minuteInput.value<60){
            minuteInput.value++;
        }
    })
    decBtnminute.addEventListener('click',function(){
        if(minuteInput.value>0){
            minuteInput.value--;
        }
    })
    incBtnsecond.addEventListener("click",function(){
        if(secondInput.value<60){
            secondInput.value++;
        }
    })
    decBtnsecond.addEventListener('click',function(){
        if(secondInput.value>0){
            secondInput.value--;
        }
    })
    meridiemBtn.addEventListener('click',function(){
        if(meridiemInput.value=="PM"){
            meridiemInput.value="AM"
        }else{
            meridiemInput.value="PM"
        }
    })

    // Adding event listener to Set Alarm Button
    setAlarmButton.addEventListener("click",function(){
        if(hourInput.value.length>2 || minuteInput.value.length>2 || secondInput.value.length>2 || hourInput.value=="" || minuteInput.value=="" || secondInput.value=="" ||  Number(hourInput.value)>12 || Number(hourInput.value)<0 || Number(minuteInput.value)>59 || Number(minuteInput.value)<0 || Number(secondInput.value)>59 ||Number(secondInput.value)<0){
            alert("Please enter a valid input.")
        }else{

            // Handling the extra 0 added while taking the input
            let hourInputUpdate,
                minuteInputUpdate,
                secondInputUpdate;

            hourInput.value[0] == "0" ? hourInputUpdate = hourInput.value.slice(1) : hourInputUpdate = hourInput.value
            minuteInput.value[0] == "0" ? minuteInputUpdate = minuteInput.value.slice(1) : minuteInputUpdate = minuteInput.value
            secondInput.value[0] == "0" ? secondInputUpdate = secondInput.value.slice(1) : secondInputUpdate = secondInput.value

            // creating an object of alarm to add in array
            const alarm = {
                id:Date.now().toString(),
                hour:hourInputUpdate,
                minute:minuteInputUpdate,
                second:secondInputUpdate,
                meridiem:meridiemInput.value,
                status:"false",
            }
            // Calling addAlarm function and passing the alarm object
            addAlarm(alarm)
        }
    })

    // Adding event listener to delete icon
    document.addEventListener("click",handleClickListener)
    function handleClickListener(e){
        const target = e.target;
        if(target.className === 'fa-solid fa-trash'){
            const alarmId = target.dataset.id;

            // Calling deleteAlarm function and passing id of the alarm
            deleteAlarm(alarmId)
        }
    }
}
settingTimeForAlarm()


// Live Watch Function
function liveWatch(){
    
    // Collecting Live Time Data in variables
    let date = new Date()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    let meridiem = "AM"
    if(hour==0){
        hour = 12
    }else if(hour>12){
        hour = hour-12
        meridiem = "PM"
    }
    hour<10 ? hour = "0"+hour : hour = hour
    minute<10 ? minute = "0"+minute : minute = minute
    second<10 ? second = "0"+second : second = second
    
    // Sending live time in to the div
    hourElement.innerHTML = hour + " "
    minuteElement.innerHTML = minute + " "
    secondElement.innerHTML = second + " "
    meridiemElement.innerHTML = meridiem +" "

    setTimeout(function(){
         liveWatch() 
    }, 1000)

}
liveWatch();