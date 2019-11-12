# mongo-ci
This library is created to prepare environment for testing with MongoDB, especially designed to work well with CI.

## Installation
```bash
$ npm install -D mongo-ci
```

## Usage
```typescript
import * as mongoCI from 'mongo-ci';

describte('Repository Test', () => {
  beforeAll(async (done) => mongoCI.init(process.env.MONGO_HOST || 'localhost').then(done));
  beforeEach(async (done) => mongoCI.load(mockData).then(done));
  afterEach(async (done) => mongoCI.deleteAll().then(done));
  afterAll(async (done) => mongoCI.drop().then(done));
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
