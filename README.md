# [Interview Scheduler](https://frosty-booth-df789a.netlify.com/)

- A Single-Page Application (SPA) that allows user to book/cancel/edit interview apoointments, built using ReactJS. The app also used WebSockets. When an appointment is booked/edited/canceled, all connected users will see the update.

- Deployed using Heroku(hosting server site), CircleCI (continuous integration) and Netlify (hosting client site).
    > Note: Due to the separation of hosting server and client site, the data in Netlify is not loaded without rerun the server in Heroku.

## Final Product

#### Navigate Days
![alt tag](/docs/day.gif)

#### Book Interview Appointments
![alt tag](/docs/book.gif)

#### Edit Interview Appointments
![alt tag](/docs/edit.gif)

#### Delete Interview Appointments
![alt tag](/docs/del.gif)

#### Error Message
![alt tag](/docs/error.gif)

#### WebSocket - Live Update
![alt tag](/docs/websocket.gif)

#### Deploy client site to Netlify using Heroku hosting server site
![alt tag](/docs/deploy.gif)

## Dependencies

- Axios
- Classnames
- Normalize
- React
- React-dom
- React-scripts
- ProgreSQL
- WebSockets

## DevDependencies

- Babel, Webpack
- Storybook
- Jest/React-Testing-Library
- Cypress
- SASS

## Getting Started

```sh
Fork this repository, then clone your fork of this repository.
```
Install dependencies with `npm install`.

### Running Webpack Development Server

```sh
npm start
```

### Running Jest Test Framework

```sh
npm test
```

### Running Storybook Visual Testbed

```sh
npm run storybook
```

### API Server

Repo [scheduler-api](https://github.com/sherrynganguyen/)

```sh
Fork and clone the repo above for the server.
```

```sh
Follow the steps in this git repo to set up and run the server site
```