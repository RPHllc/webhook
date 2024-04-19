# Purpose,

This project automates the update process of a Docker-based project when the source code changes on github.

The scenario is:

- Github is used as a repository for your code
- You pulled the code to a machine and brought the service up using docker-compose up
- You want to automatically rebuild the service if the source code is updated in github

Installation:

- In the same machine that docker is running, goto the directory of your choice.
  The next step will create a "webhook" directory.
- Clone the webhook directory
- Install nginx:
   - sudo apt update && sudo apt install nginx
- Configure Nginx to listen to the port of your choice (here 3011)
   - use nano myNginxProxy to edit the port
- Copy mynginx to the needed place
   sudo cp myNginxProxy /etc/nginx/sites-available/myNginxProxy
- Enable the site
   sudo ln -s /etc/nginx/sites-available/myNginxProxy /etc/nginx/sites-enabled/
- Test the nginx configuration
   sudo nginx -t
- Restart nginx
   sudo systemctl restart nginx

