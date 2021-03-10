var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

var http = require('http');
var https = require('https');

const fs = require('fs');

const path = 'wallet.dat'
const outputtext = 'Wallet does not exist! Run CreateWallet to generate a wallet!';

console.info('\n\nStarting lsdblockchain miner - awaiting to resolve block.');

setInterval(function () {
    console.info('\n\nMining lsdblockchain - awaiting to resolve block.');
    try {
        if (fs.existsSync(path)) {

            promise = f1().then(f2).then(f3); // Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
        }
        else {
            console.log(outputtext);
        }

    } catch (err) { console.log(outputtext); }

}, 60 * 60 * 1000);   


//Get the latest block count
    function f1() {
        var d = $.Deferred();

        setTimeout(function () {
            //***************************************
            var objBlock;
            var obj = JSON.parse(fs.readFileSync('wallet.dat', 'utf8'));
            var cryptoAssetInput = { PrivateKey: obj.PrivateKey, PublicKey: obj.PublicKey, CryptoAsset: "lsdblockchain", Identifier: "" };

            var jsonObject = JSON.stringify(cryptoAssetInput);

            var postheaders = {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(jsonObject, 'utf8')
            };

            var optionspost = {
                host: 'www.lsdblockchain.com',
                path: '/api/cryptoasset4',
                method: 'POST',
                headers: postheaders
            };

            console.info('Options prepared:');
            console.info(optionspost);
            console.info('Do the POST call');

            // do the POST call
            var reqPost = https.request(optionspost, function (res) {
                console.log("statusCode: ", res.statusCode);

                res.on('data', function (da) {
                    console.info('POST result:\n');

                    //process.stdout.write(d);

                    objBlock = JSON.parse(da);
                    console.info('\n\nBlock Info (Number of current Blocks): ' + objBlock.BlockCount);
                    fs.writeFile("info.dat", da, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("BlockInfo updated!");
                    });

                    console.info('\n\nPOST completed');
                });
            });

            // write the json data
            reqPost.write(jsonObject);
            reqPost.end();

            reqPost.on('error', function (e) {
                console.error(e);
            });
        //***************************************

            console.log("1");
            d.resolve(); // resolve() :Resolve a Deferred object and call any doneCallbacks with the given args.
        }, 2000); // You set some time for each method.

        return d.promise(); //promise(): Return a Deferred’s Promise object.

}

//Read latest block
    function f2() {
        var d = $.Deferred();

        var objInfo = JSON.parse(fs.readFileSync('info.dat', 'utf8'));
        var blocktodownload = objInfo.BlockCount;

        setTimeout(function () {

            try {
                if (fs.existsSync(path)) {
                    var objBlock;
                    var obj = JSON.parse(fs.readFileSync('wallet.dat', 'utf8'));
                    var cryptoAssetInput = { PrivateKey: obj.PrivateKey, PublicKey: obj.PublicKey, CryptoAsset: "lsdblockchain", BlockRequest: blocktodownload };

                    var jsonObject = JSON.stringify(cryptoAssetInput);

                    var postheaders = {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(jsonObject, 'utf8')
                    };

                    var optionspost = {
                        host: 'www.lsdblockchain.com',
                        path: '/api/cryptoasset5',
                        method: 'POST',
                        headers: postheaders
                    };

                    console.info('Options prepared:');
                    console.info(optionspost);
                    console.info('Do the POST call');

                    // do the POST call
                    var reqPost = https.request(optionspost, function (res) {
                        console.log("statusCode: ", res.statusCode);

                        res.on('data', function (da) {
                            console.info('POST result:\n');

                            //process.stdout.write(d);

                            objBlock = JSON.parse(da);

                            fs.writeFile(blocktodownload + '.dta', da, function (err) {
                                if (err) {
                                    return console.log(err);
                                }
                                console.log(blocktodownload + ' block was downloaded successfully!');
                            });

                            console.info('\n\nPOST completed');
                        });
                    });

                    // write the json data
                    reqPost.write(jsonObject);
                    reqPost.end();

                    reqPost.on('error', function (e) {
                        console.error(e);
                    });

                }
                else {
                    console.log(outputtext);
                }

            } catch (err) {
                console.log(outputtext);
            }

            console.log("2");
            d.resolve();
        }, 2000);

        return d.promise();
}


    function f3() {
        var d = $.Deferred();

        setTimeout(function () {

            try {
                if (fs.existsSync(path)) {

                    var objInfo = JSON.parse(fs.readFileSync('info.dat', 'utf8'));
                    var blocktodownload = objInfo.BlockCount;

                    var latestblock = blocktodownload + '.dta';
                    var objInfo2 = JSON.parse(fs.readFileSync(latestblock, 'utf8'));

                    var lastHash = objInfo2.SHAKey;

                    var obj = JSON.parse(fs.readFileSync('wallet.dat', 'utf8'));

                    jsonObject = JSON.stringify({
                        "PrivateKey": obj.PrivateKey,
                        "PublicKey": obj.PublicKey,
                        "CryptoAsset": "lsdblockchain",
                        "LastCounter": "0",
                        "LastDate": "",
                        "TotalBlocks": "0",
                        "LastHash": lastHash,
                        "POSAvailableBalance": "0"
                    });

                    var postheaders = {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(jsonObject, 'utf8')
                    };

                    var optionspost = {
                        host: 'www.lsdblockchain.com',
                        path: '/api/cryptoasset15',
                        method: 'POST',
                        headers: postheaders
                    };

                    console.info('Options prepared:');
                    console.info(optionspost);
                    console.info('Do the POST call');

                    // do the POST call
                    var reqPost = https.request(optionspost, function (res) {
                        console.log("statusCode: ", res.statusCode);

                        res.on('data', function (da) {
                            console.info('POST result:\n');

                            process.stdout.write(da);
                            console.info('\n\nPOST completed');
                        });
                    });

                    // write the json data
                    reqPost.write(jsonObject);
                    reqPost.end();

                    reqPost.on('error', function (e) {
                        console.error(e);
                    });

                }
                else {
                    console.log(outputtext);
                }

            } catch (err) {
                console.log(outputtext);
            }
            console.log("3");
            d.resolve();
        }, 2000);

        return d.promise();
    }
   
