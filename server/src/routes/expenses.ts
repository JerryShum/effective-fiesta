import { Hono } from 'hono';
import z from 'zod';
import { zValidator } from '@hono/zod-validator';

const expenseSchema = z.object({
   id: z.number().int().positive().min(1),
   title: z.string().min(3).max(100),
   amount: z.number().int().positive(),
});

type Expense = z.infer<typeof expenseSchema>;

// the structure of the data that we want when someone POSTS to this endpoint (expense)
const createPostSchema = expenseSchema.omit({ id: true });

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
   .post('/', zValidator('json', createPostSchema), async (c) => {
      // Posting / sending something to our server via this api endpoint
      //@ Using zod and validator, if the data doesnt match the schema that we created, it will throw an error
      // Validator is a middleware --> its a function that runs before our endpoint function
      // if the data coming in matches the schema --> then the const expense will have the properties/types that we specified in the schema
      const expense = await c.req.valid('json');
      fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
      return c.json(expense);
   })
   .get('/:id{[0-9]+}', (c) => {
      const id = Number.parseInt(c.req.param('id'));
      const expense = fakeExpenses.find((expense) => expense.id === id);

      if (!expense) {
         return c.notFound();
      }

      return c.json({ expense });
   })
   .delete('/:id{[0-9]+}', (c) => {
      const id = Number.parseInt(c.req.param('id'));
      const expense = fakeExpenses.find((expense) => expense.id === id);
      if (!expense) {
         return c.notFound();
      }

      const index = fakeExpenses.findIndex((expense) => expense.id === id);
      if (index !== -1) {
         fakeExpenses.splice(index, 1);
      }
      return c.json({
         expense: expense,
      });
   });
// put

//the c parameter is called the context object
