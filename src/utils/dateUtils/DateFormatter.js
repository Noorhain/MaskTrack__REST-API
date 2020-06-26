const moment = require('moment')

class DateFormatter {
    static parseDayMonthYear = (dateInput) => moment(dateInput).format("DD-MM-YYYY")

}

module.exports = DateFormatter