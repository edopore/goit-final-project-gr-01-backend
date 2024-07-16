const { User } = require("../../schema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJWT = (userId, name, email) => {
  return jwt.sign({ userId, name, email }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const generateRefreshToken = (userId, name, email) => {
  return jwt.sign({ userId, name, email }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

const registerUser = async (req, res) => {
  try {
    const { password, email, name } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = generateJWT(user._id, user.name, user.email);
    const refreshToken = generateRefreshToken(user._id, user.name, user.email);

    await User.findByIdAndUpdate(user._id, { token, refreshToken });

    res.status(201).json({ token, refreshToken, user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

module.exports = registerUser;
