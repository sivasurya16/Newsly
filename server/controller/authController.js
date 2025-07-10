import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import User from "../models/User.js"


const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if the user already exists
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({ msg: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    await User.create({ email: email, password: hashPassword, isAdmin: false });

    // return jwt
    const payload = {
      user: {
        email: email,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server error' });
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if the user exists
    let user = await User.findOne({ email: email });
    // console.log(user)
    if (!user) {
      return res.status(200).json({ msg: 'Email or password incorrect' });
    }

    // check is the encrypted password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).json({ msg: 'Email or password incorrect' });
    }

    // return jwt
    const payload = {
      user: {
        email: email,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

const getUserInfo = async (req, res) => {
  try {
    let user = await User.findOne({ "email": req.user.email });
    delete user.password;
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
}

const authController = {
  register,
  login,
  getUserInfo
}

export default authController;