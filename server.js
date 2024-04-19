require('dotenv').config();

const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');

const { verifySignature } = require('./utils/withAuth.js');
const listeningSites = require('./config.json');

const app = express();
const port = process.env.PORT || 3011;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.post('/:project', (req, res) => {
  console.log('Received webhook:', req.body);

  if (
    !verifySignature(
      process.env.SECRET,
      req.headers['x-hub-signature-256'],
      JSON.stringify(req.body)
    )
  ) {
    return res.status(401).send('Invalid signature');
  }

  const siteConfig = listeningSites.find(
    (site) => site.project === req.params.project
  );
  if (!siteConfig) {
    return res
      .status(404)
      .send('Configuration not found for the provided project');
  }

  const command = `cd ${siteConfig.path} && ./${siteConfig.script}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send('Failed to execute script');
    }
    console.log(`stdout: ${stdout}`);
    if (stderr) {
      console.log(`stderr: ${stderr}`);
    }
    console.log('Script executed successfully');
    res.status(200).send('Script executed successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
