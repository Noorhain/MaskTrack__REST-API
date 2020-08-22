const DateFormatter = require('../dateUtils/DateFormatter')

class MaskUtils {
    static isUsingMaskForFirstTime = (mask) => mask.status === "Sin usar"

    static refreshTimeUsed = (mask) => {
        const lastIndex = (mask.times_used.length - 1)
        const lastDateRecorded = mask.times_used[lastIndex]
        const lastUsageTime = DateFormatter.getTimeDifference(lastDateRecorded)
        this.updateUsage(mask, lastUsageTime)
    }

    static updateUsage = (mask, lastUsageTime) =>
        mask.usage ?
            mask.usage = mask.usage + lastUsageTime :
            mask.usage = lastUsageTime

    static getDuration = (duration) => DateFormatter.humanizeUsage(duration)

    static getFirstTimeUsed = (mask) => mask.times_used[0]

    static formatMaskInfo = (mask) => {
        return {
            status: mask.status,
            usingNow: mask.using_now,
            firstTimeUsed:
                !this.isUsingMaskForFirstTime(mask) ?
                    this.getFirstTimeUsed(mask) :
                    null,
            typeName: mask.mask_type_content.type_name,
            typeDescription: mask.mask_type_content.type_description,
            estimatedDuration: mask.mask_type_content.estimated_duration,
            usage: mask.usage
        }
    }
}

module.exports = MaskUtils