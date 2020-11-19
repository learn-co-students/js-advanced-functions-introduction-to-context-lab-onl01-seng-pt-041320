// Your code here
const createEmployeeRecord = function(array) {
    let newEmployee = { firstName: array[0], familyName: array[1], title: array[2], payPerHour: array[3] }
    
    newEmployee.timeInEvents = []
    newEmployee.timeOutEvents = []
    return newEmployee
}

function createEmployeeRecords (array) {
    return array.map(
        createEmployeeRecord
    )
}

function createTimeInEvent (record, string) {
    let splitTime = string.split(" ")
    let d = splitTime[0]
    let h = parseInt(splitTime[1])
    let event = {date: d, hour: h}
    event.type = "TimeIn"
    record.timeInEvents.push(event)
    return record 
}

function createTimeOutEvent (record, string) {
    let splitTime = string.split(" ")
    let d = splitTime[0]
    let h = parseInt(splitTime[1])
    let event = {date: d, hour: h}
    event.type = "TimeOut"
    record.timeOutEvents.push(event)
    return record 
}

function hoursWorkedOnDate (record, inputDate) {
    function matchDate(element, index, array) {
        return (element.date === inputDate);
      }
    let timeIn = record.timeInEvents.find(matchDate)
    let timeOut = record.timeOutEvents.find(matchDate)
    let numberOfHours = timeOut.hour - timeIn.hour 
    let string = numberOfHours.toString()
    let newString = string.slice(0, -2);
    return parseInt(newString)
}

function wagesEarnedOnDate (record, date) {
    let hours = hoursWorkedOnDate(record, date)
    return hours*record.payPerHour

}

function allWagesFor (record) {
    let allDates = record.timeInEvents.map( function(e) {return e.date})
    let allWages = allDates.map(function(e) {return wagesEarnedOnDate(record, e)})
    return allWages.reduce(function(total, currentValue){ return total + currentValue})

}

function calculatePayroll (array) {
    let allWages = array.map(function(e) {return allWagesFor(e)})
    return allWages.reduce(function(total, currentValue){ return total + currentValue})

}

function findEmployeeByFirstName (array, inputName) {
    function nameMatch(element, index, array) {
        return (element.firstName === inputName);
      }
    return array.find(nameMatch);
}