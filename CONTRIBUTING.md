# Contributing

Contributions to the package are very welcome.

## Build

The toolchain required for development include:
- Node.js
- NPM
- Docker
- Docker-Compose

To install all dependencies:

```bash
npm install
```

Installing dependencies is required for everything, except for running the tests using
Docker-Compose.

To build the project:

```bash
npm test
```

It's a weird naming, but it basically tests if the project is compiled successfully.

 ## Test

Probably the easiest way to run the tests is using Docker-Compose:

```bash
npm run docker:test:replicaset
```

This will create a MongoDB replicaset and run the tests against them.
To clean-up afterwards, do:

```bash
npm run docker:test:clean-up
```

### Test in Host wih Stand-alone MongoDB

If you have a stand-alone instance of MongoDB up and running on your `localhost`,
you can run the tests against it by:

```bash
npm run test:standalone
```

### Test in Host with Replica-set of MongoDB

To tests against a replica-set, with the primary exposed on your `localhos`, do:

```bash
npm run test:replicaset
```

The Docker-Compose configuration can create a replica-set for you:

```bash
docker-compose up -d mongodb-primary mongodb-secondary mongodb-arbiter
```

### Test in Host with Custom Replica-set

Let's say you have a replica-set on your own cloud or something, you can run the tests against them
by setting the correct environment variables:

- `MONGODB_HOST`: the host address
- `MONGODB_ROOT_USER`: the root username
- `MONGODB_ROOT_PASSWORD`: the root password
