const User = require('../models/User')
const { StatusCodes} = require('http-status-codes')


const register = async (req, res) => {
  const user = await User.create({...req.body})
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({token: token, displayusername: user.displayusername, userid: user._id})
}

const login =  async (req, res) => {
  const {username, password} = req.body

  if (!username || !password){
    res.status(403).json({message: 'Failed'})
  }
  const user = await User.findOne({username})
  if (!user) {
    res.status(403).json({message: 'Failed'})
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    res.status(403).json({message: 'Failed'})
  }
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({token: token, displayusername: user.displayusername, userid: user._id})
}

const logout = async (req, res) => {
  res.status(StatusCodes.OK).send()
}

module.exports = {register, login, logout}