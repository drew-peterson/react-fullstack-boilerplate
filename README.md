## Required for Heroku

### server.js

const PORT = process.env.PORT || 5000;

### package.json

{
"engines": {
"node": "8.1.1", // required for heroku
"npm": "5.6.0" // required for heroku
},
"scripts": {
"start": "node index.js", // required for heroku
"server": "nodemon index.js", // npm nodemon auto refresh express server
"client": "npm run start --prefix client", // go into client directory and run script
"dev" : "concurrently \"npm run server\" \"npm run client\"" // from npm concurrently -- will run both scrips at same time so you dont need 2 tabs...
},
}

## connect client 3000 w/ express 5000

#### client/package.json

"proxy": {
"/auth/google": {
"target": "http://localhost:5000"
}
},

* if anyone trys to go to /auth/google on react server forward them to localhost/5000
* relative links like: <a href="/auth/google">Login me in w/ google</a> will use correct domain
* only affects dev mode because we need webpack server to quickly build our react app...

### DEV mode

1. localhost/3000 -> return main.js all react
2. if react needs data from api create-react-app has a proxy built in that fowards request
3. cookies are not passed by default to different sever 3000 -> 5000 ... because its a security concen
4. browser doesnt know about proxy so it thinks it going from 3000 -> 3000

### PROD mode

1. create-react-app doesnt use client server it will package everything up and place in build folder
2. express/node will return html file w/ react javascript

### HOW AUTH WORKS WITH PROXY

1. vist auth/google --> proxy looks in package.json for configs for route
2. proxy tells browser tow wait + copys req and send req to api
3. we tell passport proxy is ok + give callback w/ relative route
4. proxy gives addtional into to browser request -> to go google
5. google will knows req is comming for 3000 so i will prepend browser domain

## deployment to heroku + building client side automatically....

* heroku only cares about server package.json
* done here: https://devcenter.heroku.com/articles/nodejs-support#heroku-specific-build-steps
* heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"

1. heroku-postbuild: only run this on script on heroku
2. --prefix client: run this in client directory
3. NPM_CONFIG... : this enviornemnt var is only set during this command it means alway devDepencies to be installed, I think create-react-app uses devDepencies to minify and such...

* super automated: http://circleci.com/

# LOCAL TUNNEL

https://github.com/localtunnel/localtunnel

* localhost:5000 is not unique we use localtunnel to as our real domain and post things to our local machine -- only on development.
* see package.json
* setup webhook in sendgrid -- cannot do dev / prod so you manually change sendgrid to production...
* dev webhook url: https://weeznog123.localtunnel.me/api/surveys/webhooks
* to .me is tunnel then goto express route /api/survey/webhooks w/ post...
* add .sh file to prevent crashing... might need to require premissions to work...

## EXTRA FEATURE TO DO

1. improve survey cards
   * use pie / bar chart for chard
   * last responded
   * styling in general
2. allow users to delete surveys that have been created
3. allow users to specific the from field on emails
4. client side sorting of surveys
   * date sent
   * last answer
   * total vouts
5. surveys to be created in draft mode...
   * save draft and come back later...
6. better email template
7. add styled-components
   8 .circle ci
