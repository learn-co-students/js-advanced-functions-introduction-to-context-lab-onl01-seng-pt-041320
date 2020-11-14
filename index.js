//arr = [firstname, family name, title, pay rate]
//RETURNS Object with keys from above array
function createEmployeeRecord(arr){
  let record;
  return record = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(arrays){ 
  return arrays.map(createEmployeeRecord);
}

function makeObj(getType, dateStamp){
  return {type: getType, date: dateStamp.slice(0, 10), hour: parseInt(dateStamp.slice(-4))}
}

function createTimeInEvent(employeeRec, dateStamp){
  employeeRec.timeInEvents.push(makeObj("TimeIn", dateStamp))
  return employeeRec
}

function createTimeOutEvent(employeeRec, dateStamp){
  employeeRec.timeOutEvents.push(makeObj("TimeOut", dateStamp))
  return employeeRec
}

function hoursWorkedOnDate(employeeRec, dateStamp){
  const timeIn = employeeRec.timeInEvents.find((e) => 
  e.date === dateStamp).hour
  const timeOut = employeeRec.timeOutEvents.find((e) => 
  e.date === dateStamp).hour
  return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(employeeRec, dateStamp){
  const pay = employeeRec.payPerHour
  const hrsWorked = hoursWorkedOnDate(employeeRec, dateStamp)
  return pay * hrsWorked
}

function allWagesFor(employeeRec){ 
  const totalWages = employeeRec.timeInEvents.map((day) => {
    return wagesEarnedOnDate(employeeRec, day.date)
  })
  return totalWages.reduce((acc, cv) => acc + cv)
}

function findEmployeeByFirstName(arr, first_Name){
  return arr.find((record) =>
    record.firstName === first_Name)
  }

  function calculatePayroll(records){
    const totalPay = (records.map((employee) => {
      return allWagesFor(employee)
    }))
    return totalPay.reduce((acc, cv) => acc + cv)
}