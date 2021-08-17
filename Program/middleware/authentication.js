const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {CustomAPIError} = require('../errors/custom-api')

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')){
    res.status(403).json({message: 'Failed'})
  }
  const token = authHeader.split(' ')[1]
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = {userId: payload.userId, username: payload.username}
    next()
  } catch (error) {
    res.status(403).json({message: 'Failed'})
  }
}

module.exports = auth;