// Copyright (c) Manav Aggarwal
// All Rights Reserved

// =============================================================================
//                                  Config 
// =============================================================================

// sets up web3.js
if (typeof web3 !== 'undefined')  {
	web3 = new Web3(web3.currentProvider);
} else {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// Default account is the first one
web3.eth.defaultAccount = web3.eth.accounts[0];

var GENESIS = '0x0000000000000000000000000000000000000000000000000000000000000000';

// This is the ABI for your contract
// ============================================================
var abi = [
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "addressIndices",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "appointments",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "bankId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "branch",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "timeSlot",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "visitorName",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isBooked",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "cancelAppointment",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "checkAppointment",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "checkDocument",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_visitorName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_bankId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_branch",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_timeSlot",
				"type": "string"
			}
		],
		"name": "createAppointment",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "documentSigs",
		"outputs": [
			{
				"internalType": "string",
				"name": "signature",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "exists",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getSignature",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "signature",
				"type": "string"
			}
		],
		"name": "putSignature",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "h",
				"type": "bytes32"
			},
			{
				"internalType": "uint8",
				"name": "v",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "r",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "s",
				"type": "bytes32"
			}
		],
		"name": "verifyHash",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_bankId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_branch",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_timeSlot",
				"type": "string"
			}
		],
		"name": "viewWaitingTimes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
// ============================================================
abiDecoder.addABI(abi);

// Reads in the ABI
var BlockchainBankContractSpec = web3.eth.contract(abi);

// This is the address of the contract you want to connect to; copy this from Remix
var contractAddress = '0x132ced52F2cf54177d88de58e595Cd1f424EAf34' //Replace with your own contract address

var BlockchainBank = BlockchainBankContractSpec.at(contractAddress)

//Retrieves waiting time based on given parameters
function getWaitingTime(bankId, branch, timeSlot) {
	waitingTime = parseInt(BlockchainBank.viewWaitingTimes(bankId, branch, timeSlot));
	if (waitingTime == 0) {
		return "<em>Available</em>";
	} else {
		return "<em>There are " + waitingTime.toString() + " existing appointment(s) for this selection.</em>"
	}
}

//Returns appointment in array form
function appointmentBank() {
	res = BlockchainBank.checkAppointment();
	return {
        bankId: parseInt(res[0]),
		branch: res[1],
		timeSlot: res[2]
    };
}

//Maps bank Id to a bank name
function getBankNameFromId(bankId) {
	var banks = [];
	banks[1] = "Bank of Montreal";
	banks[2] = "The Bank of Nova Scotia (Scotiabank)";
	banks[3] = "Royal Bank of Canada";
	banks[4] = "Toronto-Dominion Canada Trust";
	banks[6] = "National Bank of Canada"
	banks[10] = "Canadian Imperial Bank of Commerce";
	banks[16] = "HSBC";
	return banks[bankId];
}

//Returns button string based on whether an appointment exists
function getAppointmentText() {
	var appointment = appointmentBank();
	if (appointment.bankId == 0) {
		document.getElementById('name').disabled = false;
		$("#status").html("");
		return "Book an appointment";
	} else {
		document.getElementById('name').disabled = true;
		$("#status").html(
			"You have an appointment with " + getBankNameFromId(appointment.bankId) 
			+ " " + appointment.branch + " at " + appointment.timeSlot 
		);
		return "Cancel existing appointment";
	}
}

//Cancels or Books appointment based on given parameters
function appointmentAction(bankId, branch, timeSlot) {
	var appointment = appointmentBank();
	if (appointment.bankId != 0) {
		BlockchainBank.cancelAppointment({gas: 300000});
		alert("Appointment canceled!");
		return;
	}
	var name = document.getElementById('name').value;
	BlockchainBank.createAppointment(name, parseInt(bankId), branch, timeSlot, {gas: 300000});
	document.getElementById('name').value = "";
	alert("Booked appointment!");
}

//Displays info based on postal code
//Acceptable postal code - V7Y 1K8
function displayInfo(postalCode) {
	if (postalCode != "V7Y 1K8") {
		alert("Only the following postal codes are supported: \n V7Y 1K8");
	} else {
		document.getElementById('entrance').hidden = true;
		document.getElementById('main').hidden = false;
	}
}

//Returns true if document exists for a user, false otherwise
function document_exists() {
	return BlockchainBank.checkDocument();
}

//Returns string based on whether user already uploaded documents
function getDocumentActionText() {
	if (document_exists()) {
		return "Verify Documents:";
	} else {
		return "Upload Documents:"
	}
}

