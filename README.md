# Exercise: Political Speeches

This application calculates some hard coded statistics from requested csv files.
An example of such a csv file can be found [here](testFileServer/public/testfile.csv).

## Technologies

- TypeScript
- ExpressJS
- NodeJS
- Swagger
- Prettier

Note: Since this is based of an example expressjs project I had lying around, there are things like a middleware and some utility functions. Those are not used.

## Installation

```
git clone git@github.com:Myrmod/CC-PoliticalSpeeches.git && cd CC-PoliticalSpeeches && npm ci
```

## Development

This application has an [ExpressJS](https://expressjs.com/) server. You can start it using

```
npm run dev
```

Sadly though `nodemon` was not in the mood to run, so I had it removed. After changing the code, the dev server has to be restarted.

A simple and not production ready file server can be started using

```
npm run fileserver
```

## Documentation

For documentation purposes I added [swagger](https://swagger.io/). If you run the dev server you can look at it and try the routes at http://localhost:3000/swagger.

## Testing

There is no automated way added to test this application. If you want to test it you can either use swagger as mentioned in the Documentation section or you can install a [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) to handle the `.rest` files in the repository.
