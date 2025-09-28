import { Hono } from 'hono';

type Expense = {
   id: number;
   title: string;
   amount: number;
};

const fakeExpenses: Expense[] = [
   {
      id: 1,
      title: 'Rent',
      amount: 1500,
   },
   {
      id: 2,
      title: 'Groceries',
      amount: 300,
   },
   {
      id: 3,
      title: 'Utilities',
      amount: 200,
   },
];

export const expensesRoute = new Hono()
   .get('/', (c) => {
      // getting something from our API
      return c.json({ expenses: fakeExpenses });
   })
   .post('/', async (c) => {
      // Posting / sending something to our server via this api endpoint
      const expense = c.res.json();
      return c.json(expense);
   });
// delete
// put

//the c parameter is called the context object
//
