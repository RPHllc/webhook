require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = 80;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to handle webhook POST requests
app.post('/webhook', (req, res) => {
  const command = `
    cd ./project_directory &&
    git config --global credential.username RPHllc &&
    git config --global credential.helper '!f() { echo "username=RPHllc"; echo "password=${process.env.GITHUB_TOKEN}"; }; f' &&
    git pull &&
    docker-compose down &&
    docker-compose up --build -d
    `;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send('Server Error');
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    res.status(200).send('Docker update triggered');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
