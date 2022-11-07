import axios from 'axios';
import { getLatestTransactions } from "../interfaces/transaction.interface";


const fetchURL = `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_TEST_API_KEY}`;

const _data: any = {
  jsonrpc: "2.0",
  method: "alchemy_getAssetTransfers",
  params: [{
    category: ["erc20", "erc721", "erc1155"],
    order: "desc",
  }]
}

const requestOptions = {
  method: 'post',
  headers: { 'Content-Type': 'application/json' },
  data: {}
};



class TransactionService {

  constructor() { }

  async getTransactions(data: getLatestTransactions): Promise<any> {

    _data.params[0].fromAddress = data.fromAddress;
    _data.params[0].contractAddresses = [data.contractAddress];
    requestOptions.data = JSON.stringify(_data);

    const response = await axios(fetchURL, requestOptions as any);
    
    return response.data;

  }

  async listTransactions() {
    _data.params[0].toBlock = 'latest';
    _data.params[0].order = 'asc';

    requestOptions.data = JSON.stringify(_data);

    const response = await axios(fetchURL, requestOptions as any);

    return response.data;
  }

  async getRandomTransactions(): Promise<any> {

    _data.params[0].order = 'asc';
    
    requestOptions.data = JSON.stringify(_data);

    const response = await axios(fetchURL, requestOptions as any);

    return response.data;

  }
}

export default new TransactionService();