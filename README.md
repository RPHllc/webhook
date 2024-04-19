# Purpose

This project automates the update process of Docker-based project when the source code changes on github. It is designed to listen to webhook calls from github, and to execute a script in response. The test performed was to update processes that run in the same host machine

## The scenario is:

- Github is used as a repository for your code
- You pulled the code to a machine and brought the service up using docker-compose up
- You want to automatically rebuild the service if the source code is updated in github

## How it works:

- The code runs directly on the machine, not on a container because we need to run a scripts on the host machine and containers are isolated for security reasons.
- We will use node.js to run the service by listening to a port and triggering scripts that can be customized by repository.

## Installation:

- In the same machine that your project is running, goto the directory of your choice.
- Clone this repository (it will create the webhook directory)
- `cd webhook`
- `mv .env_example .env`
- `nano .env` and
  - enter a secret, this secret will add later to github
  - choose the port
- `nano config.json`
  - you can have as many projects as you want
  - project is the github repository name
  - path is the project directory in the local machine
  - script is the name of the script file that is to reside on the path directory
- Now install the script on the directory of your code and make it executable
  - cp webhook_example.js /the_path_of_your_code/webhook.sh
  - chmod +x /the_path_to_your_code/webhook.sh
- Now we need to configure node
  - Install node in your local machine
    `sudo apt install node npm`
  - Initialize node
    `node init`
  - Install the needed packages
    `npm i`
- Running the server
  - `node server.js`

## Configuring github to send webhook posts to your webhook server

- Goto to your repository page
- Click on settings
- Click on Webhooks
- Click on add webhook (it may prompt you to authenticate)
- Fill the form
  - Payload URL: https://<url to reach your service>/<repository_name>
    - repository_name has to match the project name on the config.json
  - Content type: application/json
  - Secret: <the exact secret you entered in the .env file>
  - Leave the defaults and click Add webhook

## That's it!!!
