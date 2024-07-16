const { User } = require("../../schema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJWT = (userId, name, email) => {
  return jwt.sign({ userId, name, email }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const generateRefreshToken = (userId, name, email) => {
  return jwt.sign({ userId, name, email }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

const login = async (req, res) => {
  try {
    // Validacion BD
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Email or password is wrong",
      });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        message: "Email or password is wrong",
      });
    }

    const token = generateJWT(user._id, user.name, user.email);
    const refreshToken = generateRefreshToken(user._id, user.name, user.email);

    await User.findByIdAndUpdate(user._id, {
      token: token,
      refreshToken: refreshToken,
    });

    res.status(200).json({
      token: token,
      refreshToken: refreshToken,
      user: {userid:user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error has ocurred (login)" });
  }
};

module.exports = login;
