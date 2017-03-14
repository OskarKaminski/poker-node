import {Table} from '../../services/table/table';

const defaultTables = [
  {stake: 2, numOfSeats: 2},
  {stake: 4, numOfSeats: 2},
  {stake: 6, numOfSeats: 2},
  {stake: 10, numOfSeats: 2},
  {stake: 20, numOfSeats: 2}
]
const tables = defaultTables.map(({stake, numOfSeats}) => {
  return new Table(stake, numOfSeats);
});

export const getTables = (ctx) => {
  ctx.body = tables;
};