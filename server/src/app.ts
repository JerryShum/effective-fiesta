import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import type { ApiResponse } from 'shared/dist';
import { serveStatic } from 'hono/bun';
import path from 'path';

import { expensesRoute } from './routes/expenses';

const app = new Hono();

app.use('*', logger());

app.get('/hello', async (c) => {
   const data: ApiResponse = {
      message: 'Hello BHVR!',
      success: true,
   };

   return c.json(data, { status: 200 });
});

const apiroutes = app.basePath('/api').route('/expenses', expensesRoute);

//! Server will serve the frontend static files (that we built)
// if someone types in a URL that doesnt exist, we can serve up the react page meant for hadnling the errors, (instead of a bad looking server 404 page)
app.use('*', serveStatic({ root: './static' }));
app.get('*', async (c, next) => {
   return serveStatic({ root: './static', path: 'index.html' })(c, next);
});

export default app;

// exporting types so we can use them in the frontend
export type ApiRoutes = typeof apiroutes;
