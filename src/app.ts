import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { ContentTypeMiddleware } from './middleware/content-type';
import { SignatureMiddleware } from './middleware/signature';
import { LocationsRouter } from './routes/locations';
import { OrdersRouter } from './routes/orders';

const app = express();

app.use(ContentTypeMiddleware.build(['application/json']));

app.use(bodyParser.json());

app.use(cors());

app.route('/api/locations')
    .get(LocationsRouter.get);

app.route('/api/orders/approve')
    .get(SignatureMiddleware.build(), OrdersRouter.approve);

app.route('/api/orders/cancel')
    .get(SignatureMiddleware.build(), OrdersRouter.cancel);

app.route('/api/orders/confirm')
    .get(SignatureMiddleware.build(), OrdersRouter.confirm);

app.route('/api/orders/decline')
    .get(SignatureMiddleware.build(), OrdersRouter.decline);

app.route('/api/orders/place')
    .post(OrdersRouter.place);

app.route('*').all((request: express.Request, response: express.Response) => {
    response.status(404).json({
        message: `not_found`,
    });
});

if (require.main === module) {
    app.listen(3000, () => {
        console.log(`listening on port 3000`);
    });
}

export {
    app,
};
