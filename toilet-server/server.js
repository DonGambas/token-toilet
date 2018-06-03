// server.js

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var expressStaticGzip = require("express-static-gzip");
var httpserver = require('http');
var cacheControl = require('express-cache-controller');
var fs = require('fs');
var json = require('json');
var parseJson = require('parse-json');
const Web3 = require('web3');
var BigNumber = require('big-number');
var mongoose = require('mongoose');
var Address = require('./model/address');
var LootBox = require('./model/lootBox')
var multer = require('multer');
var upload = multer();
const axios = require('axios')
const EthereumTx = require('ethereumjs-tx')


const TOILET_ADDRESS = '0xf909e78e5abd18124ce12bafa383b39cd13b96e2';
mongoose.Promise = global.Promise;
var con = mongoose.connect('mongodb+srv://toilet:eltoileteroesposta32@cluster0-yaaqs.mongodb.net/test?retryWrites=true');

var web3 = new Web3();

//agregar la carpeta del build con el abi
var json = fs.readFileSync('./abi.json');
var erc721 = fs.readFileSync('./build/contracts/ERC721Interface.json');
var erc20 = fs.readFileSync('./build/contracts/ERC20Interface.json');

//geth en rinkeby
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

if(!web3.isConnected())
    console.log("not connected");
else
    console.log("connected");

var abi = parseJson(json);

var erc721abi = parseJson(erc721).abi;
var erc20abi = parseJson(erc20).abi;
web3.eth.defaultAccount = "";//web3.eth.accounts[0];

var contract = web3.eth.contract(abi);

var Toilet = contract.at(TOILET_ADDRESS);
var contracts721 = [];
var contracts20 = [];

const getCurrentGasPrices = async () => {
    let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json')
    let prices = {
      low: response.data.safeLow / 10,
      medium: response.data.average / 10,
      high: response.data.fast / 10
    }
    return prices;
}

Address.find({}, (err, res) => {
    res.forEach(element => {
        if (element.type === 1) {
            var con = web3.eth.contract(erc721abi);    
            var Con = con.at(element.address);
            contracts721.push(Con);
        } else {
            var con = web3.eth.contract(erc20abi);
            var Con = con.at(element.address); 
            contracts20.push(Con);
        }
    });
    createListeners();
});


var httpServer = httpserver.createServer(app);


/*
app.use(cacheControl({
    maxAge: 2592000 //1 mes
}));
*/

app.use( bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));


app.use("/", expressStaticGzip(__dirname + '/public', {
    enableBrotli: true,
  }));
/* TEST */

var router = express.Router();              // get an instance of the express Router
// var authRouter = express.Router();

router.use(bodyParser.urlencoded({
  extended: true
}));

// authRouter.use(bodyParser.urlencoded({
//   extended: true
// }));

// get top four

router.get('/getContracts', (req, res) => {
    Address.find({}, (err, result) => {
        if (err) {
            res.status(500).send();
        }
        res.json(result);
    });
});

router.get('/getFunds/:address', (req, res) => {
    //call con web3 a travez de tus contracts y getear lo que tenes via tokensOfOwner y balanceOf
    //getear numbre para devolver
    var add = req.params.address;

    Address.find({}, (err,addresses) => {
        if(err) {
            res.status(500).send();
            return;
        }

        var results = [];
        addresses.forEach(element => {
            if (type === 1){
                var contract = web3.eth.contract(erc721abi);
                var type1 = contract.at(element.address);
                t1 = type1.tokensOfOwner.call(add);
                results.push({name: element.name, address: element.address, funds: t1});
            } else {
                var contract = web3.eth.contract(erc20);
                var type2 = contract.at(element.address);
                t2 = type2.balanceOf.call(add);
                results.push({name: element.name, address: element.address, funds: [t1]});
            }
        });
        res.json(results);
    });
});

router.post('/addContract', upload.fields([]), function(req, res){
    // Addear en tabla contracts subrama 721 or 20 el 
    var address = req.body.address;
    var type = req.body.type; // ( 1 -> 721 and 2 -> 20)
    var name = req.body.name;

    var newAddress = new Address ({
        address: address,
        type: type,
        name: name,
    });  

    newAddress.save((err) => {
        if (err) {
            res.status(500).send();
            return;
        }
    
        res.json(newAddress);                
    });
    
	
    
});

