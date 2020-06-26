const DateFormatter = require('../dateUtils/DateFormatter')

class UserDataFormatter {
    static removeAccesoryData = (user) => {
        const formattedBirthDate = DateFormatter.parseDayMonthYear(user.birthdate)
        return {
            username: user.username,
            email: user.email,
            birthDate: formattedBirthDate,
            avatar: user.avatar ? user.avatar : ''
        }
    }
}

module.exports = UserDataFormatter