let provider;
let signer;
let auctionContract;

const contractAddress = "0x7167FF2dcf71eda13486ba08679540BeFDB3D5AA";
const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "itemName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "endTime",
				"type": "uint256"
			}
		],
		"name": "AuctionCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "AuctionEnded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "FundsWithdrawn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "HighestBidIncreased",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "auctionCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "auctions",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "itemName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "endTime",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "highestBidder",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "highestBid",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "ended",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			}
		],
		"name": "bid",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_itemName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_durationInSeconds",
				"type": "uint256"
			}
		],
		"name": "createAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			}
		],
		"name": "endAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
document.getElementById("connectButton").onclick = async function () {
    if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
    }
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    auctionContract = new ethers.Contract(contractAddress, contractABI, signer);

    document.getElementById("statusText").innerText = "Wallet connected!";
    document.getElementById("menu-section").style.display = "block";
};

document.getElementById("createAuctionButton").onclick = function () {
    document.getElementById("create-auction-section").style.display = "block";
    document.getElementById("view-auctions-section").style.display = "none";
};

document.getElementById("viewAuctionsButton").onclick = async function () {
    document.getElementById("create-auction-section").style.display = "none";
    document.getElementById("view-auctions-section").style.display = "block";

    try {
        const auctionCount = await auctionContract.auctionCount(); // Fetch total auctions
        const ongoingAuctions = [];

        for (let i = 1; i <= auctionCount; i++) {
            const auction = await auctionContract.auctions(i); // Fetch auction details
            const endTime = auction.endTime;
            const ended = auction.ended;

            // Check if auction is ongoing
            if (Date.now() / 1000 < endTime && !ended) {
                ongoingAuctions.push({
                    id: i,
                    owner: auction.owner,
                    itemName: auction.itemName,
                    highestBid: auction.highestBid,
                    highestBidder: auction.highestBidder,
                    endTime: new Date(endTime * 1000).toLocaleString(), // Convert to readable format
                });
            }
        }

        console.log("Ongoing Auctions:", ongoingAuctions);

        // Populate the ongoing auctions in the UI
        populateAuctions(ongoingAuctions, "ongoingAuctions");
    } catch (error) {
        console.error("Error fetching auctions:", error);
        alert("Failed to load auctions.");
    }
};


function populateAuctions(auctions, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear the container before populating

    auctions.forEach((auction) => {
        // Create a button for each auction
        const auctionButton = document.createElement("button");
        auctionButton.className = "auction-button";
        auctionButton.innerHTML = `
            Auction ID: ${auction.auctionId}<br>
            Item Name: ${auction.itemName}<br>
            Highest Bid: ${ethers.utils.formatEther(auction.highestBid)} ETH<br>
            Highest Bidder: ${auction.highestBidder}<br>
            Ends At: ${new Date(auction.endTime * 1000).toLocaleString()}
        `;

        // Attach the auctionId to the button
        auctionButton.dataset.auctionId = auction.auctionId;

        // Add a click listener to the button
        auctionButton.onclick = async function () {
            const auctionId = auctionButton.dataset.auctionId;
            try {
                const bidAmountEth = prompt("Enter your bid amount (in ETH):");
                if (!bidAmountEth || isNaN(bidAmountEth)) {
                    alert("Invalid bid amount!");
                    return;
                }

                // Convert ETH to Wei
                const bidAmountWei = ethers.utils.parseEther(bidAmountEth);

                // Interact with the contract to place a bid
                const tx = await auctionContract.bid(auctionId, {
                    value: bidAmountWei,
                });
                await tx.wait(); // Wait for the transaction to complete
                alert("Your bid was placed successfully!");
            } catch (error) {
                console.error("Error placing bid:", error);
                alert("Failed to place a bid. Ensure the amount is greater than the highest bid.");
            }
        };

        // Append the button to the container
        container.appendChild(auctionButton);
    });
}



document.getElementById("initializeAuctionButton").onclick = async function () {
    const itemName = document.getElementById("itemName").value.trim();
    const auctionDuration = parseInt(document.getElementById("endTime").value, 10);

    if (!itemName || auctionDuration <= 0) {
        alert("Invalid inputs: Please provide a valid item name and duration.");
        return;
    }

    try {
        console.log("Initializing auction with:", itemName, auctionDuration);
        const tx = await auctionContract.createAuction(itemName, auctionDuration);
        console.log("Transaction sent:", tx);
        await tx.wait();
        alert("Auction created successfully!");
    } catch (error) {
        console.error("Error creating auction:", error);
        alert(`Failed to create auction: ${error.message}`);
    }
};


async function viewAuctionDetails(auctionId) {
    document.getElementById("view-auctions-section").style.display = "none";
    document.getElementById("auction-details-section").style.display = "block";

    try {
        const itemName = await auctionContract.auctions(auctionId).itemName;
        const endTime = await auctionContract.auctions(auctionId).endTime;
        const highestBid = await auctionContract.auctions(auctionId).highestBid;
        const highestBidder = await auctionContract.auctions(auctionId).highestBidder;

        document.getElementById("auctionItemName").innerText = itemName;
        document.getElementById("auctionEndTime").innerText = new Date(endTime * 1000).toLocaleString();
        document.getElementById("highestBid").innerText = ethers.utils.formatEther(highestBid) + " ETH";
        document.getElementById("highestBidder").innerText = highestBidder;
    } catch (error) {
        console.error("Error loading auction details:", error);
        alert("Failed to load auction details.");
    }
}

document.getElementById("bidButton").onclick = async function () {
    const bidAmount = document.getElementById("bidAmount").value;
    if (!bidAmount || isNaN(bidAmount) || parseFloat(bidAmount) <= 0) {
        alert("Enter a valid bid amount.");
        return;
    }

    try {
        const tx = await auctionContract.bid({ value: ethers.utils.parseEther(bidAmount) });
        await tx.wait();
        alert("Bid placed successfully!");
    } catch (error) {
        console.error("Error placing bid:", error);
        alert("Failed to place bid.");
    }
};

document.getElementById("endAuctionButton").onclick = async function () {
    try {
        const tx = await auctionContract.endAuction();
        await tx.wait();
        alert("Auction ended successfully!");
    } catch (error) {
        console.error("Error ending auction:", error);
        alert("Failed to end auction.");
    }
};

document.getElementById("backButton").onclick = function () {
    document.getElementById("auction-details-section").style.display = "none";
    document.getElementById("view-auctions-section").style.display = "block";
};