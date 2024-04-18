require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = 80;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  const setupCredentials = `git config --global credential.helper 'store' && \\
                            echo "https://${process.env.GITHUB_USERNAME}:${process.env.GITHUB_TOKEN}@github.com" > ~/.git-credentials`;
  exec(setupCredentials, (setupError) => {
    if (setupError) {
      console.error(`Setup error: ${setupError}`);
      return res.status(500).send('Failed to setup Git credentials');
    }
    const command = `
          cd ./project_directory &&
          git pull &&
          docker compose down &&
          docker compose up --build -d
      `;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Exec error: ${error}`);
        return res.status(500).send('Server Error');
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      res.status(200).send('Docker update triggered');
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
