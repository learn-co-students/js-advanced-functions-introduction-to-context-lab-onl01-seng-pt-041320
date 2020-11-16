// Your code here

function createEmployeeRecord([firstName, familyName, title, payPerHour]){
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(array){
  return array.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, dateStamp){
  let date = dateStamp.split(" ")[0]
  let hour = parseInt(dateStamp.split(" ")[1])
  employeeRecord.timeInEvents.push({type: "TimeIn", date: date, hour: hour})
  return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
  let date = dateStamp.split(" ")[0]
  let hour = parseInt(dateStamp.split(" ")[1])
  employeeRecord.timeOutEvents.push({type: "TimeOut", date: date, hour: hour})
  return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateStamp){
  let date = dateStamp.split(" ")[0]
  let inEvent = employeeRecord.timeInEvents.find((e) => {return e.date === date})
  let outEvent = employeeRecord.timeOutEvents.find((e) => {return e.date === date})
  let hours = parseInt(outEvent.hour) - parseInt(inEvent.hour)
  return hours / 100
}

function wagesEarnedOnDate(employeeRecord, dateStamp){
  let hours = hoursWorkedOnDate(employeeRecord, dateStamp)
  return employeeRecord.payPerHour * hours
}

function allWagesFor(employeeRecord){
  return employeeRecord.timeInEvents.reduce((wages, hours) => {
    return wages + wagesEarnedOnDate(employeeRecord, hours.date)
  }, 0)
}

function findEmployeeByFirstName(srcArray, firstName){
  return srcArray.find((employee) => employee.firstName = firstName)
}

function calculatePayroll(srcArray){
  return srcArray.reduce((payroll, employees) => {
    return payroll + allWagesFor(employees)
  }, 0)
}