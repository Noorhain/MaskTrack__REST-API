const MaskType = require('../../models/maskType')

class MaskTypeUtils {
    static getMaskTypeReference = async (maskTypeIdentifier) => {
        try {
            const identifier = parseInt(maskTypeIdentifier)
            const maskType = await MaskType.findOne({type_identifier: identifier})
            return maskType._id
        } catch (error) {
            return error.message
        }
    }
}

module.exports = MaskTypeUtils