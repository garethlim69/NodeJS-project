require('dotenv').config();
require('express-async-errors');
const express = require('express');
const https = require('https')
const fs = require('fs')
const path = require('path')
const app = express();

const connectDB = require('./db/connect')

const router = require('./routes/routes')

const errorMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

app.use(express.json());
app.use('/api/', router)
app.use(errorMiddleware)
app.use(notFoundMiddleware)

const port = process.env.PORT || 3000;

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
  },
  app
)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    sslServer.listen(port, () => 
      console.log(`Server is Listening on Port ${port}`)
    );
  } catch (error) {
    console.log(error)
  }
};

start();