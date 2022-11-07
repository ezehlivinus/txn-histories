import express from 'express';
import TransactionController from '../controllers/transactions.controller';

class TransactionRoutes {
  router: express.Router;

  basePath: string;

  constructor() {
    this.router = express.Router();
    this.basePath = '/transactions';
  }

  initialise() {
    this.router.post(`${this.basePath}/latest`, TransactionController.latest);

    this.router.post(`${this.basePath}/made-more`, TransactionController.madeMore);
    
    this.router.post(`${this.basePath}`, TransactionController.list);
    return this.router;
  }
}

const transactionRoutes = new TransactionRoutes();

export default transactionRoutes.initialise();
