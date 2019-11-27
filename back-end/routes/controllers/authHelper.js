const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



async function hashPassword(password) {
  let genSalt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, genSalt);
  return hashedPassword;
}

async function createUser(user) {
  let newUser = await new User({
    email: user.email,
    name: user.name,
    password: user.password
  });
  return newUser; 
}

async function errorHandler(error) {
  let errorMessage = null;
  if (error.errmsg.includes('email_1')) {
    errorMessage = 'Email Already Exist';
  } 
  return errorMessage;
}

async function findOneUser(email) {
  try {
    let foundUser = await User.findOne({email});
    if (!foundUser) {
      return 404;
    }
    return foundUser;
  } catch (error) {
    return error;
  }
}

async function createJwtToken(user) {
  
  let payload = {
    id: user._id,
    email: user.email,
    name: user.name,
    balance: user.balance,
    creditScore: user.creditScore
  }

  let jwtToken = await jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 3600});
  return jwtToken;
}

async function comparePassword(incomingPassword, userPassword) {
  try {
    let comparedPassword = await bcrypt.compare(incomingPassword, userPassword);
    if(comparedPassword) {
      return comparedPassword
    } else {
      throw 409;
    }
  } catch (error) {
    return error;
  }
}

module.exports = {
  hashPassword,
  createUser,
  errorHandler,
  findOneUser,
  createJwtToken,
  comparePassword
}