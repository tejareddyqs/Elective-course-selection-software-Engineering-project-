const express = require('express');
const connectDB = require('./database/database.js');
const router = require('./route/registrationRoutes.js'); 
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;


app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/all', router);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});


const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
