import express from 'express';
import bodyParser from 'body-parser';
import { router } from './routes/routes.js';
const app = express();


app.use(bodyParser.json());

app.use('/api/', router);

const port = 3033;

app.listen(port, () => {
    console.log('listening on port ' + port);
});