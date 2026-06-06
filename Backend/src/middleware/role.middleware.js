function requireRole(...roles) {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. No user information found.",
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Forbidden. Access denied.",
            });
        }

        next();
    };
};

module.exports = {
    requireRole,
};