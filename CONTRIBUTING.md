# Contributing to Api Personal

The following is a set of guidelines for contributing to the Api Personal project.

## About

### Environment variables

The `.env.example` should list all the environment variables that the application needs to run.

A `.env` file with the environement variable key/value pairs can be added at the root of the project. The `dotenv` package imported in `/src/config/index.js` will make those variables available to the app.

### Project structure

The project is structured as follows:

- `/src`: server source files
  - `/api`: API related files
    - `/controllers`: request handlers
    - `/middlewares`: middleware definitions
    - `/routes`: route definitions
  - `/config`: configuration files (database options, logging configuration, etc)
  - `/services`: business logic files
  - `/utils`: utilities and helpers
  - `index.js`: entry point of the application that holds all the Express server configuration (middlewares, routes, error handling...)
- `/test`: test files

When running the app or performing some commands, additional folders (ignored by Git) will be created such as:

- `/logs`: application logs (errors, info, etc...) generated by `winston` when the application is running
- `.nyc_output/`: test coverage output generated by `nyc` after running `npm run test`

### Routing

#### Instructions

- All routes should be defined in `/src/api`
- For each main route endpoint, two files with the route endpoint as file name should be added to the `/routes` and `/controllers` folders
- All the business logic (retrieving, creating or updating data, etc) should be defined in the `/src/services` folder

#### Example

To define a new `/users` endpoint and two routes `POST /users` and `GET /users/:id`, follow the steps below.

- Create the service with the business logic to retrieve the users:

  - Create a new file called `user.js` in `/src/services`
  - In this new file, define and export two methods:

    ```javascript
    // Import Sequelize model
    const { User } = require('../db/models');

    module.exports = {
      async addUser(userDetails) {
        const newUser = await User.create(userDetails);

        return newUser;
      },

      async getUserById(userId) {
        const user = await User.findByPk(userId);

        return user;
      },
    };
    ```

- Create the controller with the request handlers:

  - Create a new file `users.js` in `/src/api/controllers`
  - In this new file, define and export the request handlers associated to the routes:

    ```javascript
    const UserService = require('../../services/user');

    module.exports = {
      async addUser(req, res, next) {
        const userDetails = req.body;

        const user = await UserService.addUser(userDetails);

        return user;
      },

      async getUser(req, res, next) {
        const { id } = req.params;

        const user = await UserService.getUserById(id);

        return user;
      },
    };
    ```

- Create the route endpoints:

  - Create a new file `users.js` in `/src/api/routes`
  - In this new file, initialize a router object and add the new routes with their associated request handlers:

    ```javascript
    const Router = require('express-promise-router').default;

    const usersController = require('../controllers/users');

    const router = Router();

    router.post('/', usersController.addUser);
    router.get('/:id', usersController.getUser);

    module.exports = router;
    ```

- Finally, import the routes in `/src/api/routes/index.js` and declare a new `/users` route:

  ```javascript
  const usersRouter = require('./users');

  /**
   * API routes
   */
  router.use('/users', usersRouter);
  ```

### Object validation

