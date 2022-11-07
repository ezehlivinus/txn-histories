# txn-histories
This is an API implemented with expressjs and typescript.
[Alchemy's API was used to get the data](https://docs.alchemy.com/docs/how-to-get-transaction-history-for-an-address-on-ethereum). Each request from the demo app makes a call to the API and returns the data. No persisting or caching is done. Only the first page of the response were used for the demo.

## Installation

```bash
npm install
```

## Setup environment

```bash
cp .env.example .env
# edit .env file with your environment variables if any 
```
## Run the app

```bash
npm run dev
```

## Run the app in production

```bash
npm run build
npm run start
```

## Endpoints and sample requests and responses
base url: `http://localhost:3000/api/v1`
### Fetch POST /transactions/latest
Given a wallet address and contract address, fetch the latest transaction for the wallet address

Sample request

```json
{
  "fromAddress": "0xe42e1f623715772286634c6012e9109588c1e84f",
  "contractAddress": "0x6b175474e89094c44da98b954eedeac495271d0f"
}
```

Sample response
```json
{
  "success": true,
  "message": "Latest transaction fetched successfully",
  "data": {
    "blockNum": "0xf2c951",
    "uniqueId": "0xd44c5563e4ebdf8b962e7bdfcadab4995cae2770ce0437a94d2df76ce316e1cf:log:31",
    "hash": "0xd44c5563e4ebdf8b962e7bdfcadab4995cae2770ce0437a94d2df76ce316e1cf",
    "from": "0xe42e1f623715772286634c6012e9109588c1e84f",
    "to": "0x66c57bf505a85a74609d2c83e94aabb26d691e1f",
    "value": 250,
    "erc721TokenId": null,
    "erc1155Metadata": null,
    "tokenId": null,
    "asset": "DAI",
    "category": "erc20",
    "rawContract": {
      "value": "0x0d8d726b7177a80000",
      "address": "0x6b175474e89094c44da98b954eedeac495271d0f",
      "decimal": "0x12"
    }
  }
}
```

### Fetch POST /transactions/made-more
Given a list of wallet addresses and contract address, fetch the wallet address that made the most transactions for the contract address

Sample request
```json
{
  "fromAddresses": ["0x098820f7ad13f030a087206dbd5cce852c2ba959", "0x964f62da996a48b50199280d69582c9221b6ff38"],
  "contractAddress": "0xa04bf47f0e9d1745d254b9b89f304c7d7ad121aa"
}
```

Sample response
```json
{
  "success": true,
  "message": "Wallet address that made the most transactions fetched successfully",
  "data": {
    "walletAddress": "0x098820f7ad13f030a087206dbd5cce852c2ba959",
    "count": 646
  }
}
```


### List POST /transactions
List all transactions

Sample response
```json
{
  "success": true,
  "message": "Transactions fetched successfully",
  "data": {
    "jsonrpc": "2.0",
    "id": null,
    "result": {
      "transfers": [
        {
          "blockNum": "0x70f58",
          "uniqueId": "0x806172da2073b5c3d961a8c613b7e469766ad19c6220dd0ed35676fe576c625a:log:0",
          "hash": "0x806172da2073b5c3d961a8c613b7e469766ad19c6220dd0ed35676fe576c625a",
          "from": "0xb1a2b43a7433dd150bb82227ed519cd6b142d382",
          "to": "0x9b22a80d5c7b3374a05b446081f97d0a34079e7f",
          "value": null,
          "erc721TokenId": null,
          "erc1155Metadata": null,
          "tokenId": null,
          "asset": null,
          "category": "erc20",
          "rawContract": {
            "value": "0x03e8",
            "address": "0xe6ee69495b571e1042f760d7f34009164aff87a2",
            "decimal": null
          }
        },
        {
          "blockNum": "0x70f5b",
          "uniqueId": "0xd5c17b09dcf6e5daa0566d7d2a8245f10a755ecfbf341ef2d2af6daada6f7c35:log:0",
          "hash": "0xd5c17b09dcf6e5daa0566d7d2a8245f10a755ecfbf341ef2d2af6daada6f7c35",
          "from": "0xb1a2b43a7433dd150bb82227ed519cd6b142d382",
          "to": "0x9b22a80d5c7b3374a05b446081f97d0a34079e7f",
          "value": null,
          "erc721TokenId": null,
          "erc1155Metadata": null,
          "tokenId": null,
          "asset": null,
          "category": "erc20",
          "rawContract": {
            "value": "0x01f4",
            "address": "0xe6ee69495b571e1042f760d7f34009164aff87a2",
            "decimal": null
          }
        }
        ...
      ],
      "pageKey": "83f2c914-c1d4-4df9-ab4b-780ffa31cef2"
    }
  }
}

