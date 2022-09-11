const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const newUser = await User.find();
    res.status(200).json({
      status: 'success',
      data: {
        user: newUser
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: 'failed',
      message: 'Soemthing went wrong!'
    });
  }
}

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_PASSWORD_SALT));
    const newUser = await User.create({ email, username, password: hashedPassword });
    res.status(200).json({
      status: 'success',
      data: {
        user: newUser
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: 'failed',
      message: 'Soemthing went wrong!'
    });
  }
}

exports.login = async (req, res) => {
  const { username, password } = req.body;
  let req_session = req.session;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'User not found!'
      });
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (isCorrectPassword) {
      // write session data to redis DB.
      req_session.user = {
        user: user.username, 
        password: user.password
      };
      console.log('session: ', req.session);
      res.status(200).json({
        status: 'success'
      });
    } else {
      res.status(400).json({
        status: 'success',
        password: 'User credentials are incorrect!'
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: 'failed',
      message: 'Soemthing went wrong!'
    });
  }
}
