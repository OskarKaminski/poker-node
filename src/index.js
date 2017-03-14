import 'babel-polyfill';
import Koa from 'koa';
import cors from 'kcors';
import json from 'koa-json';
import {mountAPI} from './app.router';

const app = new Koa();
app.use(cors());
app.use(json());

mountAPI(app);

app.listen(3000);