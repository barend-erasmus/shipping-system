import * as crypto from 'crypto';

export class RequestHelper {

    public static signature(method: string, url: string, body: any, query: any, key: string): string {
        let data: string = `${method}|${url}`;

        data += JSON.stringify(body);

        data += JSON.stringify(query);

        return crypto.createHmac('sha1', key).update(data).digest('hex');
    }

}
