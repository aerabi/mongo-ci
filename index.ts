import { MongoClient } from 'mongodb';

export class MongoURL {
    shortUrl: string;
    longUrl: string;

    constructor(public host: string, public port: number, public dbName: string) {
        this.shortUrl = `mongodb://${host}:${port}`;
        this.longUrl = `${this.shortUrl}/${dbName}`;
    }
}

let url: MongoURL;

export async function init(host: string = 'localhost', port: number = 27017, dbName: string = 'test'): Promise<MongoURL> {
    url = new MongoURL(host, port, dbName);
    return url;
}

export async function load(data: Record<string, any[]>): Promise<void> {
    return MongoClient.connect(url.shortUrl)
        .then(client => {
            const db = client.db(url.dbName);
            const queries = Object.keys(data).map(col => {
                const collection = db.collection(col);
                return collection.insertMany(data[col]);
            });
            return Promise.all(queries).then(() => client.close());
        });
}

export async function drop(): Promise<void> {
    return MongoClient.connect(url.shortUrl)
        .then(client => client.db(url.dbName).dropDatabase().then(() => client.close()));
}
