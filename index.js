// Your code here

// Test data

const test = ["Vedran", "Sehovic", "Software Engineer", 550]
const testObj = {
    firstName: "Vedran",
    familyName:  "Sehovic",
    title:  "Software Engineer",
    payPerHour: 550,
    timeInEvents: [],
    timeOutEvents:  []
};
const testOfTests = [["Vedran", "Sehovic", "Software Engineer", 550], ["Mirza", "Halilovic", "Software Engineer", 650]]
const dateStamp = "2020-11-13 1217"



// creating Employee Record Cards

function createEmployeeRecord(arr){
    const newObj = {};
    newObj.firstName = arr[0];
    newObj.familyName = arr[1];
    newObj.title = arr[2];
    newObj.payPerHour = arr[3];
    newObj.timeInEvents = [];
    newObj.timeOutEvents = [];
    return newObj;
};

// creating Employee RecordS

function createEmployeeRecords(arr) {
    let result = arr.map(createEmployeeRecord);
    return result;
};

// create Time In Event

function createTimeInEvent(employeeRecordObj, dateStamp) {
    const newEvent = {};
    let[date, hour] = dateStamp.split(' '); // splitting YYYY-MM-DD HHMM into date and time

    // building a new object that will be inserted into timeInEvents array
    newEvent.type = "TimeIn";
    newEvent.hour = parseInt(hour, 10);
    newEvent.date = date;

    employeeRecordObj.timeInEvents.push(newEvent);
    return employeeRecordObj;
};

// create Time Out Event

function createTimeOutEvent(employeeRecordObj, dateStamp) {
    const timeOutEvent = {};
    let[date, hour] = dateStamp.split(' '); // splitting YYYY-MM-DD HHMM into date and time

    // building a new object that will be inserted into timeInEvents array
    timeOutEvent.type = "TimeOut";
    timeOutEvent.hour = parseInt(hour, 10);
    timeOutEvent.date = date;

    employeeRecordObj.timeOutEvents.push(timeOutEvent)
    return employeeRecordObj;
};

// calculate hours worked on a given date

function hoursWorkedOnDate(employeeRecordObj, date) {
    // find time IN object that matches with provided date
    // find time OUT object that matches with provided date
    // create a variable that equals time OUT hr
    // create a variable that equals time IN hr
    // total nr hrs is time out - time in / 100

    const objDateIn = employeeRecordObj.timeInEvents.find(timeObj => timeObj.date === date);
    const objDateOut = employeeRecordObj.timeOutEvents.find(timeObj => timeObj.date === date);
    const hrsOut = objDateOut.hour
    const hrsIn = objDateIn.hour

    return (hrsOut - hrsIn)/100;
};

// Wages earned on Date

function wagesEarnedOnDate(employeeRecordObj, date) {
    // find hours worked on the date using hoursWorkedOnDate function
    // get the rate from the object ✔

    const payPerHour = employeeRecordObj.payPerHour;
    const hoursWorked = hoursWorkedOnDate(employeeRecordObj, date);
    return payPerHour * hoursWorked;
}

// using reduce to calculate allWagesFor


function allWagesFor(obj){
    const allWages = obj.timeInEvents.map(day => wagesEarnedOnDate(obj, day.date))
    console.log("-----------=================------------", allWages)
    let total = 0;
    for(let i=0; i<allWages.length; i++){
        total += allWages[i]
    };
    return total;
    //return allWages.reduce((sum, num) => sum + num, 0)
}

// find employee by first name

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(rec){
        return rec.firstName === firstName
      })
};

// calculate payroll 

function calculatePayroll(arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
};