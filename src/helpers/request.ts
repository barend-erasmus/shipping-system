import * as crypto from 'crypto';
import * as express from 'express';
import * as xml from 'js2xmlparser';

export class RequestHelper {
  public static sendResponse(request: express.Request, response: express.Response, result: any): void {
    const accept: string = request.get('Accept');

    if (accept === 'application/json') {
      response.json(result);
    } else if (accept === 'application/xml') {
      response.set('Content-Type', 'application/xml');
      response.send(xml.parse('root', result));
    } else {
      response.status(415).end();
    }
  }

  public static signature(method: string, url: string, body: any, query: any, key: string): string {
    let data: string = `${method}|${url}|`;

    data += RequestHelper.objToString(body);

    data += '|';

    data += RequestHelper.objToString(query);

    return crypto
      .createHmac('sha1', key)
      .update(data)
      .digest('hex');
  }

  protected static objToString(obj: any): string {
    if (!obj) {
      return null;
    }

    const str: string = Object.keys(obj)
      .sort()
      .map((key: string) => {
        const value: any = obj[key];
        return typeof value === 'object' ? RequestHelper.objToString(value) : `${key}=${value}`;
      })
      .join('|');

    return str;
  }
}
