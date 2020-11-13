let createEmployeeRecord = (row) => {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = (rowData) => {
    return rowData.map(row => { return createEmployeeRecord(row)})
}

let createTimeInEvent = (employee, dateStamp) => {
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let createTimeOutEvent = (employee, dateStamp) => {
    let [date, hour] = dateStamp.split(' ')
    
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let hoursWorkedOnDate = (employee, soughtDate) => {
    let inEvent = employee.timeInEvents.find(e => {return e.date === soughtDate})
    
    let outEvent = employee.timeOutEvents.find(e => {return e.date == soughtDate})

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = (employee, soughtDate) => {
    let rawWage = hoursWorkedOnDate(employee, soughtDate) * employee.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = (employee) => {
    let eligibleDates = employee.timeInEvents.map(e => {return e.date})

    let payable = eligibleDates.reduce((memo, d) => {return memo + wagesEarnedOnDate(employee, d)},0)

    return payable
}

let findEmployeeByFirstName = (sourceArray, firstName) => {
    return sourceArray.find(src => {return src.firstName === firstName})
}

let calculatePayroll = (arrayOfEmployeeRecords) => {
    return arrayOfEmployeeRecords.reduce((memo, rec) => {return memo + allWagesFor(rec)},0)
}