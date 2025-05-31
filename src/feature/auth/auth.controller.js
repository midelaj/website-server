const User = require("../user/user.model");
const bcrypt = require("bcrypt");
const { signToken } = require("../../../utils/jsonWeb");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  const token = signToken({ id: user._id });
  res.status(201).json({ token, user: { name: user.name, email: user.email } });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("JWT_SECRET:", process.env.JWT_SECRET); // ✅ this should print the secret

  const user = await User.findOne({ email });
  if (!user || user.socialLogin)
    return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

  const token = signToken({ id: user._id });
  res.status(200).json({ token, user: { name: user.name, email: user.email } });
};
