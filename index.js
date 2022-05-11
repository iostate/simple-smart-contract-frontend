// Source code to interact with smart contract in the simplest way possible, using
// pure HTML and JS. Yet to introduce React..

/**
 * BEGIN CONNECTING TO METAMASK
 * CONNECTS THROUGH METAMASK BY DETECTING IF window.ethereum exists
 * window is the BROWSER window, see this link for more info:
 * https://www.w3schools.com/jsref/obj_window.asp
 */

// Connect app to MetaMask with Web3
// You can use the following script to make any DAPP connect to metamask
// make sure to choose rinkeby network
async function loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert("Non-ethereum browser detected. Consider using MetaMask!");
  }
}
loadWeb3();

console.log(window.web3.currentProvider);

// contractAddress and abi are setted after contract deploy
var contractAddress = "0x7956F2e2f694276C7ee9437586B45552F5C067Ca";
var abi = JSON.parse(
  '[{"constant":true,"inputs":[],"name":"getInfo","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_info","type":"string"}],"name":"setInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]'
);

//contract instance
contract = new web3.eth.Contract(abi, contractAddress);

// Accounts
var account;

web3.eth.getAccounts(function (err, accounts) {
  if (err != null) {
    alert("Error retrieving accounts.");
    return;
  }
  if (accounts.length == 0) {
    alert("No account found! Make sure the Ethereum client is configured properly.");
    return;
  }
  account = accounts[0];
  console.log("Account: " + account);
  web3.eth.defaultAccount = account;
});

//Smart contract functions
function registerSetInfo() {
  info = $("#newInfo").val();
  console.log(info);
  contract.methods
    .setInfo(info)
    .send({ from: account })
    .then(function (tx) {
      console.log("Transaction: ", tx);
    });
  $("#newInfo").val("");
}

function registerGetInfo() {
  contract.methods
    .getInfo()
    .call()
    .then(function (info) {
      console.log("info: ", info);
      document.getElementById("lastInfo").innerHTML = info;
    });
}