function tohex(msg){
    var hexmsg = "";
    for(var i=0; i<msg.length; i++){
        hexmsg += msg.charCodeAt(i).toString(16);
    }
    return "0x"+hexmsg;
}

function signMessage(str) {
	var msghex = tohex(str);
	var sig = web3.eth.sign(web3.eth.defaultAccount, msghex);
	return sig;
}
function verifySig(str, sig){
    var r = sig.slice(0, 66);
    var s = '0x' + sig.slice(66, 130);
    var v = '0x' + sig.slice(130, 132);
    v = web3.toDecimal(v) + 27;

    var verificationMessage = "\x19Ethereum Signed Message:\n" + str.length + str;
    var verificationMessageHash = web3.sha3(verificationMessage);

	var resultAddr = BlockchainBank.verifyHash(verificationMessageHash, v, r, s);
    return resultAddr == web3.eth.defaultAccount;
}

//Uploads or verifies a given file based on user
function document_action() {
	files = document.getElementById('file_action').files;
    if (files.length === 0) {
        alert('No file is selected!');
        return;
	}
    var reader = new FileReader();
    reader.onload = function(event) {
		fileContent = event.target.result;
		hash = CryptoJS.SHA256(fileContent).toString();
		if (document_exists()) {
			sig = BlockchainBank.getSignature();
			if (verifySig(hash, sig)) {
				alert("Successfully verified document signature using user public key!");
			} else {
				alert("Could not verify uploaded document!");
			}

		} else {
			let signature = signMessage(hash);
			BlockchainBank.putSignature(signature, {gas: 300000});
			alert("Uploaded your document!");
		}
		$("#file_action_text").html(getDocumentActionText());
    };
    reader.readAsText(files[0]);
	document.getElementById("file_action").value = "";
}

// =============================================================================
//                                      UI 
// =============================================================================

// This code updates the 'My Account' UI with the results of your functions
$("#waiting_time").html(getWaitingTime(
	$("#bank_ids :selected").val(), $("#branches :selected").val(), $("#times :selected").val())
);
$("#appointment_text").html(getAppointmentText());
$("#file_action_text").html(getDocumentActionText());
$("#bank_ids").change(function() {
	$("#waiting_time").html(getWaitingTime(
		$("#bank_ids :selected").val(), $("#branches :selected").val(), $("#times :selected").val())
	);
	$("#appointment_text").html(getAppointmentText());
});
$("#branches").change(function() {
	$("#waiting_time").html(getWaitingTime(
		$("#bank_ids :selected").val(), $("#branches :selected").val(), $("#times :selected").val())
	);
	$("#appointment_text").html(getAppointmentText());
});
$("#times").change(function() {
	$("#waiting_time").html(getWaitingTime(
		$("#bank_ids :selected").val(), $("#branches :selected").val(), $("#times :selected").val())
	);
	$("#appointment_text").html(getAppointmentText());
});
$("#myaccount").change(function() {
	web3.eth.defaultAccount = $(this).val();
	$("#waiting_time").html(getWaitingTime(
		$("#bank_ids :selected").val(), $("#branches :selected").val(), $("#times :selected").val())
	);
	$("#appointment_text").html(getAppointmentText());
	$("#file_action_text").html(getDocumentActionText());
});

// Allows switching between accounts in 'My Account' and the 'fast-copy' in 'Address of person you owe
var opts = web3.eth.accounts.map(function (a) { return '<option value="'+a+'">'+a+'</option>' })
$(".account").html(opts);
$(".wallet_addresses").html(web3.eth.accounts.map(function (a) { return '<li>'+a+'</li>' }));

// This runs the 'add_IOU' function when you click the button
// It passes the values from the two inputs above
$("#appointment").click(function() {
	appointmentAction(
		$("#bank_ids :selected").val(), $("#branches :selected").val(), $("#times :selected").val()
	);
	$("#appointment_text").html(getAppointmentText());
	$("#waiting_time").html(getWaitingTime(
		$("#bank_ids :selected").val(), $("#branches :selected").val(), $("#times :selected").val())
	);
});

$("#find_banks").click(function() {
	displayInfo(document.getElementById('postal_code').value);
});

// This is a log function, provided if you want to display things to the page instead of the JavaScript console
// Pass in a discription of what you're printing, and then the object to print
function log(description, obj) {
	$("#log").html($("#log").html() + description + ": " + JSON.stringify(obj, null, 2) + "\n\n");
}