app.use('/api', router);


httpServer.listen(8080);

console.log("App listening on port 80 and 443");


//Listener del evento Approve de cada contrato compatible
//Cuando te apruevan a vos te transferis los tokens a voce

//Loot box opened listener: LootBoxOpen
//Guardas en la base de datos: 
//Evento: boxId  -> bytes32
//        prizes -> array<prize>
//        prize -> [ contractAdress , value ]
//        address
//        fecha
Toilet.LootBoxOpen({}, {fromBlock: 0, toBlock: 'latest'}).watch((err,res) => {

});

let gasPrices = getCurrentGasPrices();
//owner, al q le das permiso y el value/tokenid

function createListeners() {
    contracts20.forEach((e) => {
        console.log("listeneando");
        var approveListener = e.Approval({}, {fromBlock: 'latest', toBlock: 'latest'}).watch((err,res) => {
            var rest = JSON.stringify(res);
            console.log("dentro de event 20");
            console.log(rest);
            //transferir a mi
            if(res.spender === TOILET_ADDRESS) {
                let nonce = web3.eth.getTransactionCount(web3.eth.defaultAccount) + 1;
                let details = {
                    "to": res.args.spender,
                    "value": res.args.value,
                    "gas": 21000,
                    "gasPrice": gasPrices.low * 1000000000, // converts the gwei price to wei
                    "nonce": nonce,
                    "chainId": 4 // EIP 155 chainId - mainnet: 1, rinkeby: 4
                  }
                const transaction = new EthereumTx(details);
                transaction.sign( Buffer.from("", 'hex'));
                const serializedTransaction = transaction.serialize();
                const transactionId = web3.eth.sendRawTransaction('0x' + serializedTransaction.toString('hex'));
                console.log(transactionId);
                
                //e.transferFrom.call(res.args.owner, res.args.spender, res.args.value);
            }
        });
    });

    contracts721.forEach((e) => {
        console.log("listeneando");
        
        var approveListener = e.LogApproval({}, {fromBlock: 'latest', toBlock: 'latest'}).watch((err,res) => {
            var rest = JSON.stringify(res);
            console.log("dentro de event 721 logapp");
            console.log(rest);
            //transferir a mi
            if(res.args.approved === TOILET_ADDRESS) {
                let nonce = web3.eth.getTransactionCount(web3.eth.defaultAccount) + 1;
                let details = {
                    "to": res.args.approved,
                    "value": res.args.,
                    "gas": 21000,
                    "gasPrice": gasPrices.low * 1000000000, // converts the gwei price to wei
                    "nonce": nonce,
                    "chainId": 4 // EIP 155 chainId - mainnet: 1, rinkeby: 4
                  }
                const transaction = new EthereumTx(details);
                transaction.sign( Buffer.from("", 'hex'));
                const serializedTransaction = transaction.serialize();
                const transactionId = web3.eth.sendRawTransaction('0x' + serializedTransaction.toString('hex'));
                console.log(transactionId);
                // e.transferFrom.call(res.args.owner, res.args.approved, res.args.tokenId);
            }
        });
    });

    contracts721.forEach((e) => {
        console.log("listeneando");
        var approveListener = e.Approval({}, {fromBlock: 0, toBlock: 'latest'}).watch((err,res) => {
            var rest = JSON.stringify(res);
            console.log("dentro de event 721 app");
            console.log(rest);
            //transferir a mi
            if(res.args.approved === TOILET_ADDRESS) {
                let nonce = web3.eth.getTransactionCount(web3.eth.defaultAccount) + 1;
                let details = {
                    "to": res.args.approved,
                    "value": res.args.value,
                    "gas": 21000,
                    "gasPrice": gasPrices.low * 1000000000, // converts the gwei price to wei
                    "nonce": nonce,
                    "chainId": 4 // EIP 155 chainId - mainnet: 1, rinkeby: 4
                  }
                const transaction = new EthereumTx(details);
                transaction.sign( Buffer.from("", 'hex'));
                const serializedTransaction = transaction.serialize();
                const transactionId = web3.eth.sendRawTransaction('0x' + serializedTransaction.toString('hex'));
                console.log(transactionId);
                // e.transferFrom.call(res.args.owner, res.args.approved, res.args.tokenId);        
            }
        });
    });
}
