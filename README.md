# MongoCI
[![codeql](https://github.com/aerabi/mongo-ci/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/aerabi/mongo-ci/actions/workflows/codeql-analysis.yml)
![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/mongo-ci)

This library is created to prepare environment for testing with MongoDB, especially designed to work well with CI.

## Installation
```bash
$ npm install -D mongo-ci
```

## Usage
With `async`:
```typescript
import * as mongoCI from 'mongo-ci';

describte('Repository Test', () => {
  beforeAll(async () => mongoCI.init(process.env.MONGO_HOST || 'localhost'));
  beforeEach(async () => mongoCI.load(mockData));
  afterEach(async () => mongoCI.deleteAll());
  afterAll(async () => mongoCI.drop());
});
```

With `done`:
```typescript
import * as mongoCI from 'mongo-ci';

describte('Repository Test', () => {
  beforeAll(done => mongoCI.init(process.env.MONGO_HOST || 'localhost').then(done));
  beforeEach(done => mongoCI.load(mockData).then(done));
  afterEach(done => mongoCI.deleteAll().then(done));
  afterAll(done => mongoCI.drop().then(done));
});
```

The mock data:
```typescript
import { ObjectId } from 'mongodb';

export const mockData = {
  'device-groups':
    [
      {
        '_id': new ObjectId('0123456789abcdef01234560'),
        'devices': [],
        'lastModified': '1572945305311',
      },
      {
        '_id': new ObjectId('0123456789abcdef01234561'),
        'parent': '0123456789abcdef01234560',
        'devices': [],
        'lastModified': '1572945305311',
      },
    ],
  };
```

In the GitLab-CI configuration, i.e. `.gitlab-ci.yml`:
```yaml
variables:
  NODE_VERSION: 12.0.0

test:jasmine:
  stage: test
  image: node:${NODE_VERSION}
  allow_failure: false
  services:
    - mongo
  variables:
    MONGO_HOST: 'mongo'
    Host: 'mongo'
    Database: 'test'
  script:
    - npm test
```
Travis-CI configuration is similar. For further details please refer to [this document](https://docs.travis-ci.com/user/database-setup/#mongodb).
