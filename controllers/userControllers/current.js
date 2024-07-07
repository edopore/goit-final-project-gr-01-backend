const { User } = require("../../schema/userSchema");

const current = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user });
    if (!user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
    res.status(200).json({ name: user.name, email: user.email });
  } catch (error) {
    return res.json({ message: "An error has ocurred (currentUser)" });
  }
};

module.exports = current;
