import * as express from 'express';

const app = express();

app.route('*').all((request: express.Request, response: express.Response) => {
    response.status(404).json({
        message: `not_found`,
    });
});

app.listen(3000, () => {
    console.log(`listening on port 3000`);
});
