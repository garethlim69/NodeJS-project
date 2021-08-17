const errorHandlerMiddleware = async (err, req, res, next) => {
  console.log(err)
  return res.status(403).json({ Message: 'Failed' })
}

module.exports = errorHandlerMiddleware