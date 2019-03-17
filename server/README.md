# Cat server

This is a minimal cat server that prrrrrrs. This server has a flat file database therefore it does not need
an actual database to store the data.

## Setup

### 1. Install dependencies
Before running any scripts first install the dependencies, run:

```
yarn
```

### 2. Generate a lot of prrrrrrr
Before running the server we need to spawn some cats. To spawn a lot of love run:

```
node seed.js
```

This will create a `db.json` file with `100` cats by default, this can be changed in the `.env` file.

### 3. Run the prrrrrrr

To run the server execute this command:

```
node index.js
```

This will start a node server on port `3000`, this can be changed in the `.env` file.

## API Documentation

The API is simple with just a few requests, full documentation can be found on Postman.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/46812aeb29aaadbb2f4b)

## Options

Server can be configured trough the `.env` file.

| Variable       | Description                                 |
|----------------|---------------------------------------------|
| DATABASE_FILE  | Filename for the database file              |
| NUMBER_OF_CATS | Number of cats to insert into the database. |
| PORT           | Port number for the server                  |