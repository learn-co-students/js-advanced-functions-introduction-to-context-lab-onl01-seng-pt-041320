// Your code here
function createEmployeeRecord(array)
{
    const employee = 
    {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };

    return employee;
}

function createEmployeeRecords(twoDArray)
{
    return twoDArray.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(employeeRecord, timeString)
{
    const [date, hour] = timeString.split(' ');

    employeeRecord.timeInEvents.push(
    {
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    });

    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timeString)
{
    const timeOutArray = timeString.split(' ');

    employeeRecord.timeOutEvents.push(
    {
        type: "TimeOut",
        date: timeOutArray[0],
        hour: parseInt(timeOutArray[1])
    });

    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateString)
{
    const timeIn = employeeRecord.timeInEvents.find(dateIn => dateIn.date === dateString);
    const timeOut = employeeRecord.timeOutEvents.find(dateOut => dateOut.date === dateString);

    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, dateString)
{
    const wagesEarned = hoursWorkedOnDate(employeeRecord, dateString) * employeeRecord.payPerHour;

    return wagesEarned;
}

function allWagesFor(employeeRecord)
{
    const wages = employeeRecord.timeInEvents.map(element => wagesEarnedOnDate(employeeRecord, element.date));
    let total = 0;

    for (let i = 0; i <= wages.length - 1; i++)
    {
        total += wages[i];
    }
    
    return total;
}

function calculatePayroll(employeeRecords)
{
    const payrollTotalForEachEmployee = employeeRecords.map(element => allWagesFor(element));
    let total = 0;

    for (let i = 0; i <= payrollTotalForEachEmployee.length - 1; i++)
    {
        total += payrollTotalForEachEmployee[i];
    }

    return total;
}

function findEmployeeByFirstName(employeeRecords, firstName)
{
    const findByFirstName = employeeRecords.find(element => element.firstName === firstName);

    return findByFirstName;
}