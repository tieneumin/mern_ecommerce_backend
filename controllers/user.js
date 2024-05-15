// controllers
const bcrypt = require("bcrypt"); // password hasher; https://www.npmjs.com/package/bcrypt
const User = require("../models/user");

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

// login user
const loginUser = async (email, password) => {
  /// 1. check if user exists
  const user = await getUserByEmail(email);
  console.log(user);
  // 2. return error if not
  if (!user) throw new Error("Invalid email or password.");

  // 3. ensure passwords match
  const passwordMatch = bcrypt.compareSync(password, user.password); // user-entered password, hashed password
  if (!passwordMatch) throw new Error("Invalid email or password.");

  // return user data
  return user;
};

// create user
const signUpUser = async (name, email, password) => {
  // 1. check if email exists
  const emailExists = await getUserByEmail(email);
  if (emailExists) throw new Error("Email already exists.");

  // 2. create new user
  const newUser = new User({
    name,
    email,
    password: bcrypt.hashSync(password, 10), // hash password
  });

  // 3. save data
  await newUser.save();

  // 4. return user data
  return newUser;
};

module.exports = {
  getUserByEmail,
  loginUser,
  signUpUser,
};
