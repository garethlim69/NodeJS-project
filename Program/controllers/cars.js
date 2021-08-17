const Car = require('../models/Car')
const {StatusCodes} = require('http-status-codes')

const getCars = async (req, res) => {
  const search = req.body.carname
  const count = await (await Car.find({carname: {$regex: search, $options: 'i'}}).select('-_id')).length
  let result = Car.find({carname: {$regex: search, $options: 'i'}}).select('-_id')
  const page = Number(req.body.pageindex) || 1
  const limit = Number(req.body.pagesize) || 10
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit)

  const cars = await result
  res.status(StatusCodes.OK).json({list:cars, totalcount:count})
}

module.exports = getCars