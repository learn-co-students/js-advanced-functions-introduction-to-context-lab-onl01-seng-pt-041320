let reducer = (accumulator, currentValue) => accumulator + currentValue


function createEmployeeRecord(array) {
    let newEmployee = {}
    newEmployee.firstName = array[0]
    newEmployee.familyName = array[1]
    newEmployee.title = array[2]
    newEmployee.payPerHour = array[3]
    newEmployee.timeInEvents = []
    newEmployee.timeOutEvents = []
    return newEmployee
}

function createEmployeeRecords(array) {
    let employeeRecords = array.map(createEmployeeRecord)
    return employeeRecords
}

function createTimeInEvent(employee, time) {
    let clockIn = {}
    let timeOfDay = time.split(" ")
    clockIn.type = "TimeIn"
    clockIn.date = timeOfDay[0]
    clockIn.hour = parseInt(timeOfDay[1])
    employee.timeInEvents.push(clockIn)
    // console.log(employeeRecord)/
    return employee
}

function createTimeOutEvent(employee, time) {
    let clockOut = {}
    let timeOfDay = time.split(" ")
    clockOut.type = "TimeOut"
    clockOut.date = timeOfDay[0]
    clockOut.hour = parseInt(timeOfDay[1])
    employee.timeOutEvents.push(clockOut)
    return employee
}

function hoursWorkedOnDate(employee, time) {
    let hoursWorked = 0
    for (let i = 0; i < employee.timeInEvents.length; i++) {
        if (employee.timeInEvents[i].date == time) {
            let startingTime = employee.timeInEvents[i].hour
            let endingTime = employee.timeOutEvents[i].hour
            hoursWorked = (endingTime - startingTime) / 100
            debugger
        }
    }
    return hoursWorked
}

function wagesEarnedOnDate(employee, time) {
    let pay = hoursWorkedOnDate(employee, time) * employee.payPerHour
    console.log(pay)
    return pay
}

function allWagesFor(employee) {
    let pay = employee.timeInEvents.map(time => wagesEarnedOnDate(employee, time.date))
    return pay.reduce(reducer)
}

function calculatePayroll(employees) {
    // let reducer = (accumulator, currentValue) => accumulator + currentValue
    // let employee = employees.map(employee => employee)
    let payroll = employees.map(employee => allWagesFor(employee))
    console.log(payroll)
    return payroll.reduce(reducer)
}

function findEmployeeByFirstName(employees, name) {
    let employee = employees.find(employee => employee.firstName == name)
    return employee
}
