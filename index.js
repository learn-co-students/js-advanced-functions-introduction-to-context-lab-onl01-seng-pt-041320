// Your code here



function createEmployeeRecord(array)  {
    
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
      }
}

function createEmployeeRecords(employeeRowData) {
    return employeeRowData.map(function(row) {
      return createEmployeeRecord(row)
    })
    
  }

  let createTimeInEvent = (employeeRecord, dateStamp) => {
    let [date, hour] = dateStamp.split(' ')

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeRecord

  }

  let createTimeOutEvent = (employeeRecord, dateStamp) => {
    let [date, hour] = dateStamp.split(' ')

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
      return employeeRecord
  }
    
  
  let hoursWorkedOnDate = (employeeRecord, dateStamp) => {
    let inEvent = employeeRecord.timeInEvents.find(function(e){ // e - event object
      return e.date === dateStamp
    })

    let outEvent = employeeRecord.timeOutEvents.find(function(e){
      return e.date === dateStamp
    })

      return (outEvent.hour - inEvent.hour) / 100
    }

    let wagesEarnedOnDate = (employeeRecord, date) => {
      let wage = hoursWorkedOnDate(employeeRecord, date)
        * employeeRecord.payPerHour
          return parseFloat(wage.toString())
    }

    let allWagesFor = (employeeRecord) => {
      let dates = employeeRecord.timeInEvents.map(function(e){
          return e.date
      })

    let payable = dates.reduce(function(memo, d){
      return memo + wagesEarnedOnDate(employeeRecord, d)
    }, 0) 

    return payable
  }

let findEmployeeByFirstName = (src, firstName) => {
  return src.find(function(rec){
    return rec.firstName == firstName
  })
}

 function calculatePayroll(totalEmployees){
   return totalEmployees.reduce(function(memo, rec) {
     return memo + allWagesFor(rec)
   }, 0)
 }