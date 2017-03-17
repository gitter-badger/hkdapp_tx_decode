var abi = require('ethereumjs-abi')
const InputDataDecoder = require('ethereum-input-data-decoder');
const decoder = new InputDataDecoder('./hkdapp.abi');
// const decoder = new InputDataDecoder('./test.abi');

// returns the encoded binary (as a Buffer) data to be sent
// var encoded = abi.simpleEncode("balanceOf(address):(uint256)", "0x0000000000000000000000000000000000000000")
// console.log("encoded "+ encoded + "\n")
// returns the decoded array of arguments
// var decoded = abi.rawDecode([ "address" ], data)
// console.log("decoded "+ decoded+ "\n")


// const data = `0x67043cae0000000000000000000000005a9dac9315fdd1c3d13ef8af7fdfeb522db08f020000000000000000000000000000000000000000000000000000000058a20230000000000000000000000000000000000000000000000000000000000040293400000000000000000000000000000000000000000000000000000000000000a0f3df64775a2dfb6bc9e09dced96d0816ff5055bf95da13ce5b6c3f53b97071c800000000000000000000000000000000000000000000000000000000000000034254430000000000000000000000000000000000000000000000000000000000`;



var data = require('./getBlock_single.json');
var txdata=data.data.txs;

//Need to know about the list in list for more than 1 transaction in the block
var blockdata = txdata[0][1];
// console.log("blockdata = ", blockdata)

var addrfrom = blockdata.input.address;
var addrto = blockdata.address;
var encoded = blockdata.data;
var result = decoder.decodeData(encoded);
// console.log(result)

var TXtype = result.name;
// console.log("txtype = " + TXtype)

var types = result.types;
var inputs = result.inputs;
var results = [];
for (i = 0; i < types.length; i++){
  if (types[i] == "string" ){
    var data = hex2text(inputs[i])
  }
  else if(types[i] == "uint256" || types[i] == "int256"){
    var data = bn2number(inputs[i])
  }
  results.push(data)
}

console.log("results + " + results);
console.log("addrfrom + " + addrfrom);
console.log("addrto + " + addrto);

if (TXtype = "newProduct"){
  console.log("add to new product table")
}





function hex2text(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) {
        var v = parseInt(hex.substr(i, 2), 16);
        if (v) str += String.fromCharCode(v);
    }
    return str;
}

function bn2number(bn){
  var num = Number(bn)
  return num
}
