# DEPLOYMENT

- signup on AWS
- create instance
- create key-value pair
- launch instance (chmod 400 "devtinder-shiwangi.pem")
- connect to instance/machine ssh -i "devtinder-shiwangi.pem" ubuntu@ec2-16-16-206-102.eu-north-1.compute.amazonaws.com
- clone project
- go to repo in ubuntu server

(FE deploy process)

- installed depedencies .. run build
- sudo apt update,sudo apt install nginx
- ngnix install (it gives http server)
- sudo systemctl start nginx ------------------------------------> start nginx
- cd /var/www/html/ ---------------------------------------------> server path
- scp -r dist/\* ------------------------------------------------> copy command from dist
- sudo scp -r dist/\* /var/www/html/ ----------------------------> copy dist(made from build) to the path
- enable port :80 on instance

(BE deploy process)

- install dependencies
- run port in local machine and allow port in instance
- install pm2 ---------------------------------------------------> run server 24/7
- pm2 start npm --name "devtinder-backend" -- start -------------> start pm2 application process
- pm2 logs,pm2 flush <name>,pm2 stop <name>,pm2 delete <name>
- sudo nano /etc/nginx/sites-available/default
- nginx config
  server_name 16.16.206.102;

location /api/ {
proxy_pass http://localhost:4000/;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

- sudo systemctl start nginx ------------------------------------> restart nginx
- modify base-url in FE

# ADDING CUSTOM DOMAIN
- PURCHASE DOMAIN FROM GODADDY
- cloudflare signup
- change DNS servers on go-daddy and point to cloudflare
- in A record add IP and domain name
- enable ssl/tsl in cloudflare



frontend server - http://16.16.206.102/login
backend server - http://16.16.206.102:4000
