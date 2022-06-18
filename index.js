
const allEmployeeRecords = []

function createEmployeeRecord([string1, string2, string3, number]) {
    const employeeRecord = {
        firstName: string1,
        familyName: string2,
        title: string3,
        payPerHour: number,
        timeInEvents: [],
        timeOutEvents: []
    }
    allEmployeeRecords.push(employeeRecord)
    return employeeRecord
}

function createEmployeeRecords (arrays) {
    const arrOfObjects = []
    arrays.forEach((array) => {
        const newObj = createEmployeeRecord(array)
        console.log(newObj)
        arrOfObjects.push(newObj)

    })
    
    return arrOfObjects
}

function createTimeInEvent (empObj, dateStamp) {
    const hour = dateStamp.split(' ')[1]
    const date = dateStamp.split(' ')[0]
    const timeInObj = {
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date: date
    }
    const timeInEvents = empObj.timeInEvents
    timeInEvents.push(timeInObj)
    return empObj
}

function createTimeOutEvent (empObj, dateStamp) {
    const hour = dateStamp.split(' ')[1]
    const date = dateStamp.split(' ')[0]
    const timeOutObj = {
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date: date
    }
    const timeOutEvents = empObj.timeOutEvents
    timeOutEvents.push(timeOutObj)
    return empObj
}

function hoursWorkedOnDate (empObj, dateStamp) {
    let timeIn = ''
    let timeOut = ''
    empObj.timeInEvents.forEach((x) => {
        if (x.date === dateStamp) {
            timeIn = x.hour
        }
    })
    empObj.timeOutEvents.forEach((x) => {
        if (x.date === dateStamp) {
            timeOut = x.hour
        }
    })
    const hoursWorked = (timeOut - timeIn)/100
    return hoursWorked

}

function wagesEarnedOnDate (empObj, dateStamp) {
    const hoursWorked = hoursWorkedOnDate(empObj, dateStamp)
    const wagesEarned = hoursWorked * empObj.payPerHour
    return wagesEarned
}

function allWagesFor (empObj) {
    const arrOfDates = empObj.timeInEvents.map(x => x.date)
    let wagesEarned = 0; 
    arrOfDates.forEach(date => {
        const newWage = wagesEarnedOnDate(empObj, date)
        wagesEarned = wagesEarned + newWage
    })

    return wagesEarned

}

function calculatePayroll (array) {
    let totalPayroll = 0
    array.forEach(employee => {
        totalPayroll = totalPayroll + allWagesFor(employee)
    })
    return totalPayroll
}

