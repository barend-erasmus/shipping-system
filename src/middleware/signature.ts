import * as express from 'express';
import { configuration } from '../configuration';
import { RequestHelper } from '../helpers/request';

export class SignatureMiddleware {
  public static build(): (request: express.Request, response: express.Response, next: express.NextFunction) => void {
    return (request: express.Request, response: express.Response, next: express.NextFunction) => {
      const signature: string = request.query.signature || request.body.signature;

      if (!signature) {
        response.status(403).json({
          message: `Signature required`,
        });

        return;
      }

      const body: any = JSON.parse(JSON.stringify(request.body));

      const query: any = JSON.parse(JSON.stringify(request.query));

      delete body.signature;

      delete query.signature;

      const computedSignature: string = RequestHelper.signature(
        request.method,
        request.path,
        body,
        query,
        configuration.signatureKey,
      );

      if (computedSignature !== signature) {
        response.status(401).json({
          message: `Signature mismatch`,
        });

        return;
      }

      next();
    };
  }
}
