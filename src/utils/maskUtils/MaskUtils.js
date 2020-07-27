const DateFormatter = require('../dateUtils/DateFormatter')

class MaskUtils {
    static usingMaskForFirstTime = (mask) => mask.status === "Sin usar"

    static refreshTimeUsed = (mask) => {
        const lastIndex = (mask.times_used.length - 1)
        const lastDateRecorded = mask.times_used[lastIndex]
        // Obtenemos un objeto DURATION con la diferencia del ÚLTIMO PERIODO en milisegundos
        const lastUsageTime = DateFormatter.getTimeDifference(lastDateRecorded)
        // Procedemos a sumar el último periodo al acumulativo que hay en la BD
        this.updateUsage(mask, lastUsageTime)
    }

    static updateUsage = (mask, lastUsageTime) => {
        if (!mask.usage)
            mask.usage = lastUsageTime
        else
            mask.usage = mask.usage + lastUsageTime
    }

    static getDuration = (duration) => DateFormatter.humanizeUsage(duration)
}

module.exports = MaskUtils