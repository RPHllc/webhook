# Purpose

This project automates the update process of Docker-based project when the source code changes on github. It is designed to listen to webhook calls from github, and to execute a script in response. The test performed was to update processes that run in the same host machine

## The scenario is:

- Github is used as a repository for your code
- You pulled the code to a machine and brought the service up using docker-compose up
- You want to automatically rebuild the service if the source code is updated in github

## How it works:

- The code runs directly on the machine, not on a container because we need to run a scripts on the host machine and containers are isolated for security reasons.
- We will use node.js to run the service by listening to a port and triggering scripts that can be customized by repository.

Installation:

- In the same machine that your project is running, goto the directory of your choice.
- Clone this repository (it will create the webhook directory)
- `cd webhook`
- `mv .env_example .env`
- `nano .env` and enter a secret, this secret will add later to github
- `nano config.json`
