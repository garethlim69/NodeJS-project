const notFound = (req, res) => res.status(404).send('Invalid Route')

module.exports = notFound