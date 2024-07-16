const jwt = require("jsonwebtoken");
const { User } = require("../../schema/userSchema");

const generateJWT = (userId, name, email) => {
  return jwt.sign({ userId, name, email }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const generateRefreshToken = (userId, name, email) => {
  return jwt.sign({ userId, name, email }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

const refreshTokens = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: "El token de actualización es requerido" });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Token de actualización inválido" });
    }

    const newAccessToken = generateJWT(user._id, user.name, user.email);
    const newRefreshToken = generateRefreshToken(user._id, user.name, user.email);

    await User.findByIdAndUpdate(user._id, {
      token: newAccessToken,
      refreshToken: newRefreshToken,
    });

    res.status(200).json({ token: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: "Token de actualización inválido" });
  }
};

module.exports = refreshTokens;
