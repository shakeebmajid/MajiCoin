const SHA256 = require('crypto-js/sha256')
class Block {
  constructor(index, timestamp, previousHash, transaction) {
    this.index = index;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.transaction = transaction;
    this.hash = this.calcHash();
    this.nonce = 0;
  }

  calcHash() {
    return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.transaction) + this.nonce).toString();
  }

  mineBlock(difficulty) {
    while(this.hash.substring(0, difficulty) != Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calcHash();


    }

    console.log("Block mined with hash: " + this.hash);


  }

}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 18;

  }

  createGenesisBlock() {
    return new Block(0, "12/23/2017", "0", "Genesis Block");
  }
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    var start = new Date();
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
    var end = new Date();
    var millisecondsElapsed = end - start;
    var secondsElapsed = millisecondsElapsed / 1000;
    console.log("Time to mine block: " + secondsElapsed + "s")

  }

  isChainValid() {

    for(let i = 1; i < this.chain.length; ++i) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if(currentBlock.hash !== currentBlock.calcHash() || currentBlock.hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join("0")) {
        return false;
      }

      if(currentBlock.previousHash !== previousBlock.hash) {
        console.log("previous block hash: " + previousBlock.hash.toString());
        return false;
      }

    }

    return true;

  }
}

let majicoin = new BlockChain();
console.log("Mining Block 1...");
majicoin.addBlock(new Block(1, "12/24/2017", {amount: 24}));

if(majicoin.isChainValid()) {
  console.log("Blockchain is valid");
} else {
  console.log("Blockchain is not valid");
}
