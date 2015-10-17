Shopping List App written in NodeJS,
using AngularJS and MongoDB.

####To install application locally:

- Install mongodb

- Clone the repo

- Create local environment variables for username and password:
```sh
set -gx SHOP_USERNAME 'user'
set -gx SHOP_PASSWORD 'password'
```

- Run:
```sh
npm install
node server.js
```
---

####To install application on Heroku:


- Clone the repo

- Login to Heroku
```sh
heroku login
```
- Create an app on Heroku
```sh
heroku create
```
- Create Heroku environment variables for username and password:
```sh
heroku config:set SHOP_USERNAME=user
heroku config:set SHOP_PASSWORD=password
```
- Push repo to heroku
```sh
git push heroku master
```




