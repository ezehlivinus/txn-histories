import express from 'express';
import transactionsRoutes from './transactions.routes';

class Routes {
  public static init(app: express.Application) {
    app.use('/api/v1', transactionsRoutes);
  }
}

export default Routes;
