import router from 'koa-router';
import {getCards} from './game/game';
import {getTables} from './table/table';

export const api = router();

api.get('/cards', getCards)
api.get('/tables', getTables)