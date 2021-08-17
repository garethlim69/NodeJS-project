const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')

const getProfile = async (req, res) => {
  const user = await User.findOne({_id:req.user.userId})
  res.status(StatusCodes.OK).json({username:user.username, displayusername: user.displayusername, userid: req.user.userId})
}

const updateProfile = async (req, res) => {
  const {body:{displayusername}} = req
  if(!displayusername){
    res.status(403).json({message: 'Failed'})
  }
  if (displayusername === ""){
    res.status(403).json({message: 'Failed'})
  }
  const user = await User.findOneAndUpdate({_id:req.user.userId}, req.body, {new:true, runValidators:true})
  res.status(StatusCodes.OK).send()
}

module.exports = {
  getProfile,
  updateProfile
}