// Your code here

function createEmployeeRecord(array)
{
return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents:[],
    timeOutEvents:[],
}

}
const createEmployeeRecords = function(ArrayOfArrays) {
    return ArrayOfArrays.map(function(array){
        return createEmployeeRecord(array)
    })
}
function createTimeInEvent(Object,Datastamp)
{
    Object.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(Datastamp.slice(-4)),
        date: Datastamp.slice(0, 10)
})
return Object
}
function createTimeOutEvent(Object,Datastamp)
{
    Object.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(Datastamp.slice(-4)),
        date: Datastamp.slice(0, 10)
})
return Object
}
function hoursWorkedOnDate(Object,DataForm)
{
    let InTime = Object.timeInEvents.find(function(e){
        return e.date === DataForm
    })

    let OutTime = Object.timeOutEvents.find(function(e){
        return e.date === DataForm
    })

    return (OutTime.hour - InTime.hour) / 100
}

function wagesEarnedOnDate(Object,DataForm)
{
    const Payowed = hoursWorkedOnDate(Object, DataForm)* Object.payPerHour
    return parseFloat(Payowed.toString())
}
function allWagesFor(object){
    const Dates = object.timeInEvents.map(function(e){
        return e.date
    })
    const PaysNumber = Dates.reduce(function(Amount, dateForm){
        return Amount + wagesEarnedOnDate(object, dateForm) 

    }, 0)
    return PaysNumber
}
const calculatePayroll = function (arrayofObject){
    return arrayofObject.reduce(function(Amount, record){
        return Amount + allWagesFor(record)
    }, 0)
} 