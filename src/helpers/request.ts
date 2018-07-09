import * as crypto from 'crypto';

export class RequestHelper {

    public static signature(method: string, url: string, body: any, query: any, key: string): string {
        let data: string = `${method}|${url}|`;

        data += RequestHelper.objToString(body);

        data += '|';

        data += RequestHelper.objToString(query);

        return crypto.createHmac('sha1', key).update(data).digest('hex');
    }

    protected static objToString(obj: any): string {
        if (!obj) {
            return null;
        }

        const str: string = Object
            .keys(obj)
            .sort()
            .map((key: string) => {
                const value: any = obj[key];
                return typeof (value) === 'object' ? RequestHelper.objToString(value) : `${key}=${value}`;
            }).join('|');

        return str;
    }

}
