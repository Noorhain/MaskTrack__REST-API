const DateFormatter = require('../dateUtils/DateFormatter')

class MaskUtils {
    static usingMaskForFirstTime = (mask) => mask.status === "Sin usar"

    static refreshTimeUsed = (mask) => {
        const lastIndex = (mask.times_used.length - 1)
        const lastDateRecorded = mask.times_used[lastIndex]
        // Obtenemos un objeto DURATION con la diferencia del ÚLTIMO PERIODO
        const lastUsageTime = DateFormatter.getTimeDifference(lastDateRecorded)
            // Podemos almacenar la duración en milisegundos, con un valor de number, para luego darle formato
        console.log(typeof(lastUsageTime.milliseconds()))
        // Debemos almacenar el objeto DURATION con un formato operable
            // --> ... escribir código
        // Procedemos a sumar el último periodo al acumulativo que hay en la BD
            // --> ... escribir código
        mask.usage = lastUsageTime
    }

    static getDuration = (duration) => DateFormatter.humanizeDuration(duration)

    static updateDuration = (mask) => {
        if(!mask.usage)
            return

    }

}

module.exports = MaskUtils