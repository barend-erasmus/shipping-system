import * as bodyParser from 'body-parser';
import * as express from 'express';
import { LocationsRouter } from './routes/locations';
import { OrdersRouter } from './routes/orders';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.route('/api/locations').get(LocationsRouter.get);

app.route('/api/orders/place').post(OrdersRouter.place);

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
