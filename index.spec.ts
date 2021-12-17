import {MongoClient, ObjectId} from 'mongodb';
import {deleteAll, drop, init, load, MongoURL} from "./index";

const mockData = {
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

const doStandardTesting = (url: Promise<MongoURL>) => {
    let client: MongoClient;
    return url
        .then(url => MongoClient.connect(url.shortUrl))
        .then(_client => client =_client)
        .then(() => load(mockData))
        .then(() => client.db('test').collections())
        .then(cols =>
            cols.filter(col => col.collectionName.includes('device-group'))
                .forEach(col => col.countDocuments().then(count => expect(count).toBe(2))))
        .then(() => deleteAll())
        .then(() => client.db('test').collections())
        .then(cols => cols.forEach(col => col.countDocuments().then(count => expect(count).toBe(0))))
        .then(() => drop())
        .catch(fail);
};

describe('MongoCI', () => {
    it('standalone instance with no credentials', done => doStandardTesting(init()).finally(done));

    it('3er replicaset with authentication', done => {
      const host = process.env.MONGODB_HOST || 'localhost';
      doStandardTesting(init(host, 27017, 'test',
        { auth: { user: 'root', password: 'password123' } })).finally(done)
    });
});

