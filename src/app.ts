import express from 'express';
import productRouter from './routers/products.router';
import userRouter from './routers/user.router';
import loginRouter from './routers/login.router';

const app = express();

app.use(express.json());

app.use(productRouter);
app.use(userRouter);
app.use(loginRouter);

export default app;
