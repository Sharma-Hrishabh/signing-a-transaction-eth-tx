const Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 =new Web3('https://rinkeby.infura.io/v3/9ce80a86c6c54d22aa821d0486a1a47d')


var account1 = '0xa00c70B72150D627cf53872eefD077079116B6a6'
var account2 = '0xD2a8aa318Fbc56995Db8C415BE6E40329DB1C56C'

const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1,'hex')
const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2,'hex')

web3.eth.getTransactionCount(account1,(err,txCount)=>{
  //Building a Transaction
  const txObject = {
    nonce:web3.utils.toHex(txCount),
    to:account2,
    value:web3.utils.toHex(web3.utils.toWei('1','ether')),
    gasLimit:web3.utils.toHex(21000),
    gasPrice:web3.utils.toHex(web3.utils.toWei('10','gwei')),
  }
  console.log(txObject)
    //signing a Transaction
  const tx = new Tx(txObject)
  tx.sign(privateKey1)

  const serializedTransaction = tx.serialize()
  const raw = '0x'+serializedTransaction.toString('hex')

  //broadcasting a Transaction
  web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
    console.log(txHash)
  })

})
