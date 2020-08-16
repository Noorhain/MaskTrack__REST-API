const DateFormatter = require('../dateUtils/DateFormatter')

class MaskUtils {
    static usingMaskForFirstTime = (mask) => mask.status === "Sin usar"

    static refreshTimeUsed = (mask) => {
        const lastIndex = (mask.times_used.length - 1)
        const lastDateRecorded = mask.times_used[lastIndex]
        const lastUsageTime = DateFormatter.getTimeDifference(lastDateRecorded)
        this.updateUsage(mask, lastUsageTime)
    }

    static updateUsage = (mask, lastUsageTime) => {
        if (!mask.usage)
            mask.usage = lastUsageTime
        else
            mask.usage = mask.usage + lastUsageTime
    }

    static getDuration = (duration) => DateFormatter.humanizeUsage(duration)

    static getMaskTypeReference(maskTypeIdentifier) {
        return new Mask
    }
}

module.exports = MaskUtils