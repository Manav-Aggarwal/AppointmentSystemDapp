Ethereum DApp for a bank appointment system using web3.js 

Allows booking/canceling appointments and uses digital signatures for document signing/verification.

# Simulating an ethereum node locally

1. Install the prerequisite software: you’ll need to download and install Node.js from https:
//nodejs.org/en/. Choose the LTS version (the one on the left).
2. Run npm install -g ganache-cli to install the Ganache CLI, which we will use to simulate
a real Ethereum node on our local machines. 
3. Run ganache-cli --gasLimit=1000000000 to run the node. Note that the gas limit paramter is high 
so that the ethereum node does not run out of gas easily. You  can stop the node at anytime with Ctrl-C.

# Deploying ethereum contract on Remix
1. Go to `https://remix.ethereum.org/` and choose the solidity environment.
2. Upload the file `bankAppointmentSystem.sol` under file explorer and compile using the solidity
compiler tab. Choose 0.5.15 version of the compiler, enable optimization, and click compile.
3. Copy the ABI from under the compilation details button and paste it into the `abi` variable in
`script.js`
4. Run ganache-cli using the above instruction and go to the `Deploy and Run Transactions` tab. 
Select Web3 Provider as the enivironment, set Gas Limit to a high number like `300000000` 
and click deploy. Copy the deployed contract address and paste it into the `contractAddress` variable
in `script.js`

Open up `index.html` and your Dapp is ready to go!
