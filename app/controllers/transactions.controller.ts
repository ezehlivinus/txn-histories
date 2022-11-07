import { Request, Response } from 'express';
import transactionService from '../services/transaction.service';

class TransactionController {

  constructor() {}

  async latest(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const transactions = await transactionService.getTransactions(data);

    const latestTransaction = transactions?.result?.transfers[0]

    if (latestTransaction) {
      return res.status(200).send({
        success: true,
        message: 'Latest transaction fetched successfully',
        data: latestTransaction
      });
    }
    
    return res.status(404).send({
      success: false,
      message: 'No transactions found'
    });

  }

  async list(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const transactions = await transactionService.listTransactions();

    if (!transactions?.result?.transfers.length) {
      return res.status(404).send({
        success: false,
        message: 'No transactions found'
      });
    }

    return res.status(200).send({
      success: true,
      message: 'Transactions fetched successfully',
      data: transactions
    });
  }

  async madeMore(req: Request, res: Response): Promise<Response> {
    const { fromAddresses, contractAddress } = req.body;

    if (!fromAddresses || !contractAddress) {
      return res.status(400).send({
        success: false,
        message: 'fromAddresses and contractAddress are required'
      });
    }

    const randomTransactions = await transactionService.getRandomTransactions();

    // filter out transactions that are not from the addresses we are interested in and contract address
    const transactions = randomTransactions?.result?.transfers.filter((transaction: any) => {

      return fromAddresses.includes(transaction.from) && transaction?.rawContract?.address === contractAddress;
    });
    
    if (!transactions.length) {
      return res.status(404).send({
        success: false,
        message: 'No transactions found for the given addresses and contract address'
      });
    }

    const madeMore = transactions.reduce((acc: any, transaction: any) => {
      acc[transaction.from] = acc[transaction.from] ? acc[transaction.from] + 1 : 1;
      return acc;
    });

    const highestAddress = Object.keys(madeMore).reduce((a, b) => madeMore[a] > madeMore[b] ? a : b);

    return res.status(200).send({
      success: true,
      message: "Wallet address that made the most transactions fetched successfully",
      data: {
        walletAddress: highestAddress,
        count: madeMore[highestAddress]
      }
    });

  }
}

export default new TransactionController();
