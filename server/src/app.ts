import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import type { ApiResponse } from 'shared/dist';

import { expensesRoute } from './routes/expenses';

const app = new Hono();

app.use('*', logger());

app.get('/', (c) => {
   return c.text('Hello Hono!');
});

app.get('/hello', async (c) => {
   const data: ApiResponse = {
      message: 'Hello BHVR!',
      success: true,
   };

   return c.json(data, { status: 200 });
});

app.route('/api/expenses', expensesRoute);

export default app;
