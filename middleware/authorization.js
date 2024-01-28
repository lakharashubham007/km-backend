const models = require("../models");

const authorization = async (req, res, next) => {
    try {
        const modules = (await models.Module.find({
            _id: {
                $in: (await models.Role.findById(
                    (await models.User.findById(req.user.sub)).role._id).populate('permissions')).permissions.map(permission => {
                        return permission.module._id
                    })
            }
        })).map(module => module.module_name);

        if (modules.indexOf(req.originalUrl.substring(req.originalUrl.lastIndexOf('/') + 1)) >= 0) {
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: `You are not authorized for this action!!!`,
            });
        }
    } catch (error) {
        // If there is an error during the authentication process, return 401 Unauthorized response
        console.log(error);
        return res.status(401).json({
            success: false,
            message: `Something Went Wrong While Validating the Role`,
        });
    }
}

module.exports = authorization;