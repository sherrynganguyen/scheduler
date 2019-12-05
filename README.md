# Interview Scheduler

- A Single-Page Application (SPA) that allows user to book/cancel/edit interview apoointments, built using ReactJS. The app also used WebSockets. When an appointment is booked/edited/canceled, all connected users will see the update.

- Deployed using Heroku(hosting server site), CircleCI (continuous integration) and Netlify (hosting client site).

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



## Dependencies

- Axios
- Classnames
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

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## API Server

```sh
Fork and clone this https://github.com/sherrynganguyen/scheduler-api for the server.
```

## Running API Server

```sh
npm start
```