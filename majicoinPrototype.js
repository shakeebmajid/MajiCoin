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
    this.difficulty = 5;

  }

  createGenesisBlock() {
    return new Block(0, "12/23/2017", "0", "Genesis Block");
  }
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);

  }

}

let majicoin = new BlockChain();
majicoin.addBlock(new Block(1, "12/24/2017", {amount: 4}));


console.log("This is a hash:" + SHA256("hi this is a hash").toString())
