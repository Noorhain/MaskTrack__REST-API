const DateFormatter = require('./DateFormatter')

class UserUtils {
    static formatUserInfo = (user) => {
        const formattedBirthDate = DateFormatter.parseDayMonthYear(user.birthdate)
        return {
            username: user.username,
            email: user.email,
            birthDate: formattedBirthDate,
            masks: user.masks,
            avatar: user.avatar ? user.avatar : ''
        }
    }
}

module.exports = UserUtils