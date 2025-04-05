# Auction_House: Decentralized Auction Management Platform

**Auction_House** is a blockchain-powered platform for creating and managing auctions in a secure and transparent manner. Built on Ethereum-compatible networks, it enables users to create auctions, place bids, and interact with decentralized auction records without intermediaries.

---

## Features
- **Create Auctions**: Start new auctions by specifying the item details and auction duration.
- **Place Bids**: Participate in auctions and bid using **EDU Tokens** directly via a decentralized smart contract.
- **Real-Time Updates**: Automatically updates the highest bid and bidder details for ongoing auctions.
- **Withdraw Funds**: Allows users to withdraw bids for unsuccessful auctions.
- **End Auctions**: Enables auction creators to conclude auctions and claim funds securely.
- **Blockchain Integration**: Built with Solidity smart contracts for immutability and transparency.
- **User-Friendly Frontend**: Accessible interface powered by HTML, CSS, and JavaScript, integrated with Web3.js for blockchain interaction.

---

## Contract Details
- **Contract Address**: [0x7167FF2dcf71eda13486ba08679540BeFDB3D5AA](https://edu-chain-testnet.blockscout.com/address/0x7167FF2dcf71eda13486ba08679540BeFDB3D5AA)
- **Network**: EduChain
- **Currency Used**: EDU Token

---

## Deployment
- **Smart Contract Address**: [View Contract on Explorer](https://edu-chain-testnet.blockscout.com/address/0x7167FF2dcf71eda13486ba08679540BeFDB3D5AA)
- **Supported Wallets**: MetaMask and other Web3-compatible wallets.

---

## How to Use

### **1. Create Auction**
- Navigate to the "Create Auction" section on the frontend.
- Specify the following details:
  - **Item Name**: A descriptive name for the auction item.
  - **Auction Duration**: Set the duration in seconds.
- Click on "Create Auction" to deploy the auction details to the blockchain.
- The auction will now be visible in the "Ongoing Auctions" section.

---

### **2. View Ongoing Auctions**
- Access the "Ongoing Auctions" section.
- View details such as:
  - **Auction ID**: Unique identifier for the auction.
  - **Item Name**: Name of the auctioned item.
  - **Highest Bid**: Current highest bid amount.
  - **Highest Bidder**: Address of the current highest bidder.
  - **Auction End Time**: Timestamp indicating when the auction ends.

---

### **3. Place a Bid**
- Select an auction from the list of ongoing auctions.
- Click the "Bid" button and specify the bid amount (in **EDU Tokens**).
- Ensure the bid amount is higher than the current highest bid.
- Confirm the transaction via MetaMask.
- Once confirmed, the bid details will update on the blockchain.

---

### **4. Withdraw Bids**
- If you have placed an unsuccessful bid, you can withdraw your funds.
- Navigate to the "Withdraw Funds" section and select the specific auction.
- Confirm the withdrawal transaction via MetaMask.
- Funds will be transferred back to your wallet.

---

### **5. End Auction**
- Only the auction creator can end an auction.
- Navigate to the "Ongoing Auctions" section and click "End Auction" for a specific auction.
- Confirm the transaction via MetaMask.
- The highest bid amount will be transferred to the auction creator's wallet.

---

## Frontend Details
The frontend provides an intuitive interface for interacting with the **Auction_House** platform. It includes:
- **Connect Wallet**: Connects your MetaMask wallet for blockchain interactions.
- **Create Auction**: Allows users to deploy new auction contracts.
- **View Auctions**: Displays both ongoing and completed auctions.
- **Place Bid**: Enables bidding on active auctions directly from the interface.
