const moment = require('moment-timezone')

class DateFormatter {
    static parseDayMonthYear = (dateInput) => moment(dateInput.toString()).format('DD-MM-YYYY')
}

module.exports = DateFormatter