// Your code here

function createEmployeeRecord(arr){
    let emp_record = {};
    emp_record.firstName = arr[0];
    emp_record.familyName = arr[1];
    emp_record.title = arr[2];
    emp_record.payPerHour = arr[3];
    emp_record.timeInEvents = [];
    emp_record.timeOutEvents = [];

    return emp_record;
}

function createEmployeeRecords(arr){
    const emp_map = arr.map(x => createEmployeeRecord(x));
    return emp_map;
}

function createTimeInEvent(employee, time){
    let [date, hour] = time.split(' ');
    let obj = {};

    obj.type = "TimeIn";
    obj.hour = parseInt(hour, 10);
    obj.date = date;
    employee.timeInEvents.push(obj);
    return employee;
}

function createTimeOutEvent(employee, time){
    let [date, hour] = time.split(' ');
    let obj = {};

    obj.type = "TimeOut";
    obj.hour = parseInt(hour, 10);
    obj.date = date;
    employee.timeOutEvents.push(obj);
    return employee;
}

function hoursWorkedOnDate(employee, date){
    const timein = employee.timeInEvents.find(function(event){
        return event.date === date;
    });

    const timeout = employee.timeOutEvents.find(function(event){
        return event.date === date;
    });

    const elapsed_time = (timeout.hour - timein.hour) / 100;
    return elapsed_time;
}

function wagesEarnedOnDate(employee, date){
    const hours = hoursWorkedOnDate(employee, date);

    const wages = employee.payPerHour * hours;
    return wages;
}

function allWagesFor(employee){
    let count = 0;
    const wages = employee.timeInEvents.map(function(event){
        return wagesEarnedOnDate(employee, event.date);
    });
    wages.forEach(element => count += element);

    return count;
}

function findEmployeeByFirstName(src, firstname){
    const name = src.find(function(emp){
        return emp.firstName === firstname;
    })
    return name;
}

function calculatePayroll(employees){
    let counter = 0;
    for(let i = 0; i < employees.length; i++){
        const wages = allWagesFor(employees[i]);
        counter += wages;
    }
    return counter;
}