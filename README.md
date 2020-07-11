This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  This application is to demo how to query Twitter's search api and demostrating how a React application with MobX to manage saving tweets to localStorage.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. 

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

You must also run `npm run server`.  This is essential for the React app to call the Twitter API.  It will be proxied to [http://localhost:8080/](http://localhost:8080/) in dev mode.

### `npm run server`

Running the Twitter API proxy.<br />

This is an express service that talks to Twitter's API

There are two path built for this service
Open [http://localhost:8080/api/tweet-search](http://localhost:8080/api/tweet-search).  This is an HTTP GET method with 2 parameters (q is the query string and count is maximum number of results to return as the payload)

For this command to work, you will have to configure the following environment variables:

```
export TWITTER_API_KEY="<your Twitter api key>";
export TWITTER_API_SECRET="<your Twitter api secret>";
export ACCESS_TOKEN="<your Twitter Application Access Token>";
export ACCESS_TOKEN_SECRET="<your Twitter Application Access Token Secret>";

```

or simply create an `.env` file containing the following information:

```
TWITTER_API_KEY="<your Twitter api key>";
TWITTER_API_SECRET="<your Twitter api secret>";
ACCESS_TOKEN="<your Twitter Application Access Token>";
ACCESS_TOKEN_SECRET="<your Twitter Application Access Token Secret>";
```


### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

Note: Due to lack of time, didn't have a chance to implement some tests for the containers.  But wrote some happy path tests to cover components to demostrate unit-testing.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

This can be viewed on [http://localhost:8080/](http://localhost:8080/) and run `npm run server` after `npm run build` to evaluate the production build