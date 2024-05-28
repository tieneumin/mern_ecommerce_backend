// controllers
const bcrypt = require("bcrypt"); // password hasher; https://www.npmjs.com/package/bcrypt
const jwt = require("jsonwebtoken"); // credentials validator; https://www.npmjs.com/package/jsonwebtoken
const User = require("../models/user");
const { JWT_PRIVATE_KEY } = require("../config");

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const generateUserToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    JWT_PRIVATE_KEY,
    {
      expiresIn: "30d",
    }
  );
};

// login user
const loginUser = async (email, password) => {
  /// 1. check if user exists
  const user = await getUserByEmail(email);

  // 2. return error if not
  if (!user) throw new Error("Invalid email or password.");

  // 3. ensure passwords match
  const passwordMatch = bcrypt.compareSync(password, user.password); // user-entered password, hashed password
  if (!passwordMatch) throw new Error("Invalid email or password.");

  // 4. generate JWT
  const token = generateUserToken(user);
  // console.log(token); // backend log

  // 5. return user data
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: token,
  };
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

  // 4. generate JWT
  const token = generateUserToken(newUser);
  // console.log(token); // backend log

  // 5. return user data
  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    token: token,
  };
};

module.exports = {
  getUserByEmail,
  loginUser,
  signUpUser,
};
