const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("./Usuario"); // Asegúrate de que el modelo de usuario está correctamente importado

const getUserByEmail = async (email) => {
  return await Usuario.findOne({ email }).exec();
};

const createUser = async (body) => {
  const hashedPassword = await bcrypt.hash(body.password, parseInt(process.env.SALT));
  const user = new Usuario({
    email: body.email,
    password: hashedPassword,
  });
  await user.save();
  const token = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  user.token = token;
  user.refreshToken = refreshToken;
  await user.save();
  return user;
};

const comparePasswords = async (textPassword, user) => {
  return await bcrypt.compare(textPassword, user.password);
};

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

const updateToken = async (id, token, refreshToken) => {
  await Usuario.findByIdAndUpdate(id, { token, refreshToken }).exec();
};

module.exports = {
  getUserByEmail,
  createUser,
  comparePasswords,
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  updateToken,
};
