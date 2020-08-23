const MaskType = require('../models/maskType')

class MaskTypeUtils {
    static getMaskTypeReference = async (maskTypeIdentifier) => {
        try {
            const type_identifier = parseInt(maskTypeIdentifier)
            const maskType = await MaskType.findOne({type_identifier})
            return maskType._id
        } catch (error) {
            return error.message
        }
    }
}

module.exports = MaskTypeUtils