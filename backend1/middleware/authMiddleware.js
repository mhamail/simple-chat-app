const jwt = require("jsonwebtoken");

module.exports.authMiddleware = async (req, res, next) => {
  // Extract the token from the Authorization header
  const authToken = req.headers.authorization || req.cookies;
  console.log(authToken);
  if (authToken && authToken.startsWith("Bearer ")) {
    // Remove 'Bearer ' from the token string
    const token = authToken.slice(7);

    try {
      // Verify the JWT token
      const decodedToken = jwt.verify(token, process.env.SECRET);
      req.myId = decodedToken.id;
      next();
    } catch (error) {
      // If the token is invalid or expired, send a 401 Unauthorized response
      res.status(401).json({
        error: {
          errorMessage: ["Invalid or expired token"],
        },
      });
    }
  } else {
    // If no token is provided or it doesn't start with 'Bearer ', send a 401 Unauthorized response
    res.status(401).json({
      error: {
        errorMessage: ["Please provide a valid token"],
      },
    });
  }
};
