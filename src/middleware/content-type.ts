import * as express from 'express';

export class ContentTypeMiddleware {

    public static build(allowedContentTypes: string[]): (request: express.Request, response: express.Response, next: express.NextFunction) => void {
        return (request: express.Request, response: express.Response, next: express.NextFunction) => {
            const contentType: string = request.get('content-type');

            if (!contentType) {
                next();

                return;
            }

            if (allowedContentTypes.indexOf(contentType) === -1) {
                response.status(415).json({
                    message: `Content Type, ${contentType}, is not supported`,
                });

                return;
            }

            next();
        };
    }

}
