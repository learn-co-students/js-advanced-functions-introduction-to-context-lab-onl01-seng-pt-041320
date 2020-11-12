let createEmployeeRecord = function(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeArr) {
    return employeeArr.map(function(row) {
        return createEmployeeRecord(row)
        })
    }

function createTimeInEvent(employee, dateStamp) {
    let time = dateStamp.split(' ');

    const timeInObj = ({"type": "TimeIn", "hour": parseInt(time[1]), "date": time[0] });
    employee.timeInEvents.push(timeInObj)

    return employee;
}

function createTimeOutEvent(employee, dateStamp) {
    let time = dateStamp.split(' ');
    employee.timeOutEvents.push({"type": "TimeOut", "hour": parseInt(time[1]), "date": time[0] });
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    let clockIn = employee.timeInEvents.find(inTime => inTime.date === date)
    let clockOut = employee.timeOutEvents.find(outTime => outTime.date === date);
    return (clockOut.hour - clockIn.hour)/100
}

function wagesEarnedOnDate(employee, date) {
    return employee.payPerHour * hoursWorkedOnDate(employee, date)
}

function allWagesFor(employee) {
    let datesForWages = employee.timeInEvents.map(function(someEmployee) {
        return someEmployee.date 
    })
    const initialValue = 0;
    const reducer = (accumulator, date) => {
        return accumulator + wagesEarnedOnDate(employee, date)
    };
    return datesForWages.reduce(reducer, initialValue)
}

function findEmployeeByFirstName(srcArray, firstName) {
   return srcArray.find(employee => employee.firstName === firstName)
}

function calculatePayroll(arrayOfEmployees) {
    const initialValue = 0;
    const reducer = (accumulator, employee) => {
        return accumulator + allWagesFor(employee)
    };
    return arrayOfEmployees.reduce(reducer, initialValue);
}