To validate HTTP request parameters and body, use [celebrate](https://www.npmjs.com/package/celebrate).

Custom validation schemas should be defined in `/src/api/middlewares/validation.js`.

For example, to add validation to the `id` parameter of the `GET /users/:id` route:

- Define a new validation schema in `/src/api/middlewares/validation.js`:

  ```javascript
  const { celebrate, Joi } = require('celebrate');

  const id = Joi.number().integer().positive();

  module.exports = { celebrate, Joi, id };
  ```

- Add the validation schema to the route definition in `/src/api/routes/users.js`:

  ```javascript
  const Router = require('express-promise-router').default;

  const usersController = require('../controllers/users');
  const { celebrate, id } = require('../middlewares/validation');

  const router = Router();

  /**
   * GET /users/:id
   */
  router.get(
    '/:id',
    celebrate({
      params: {
        id: id.required().error(() => 'User ID is required and must be a positive integer.'),
      },
    }),
    usersController.getUser
  );
  ```

Validation errors are handled by the `celebrateErrorParser` middleware from [@kazaar/express-error-handler](https://www.npmjs.com/package/@kazaar/express-error-handler) defined in `/src/index.js`:

```javascript
app.use(celebrateErrorParser);
```

### Testing

All tests should be defined in the `test/` folder.

API tests should be defined in a `test/api/` subfolder. Inside this folder, there should be one directory per main route and inside each directory one file per endpoint.

_Example:_ to add tests for the `POST /users` endpoint:

- Create a new `users/` directory inside `test/api/`
- Inside this directory, add two new files `index.js` and `post.users.js`
- Inside `post.users.js`, add some tests:

  ```javascript
  const supertest = require('supertest');

  const app = require('../../../src');

  const api = supertest(app);

  module.exports = () => {
    it('should return 201 on user creation', async () => {
      const user = {
        firstName: 'John',
        lastName: 'Louis',
        email: 'john.louis@gmail.com',
        password: 'p4ssw0rd',
      };

      await api
        .post('/api/users')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(user)
        .expect(201);
    });
  };
  ```

- Inside `users/index.js`, add a reference to the endpoint tests file:

  ```javascript
  module.exports = () => {
    /**
     * POST /api/users
     */
    describe('POST /api/users', require('./post.users'));
  };
  ```

- Finally, inside `test/api/index.js` add a reference to the route tests file:

  ```javascript
  const supertest = require('supertest');
  const { expect } = require('chai');

  const app = require('../../src');

  const api = supertest(app);

  module.exports = () => {
    /**
     * API /
     */
    describe('API /', () => {
      // ...
    });

    /**
     * API /users
     */
    describe('API /users', require('./users'));
  };
  ```

Tests are run with [Mocha](https://github.com/mochajs/mocha), written with [Supertest](https://github.com/visionmedia/supertest) and [Chai](https://github.com/chaijs/chai) and test coverage is generated by [Istanbul](https://istanbul.js.org/) with [nyc](https://github.com/istanbuljs/nyc).

### Error handling

HTTP error responses are handled by the `httpErrorHandler` middleware from [@kazaar/express-error-handler](https://www.npmjs.com/package/@kazaar/express-error-handler).

```javascript
app.use(httpErrorHandler);
```

When an error is thrown inside of a controller with `next()` or `throw`, this middleware will parse the error as a standard HTTP error to retrieve the error details, log the error and send back the error to the client.

To throw custom HTTP errors, use the `http-errors` module:

```javascript
const { NotFound } = require('http-errors');

module.exports = {
  async getUserById(userId) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new NotFound('User not found.');
    }

    return user;
  },
};
```

In addition, the routes defined in `/src/api/routes` should use the `Router` from the `express-promise-router` package instead of the `express` package. It provides a convenient way to write async controller methods without `try/catch` blocks and `next()` (see [express-promise-router](https://github.com/express-promise-router/express-promise-router)).

### Logs

When running, the application outputs some logs. Two modules are used for this:

- [winston](https://github.com/winstonjs/winston): handles all application logs and writes the output to configured transports (file, console, etc)
- [morgan](https://github.com/expressjs/morgan): logs all incoming HTTP requests

In production mode (`NODE_ENV` set to `production`), the application will not output logs to the console.

Please refer to `/config/logger.js` to see winston configuration.

### Version update

When updating the project's version number, do not forget to update:

- The `version` field in `package.json`
- The `info > version` field in `/src/api/doc/openapi.yaml`

## Style Guide

### ES6

JavaScript files located in `/src` are written in ES6 syntax (see [ECMAScript 6](https://www.w3schools.com/js/js_es6.asp)).

Most of the ES6 features are supported by the latest versions of Node (`async/await`, `let`, `const`...). However, some features like ES6's `import/export` require to be "transpiled" first for Node.js to understand them.

If you want to use ES6's `import/export` syntax instead of the CommonJS `require/module.exports` syntax, use [Babel](https://babeljs.io/).

### Filenames

All filenames should use `kebab-case`.

### Formatting

Formatting rules are defined in `.editorconfig` and `.prettierrc`.

General formatting rules are:

- Indentation of **2 spaces**
- Max line length of **120 characters**
- **Single quotes** instead of double quotes

The rules defined in `.editorconfig` ensure that the coding style guide will stay consistent between different editors (see [EditorConfig](https://editorconfig.org/) for more info).

The rules defined in `.prettierrc` provide more advanced formatting options (see [Linting](#Linting) section below).

### Linting

#### ESLint & Prettier

This project uses:

- [ESLint](https://eslint.org/) for JavaScript errors linting and best practices
- [Prettier](https://prettier.io/docs/en/index.html) for code formatting

Two npm commands are available:

- `npm run lint`
- `npm run lint:fix`

The first one will check for linting and formatting errors and the second one will try to automatically fix these errors. Under the hood, these two commands run ESlint on `*.js` files and Prettier on `*.{json,md,html,yaml,css}` files. All files and folders defined in `.gitignore` will be ignored.

Configuration for these tools are defined in `.eslintrc` and `.prettierrc`. This project essentially uses Airbnb's [JavaScript Style Guide](https://github.com/airbnb/javascript) along with some eslint plugins to ensure coding best practices.

#### Pre-commit hook

In addition to these commands, a git pre-commit hook runs before each commit to ensure that linting and formatting are ok. All staged files run through the same linting process as the `lint:fix` npm command.

The hook was created with `husky` and configured to run `lint-staged`. It is defined in `package.json`.

More info:

- [Git hooks](https://git-scm.com/book/uz/v2/Customizing-Git-Git-Hooks)
- [husky](https://github.com/typicode/husky)
- [lint-staged](https://github.com/okonet/lint-staged)

### JSDoc

JavaScript functions should be annotated with [JSDoc](https://devhints.io/jsdoc). This allows to:

- Check the type of JavaScript code during code time
- Facilitate code readability
- Produce code documentation