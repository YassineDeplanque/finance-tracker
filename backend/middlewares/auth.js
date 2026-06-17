export const isAuthenticated = (req, res, next) => {
    try {
        if (!req.session || !req.session.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Please log in."
            });
        }

        next();
    } catch (err) {
        console.error("Auth middleware error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error in auth middleware"
        });
    }
};