const moment = require('moment')
const humanize = require('humanize-duration')

class DateFormatter {
    static getTimeDifference = (lastDateRecorded) => {
        const currentDate = moment(new Date())
        lastDateRecorded = moment(lastDateRecorded)
        return moment.duration(currentDate.diff(lastDateRecorded))
    }

    static humanizeUsage = (duration) => humanize(duration, {units: ["h", "m", "s"]})

    static parseDayMonthYear = (dateInput) => moment(dateInput).format("DD-MM-YYYY")

}

module.exports = DateFormatter