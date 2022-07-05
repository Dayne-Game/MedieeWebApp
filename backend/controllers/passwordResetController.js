import User from "../models/userModel.js";
import Token from "../models/tokenModel.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import asyncHandler from "express-async-handler";

// @desc    Send Password Reset Link
// @route   POST /api/password-reset
// @access  Public
const sendPasswordReset = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(400);
    throw new Error("user with given email doesn't exist");
  }

  try {
    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    const link = `${process.env.BASE_URL}/auth/password-reset/${user._id}/${token.token}`;
    await sendEmail(user.email, "Password reset", link);

    res.send("password reset link sent to your email account");
  } catch (error) {
    res.status(500);
    console.log(error);
    throw new Error("An error occured");
  }
});

// @desc    Reset User Password
// @route   POST /api/password-reset/:userId/:token
const resetUserPassword = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("invalid link or expired");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link or expired");

    console.log(req.body.password);

    user.password = req.body.password;
    await user.save();
    await token.delete();

    res.send("password reset sucessfully.");
  } catch (error) {
    res.status(500);
    console.log(error);
    throw new Error("An error occured");
  }
});

export { sendPasswordReset, resetUserPassword };
