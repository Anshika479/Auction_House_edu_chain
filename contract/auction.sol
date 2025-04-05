// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MultiAuction {
    struct Auction {
        address owner;
        string itemName;
        uint endTime;
        address highestBidder;
        uint highestBid;
        bool ended;
        mapping(address => uint) pendingReturns;
    }

    mapping(uint => Auction) public auctions;
    uint public auctionCount;

    event AuctionCreated(uint auctionId, string itemName, uint endTime);
    event HighestBidIncreased(uint auctionId, address bidder, uint amount);
    event AuctionEnded(uint auctionId, address winner, uint amount);
    event FundsWithdrawn(uint auctionId, address bidder, uint amount);

    modifier onlyOwner(uint auctionId) {
        require(msg.sender == auctions[auctionId].owner, "Only owner can perform this action.");
        _;
    }

    modifier auctionOngoing(uint auctionId) {
        require(block.timestamp < auctions[auctionId].endTime, "Auction has already ended.");
        _;
    }

    // Create a new auction
    function createAuction(string memory _itemName, uint _durationInSeconds) external {
        require(_durationInSeconds > 0, "Duration must be greater than zero.");
        require(bytes(_itemName).length > 0, "Item name cannot be empty.");

        Auction storage newAuction = auctions[++auctionCount];
        newAuction.owner = msg.sender;
        newAuction.itemName = _itemName;
        newAuction.endTime = block.timestamp + _durationInSeconds;

        emit AuctionCreated(auctionCount, _itemName, newAuction.endTime);
    }

    // Place a bid on a specific auction
    function bid(uint auctionId) external payable auctionOngoing(auctionId) {
        Auction storage auction = auctions[auctionId];
        require(msg.value > auction.highestBid, "There already is a higher bid.");

        if (auction.highestBid != 0) {
            auction.pendingReturns[auction.highestBidder] += auction.highestBid;
        }

        auction.highestBidder = msg.sender;
        auction.highestBid = msg.value;

        emit HighestBidIncreased(auctionId, msg.sender, msg.value);
    }

    // Withdraw funds from a specific auction
    function withdraw(uint auctionId) external returns (bool) {
        Auction storage auction = auctions[auctionId];
        uint amount = auction.pendingReturns[msg.sender];
        require(amount > 0, "No funds to withdraw.");

        auction.pendingReturns[msg.sender] = 0;

        (bool sent, ) = payable(msg.sender).call{value: amount}("");
        require(sent, "Failed to send Ether.");

        emit FundsWithdrawn(auctionId, msg.sender, amount);
        return true;
    }

    // End a specific auction
    function endAuction(uint auctionId) external onlyOwner(auctionId) {
        Auction storage auction = auctions[auctionId];
        require(block.timestamp >= auction.endTime, "Auction time has not ended.");
        require(!auction.ended, "Auction has already ended.");

        auction.ended = true;

        if (auction.highestBidder != address(0)) {
            payable(auction.owner).transfer(auction.highestBid);
        }

        emit AuctionEnded(auctionId, auction.highestBidder, auction.highestBid);
    }
}
