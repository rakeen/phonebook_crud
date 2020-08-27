<img src = './docs/artwork.svg' width="300" alt="artwork" />

# spring_rain

[![Actions Status](https://github.com/rakeen/spring_rain/workflows/koa%20workflow/badge.svg)](https://github.com/rakeen/spring_rain/actions)
![GitHub package.json version](https://img.shields.io/github/package-json/v/rakeen/spring_rain)
![node](https://img.shields.io/badge/node-14.4.0-brightgreen)
[![Lincense](http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-badge-4.png)](http://www.wtfpl.net/about/)
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/heroku/node-js-getting-started)

## Build Instruction

To start everything in one command:  

`npm run build && npm run start:prod`

### To start the `Task#01`  

```sh
cd ..
npm i
npm start
```

By default it will run on port `3000`


To build the `Task#01`  

```sh
cd q01
npm i
npm run build
```

### To start `Task#02`

```
npm start
```

## Docker 🐋

Build the docker image:  
`docker build -t spring_rain .`  

Run the image:  
`docker run -it spring_rain`  

## Seed data

In order to put dummy data first make sure the `koa` server is running and the dev dependencies are also installed.  

```
npm i --only=dev
npm run seed
```


## API Docs

An intereactive API documentation is available at `/docs/swagger.html` after running the full system.