# Deskplan Service

## Critical dependencies

-   Node
-   Apollo Server
-   MongoDB
-   Mongoose

Requires Node 13 or greater.

## Setup

    npm i

## Development

    npm start

An Apollo server will start listening for requests at `localhost:4000` and a MongoDB instance will run at `mongodb://localhost:27017`.

You can start the service on its own with `npm run start:service` or the database only at `npm run start:db`.
