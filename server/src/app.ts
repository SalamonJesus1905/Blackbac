import express from 'express';
import routes from './routes/index';
import bodyParser from 'body-parser';
import errorHandler from './validations/globalErrorHandling';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('headers', { 'Content-Type': 'application'})
app.use('/v1', routes);
app.use(errorHandler)

export default app