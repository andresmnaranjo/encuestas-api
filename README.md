# Api Personal <!-- omit in toc -->

> Api personal

- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Main commands](#main-commands)
    - [Development](#development)
    - [Production](#production)
    - [Test](#test)
    - [Lint](#lint)
- [Contributing](#contributing)

## Getting started

### Prerequisites

**Node.js** is required to run the application.

Visit [this page](https://nodejs.org/en/download/) for download instructions.

### Installation

Install the required dependencies:

`$ npm install`

### Configuration

The application relies on environment variables to connect to various services.

To configure these variables:

- Copy and rename the `.env.example` to `.env`
- Open the `.env` file and fill in the required values

### Main commands

#### Development

Start a local development server with the following command:

`$ npm run dev`

This will:

- Fire up a local web server at `localhost` on port 8080 or `PORT` if defined
- Set the `NODE_ENV` variable to `development`
- Watch for changes in the source files allowing the server to reload automatically

#### Production

For production use, start the server with:

`$ npm run start`

**NOTE:** the application makes use of the `NODE_ENV` environment variable do determine its running environment.

#### Test

Run tests with [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) with the following command:

`$ npm run test`

This will:

- Set the `NODE_ENV` variable to `test`
- Run the `migrate` and `seed` commands
- Run all tests defined in the `test` folder

#### Lint

Check for linting errors with:

`$ npm run lint`

Automatically fix linting errors with:

`$ npm run lint:fix`

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
"# expert.efextradingapp" 
"# encuestas-api" 
