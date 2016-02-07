var apikey = '3c379a7a6e86a6db32b2b563e9cff339';

require(['account', 'atm', 'branch', 'customer', 'deposit', 'withdrawal', 'bills', 'merchant', 'purchase', 'transfer']);

var custID = '55e94a6af8d8770528e60e64';
var accID = '560072e0ce1cef140015e483';
var customerAccount = customer.initWithKey(apikey);
console.log("[Customer - Get All Customers] : Sample Customer: " + customerAccount.getCustomers()[0].balance);
$("#moneyOwed").text(customerAccount.getCustomers()[0].balance);

function makePayment (amount){

	var transferAccount = transfer.initWithKey(apikey);

	var accID = '56241a13de4bf40b171128b6';
	var payeeID = '56241a13de4bf40b171128b7';

	var sampleTransfer = "{\"medium\": \"balance\",\"amount\": 1000,\"description\": \"test\", \"payee_id\": \"" + payeeID + "\" }";	

	var transObj = transferAccount.createTransfer(accID, sampleTransfer);

	console.log(transObj);

	$('#paidText').text('Transaction sent!')

}

function getBalance () {
	var custID = '55e94a6af8d8770528e60e64';
	var accID = '560072e0ce1cef140015e483';
	var customerAccount = customer.initWithKey(apikey);
	console.log("[Customer - Get All Customers] : Sample Customer: " + customerAccount.getCustomers()[0].balance);
	$("#")

}

function transferDemo (apikey, transfer) {
			console.log('transfer Demo');
			var transferAccount = transfer.initWithKey(apikey);
			var accID = '56241a13de4bf40b171128b6';
			var payeeID = '56241a13de4bf40b171128b7';
			var transferID = '56b7152887dcc0100021c042';
			var sampleTransfer = "{\"medium\": \"balance\",\"amount\": 1000,\"description\": \"test\", \"payee_id\": \"" + payeeID + "\" }";
			var sampleTransferUpdate = '{ "medium": "balance", "amount": 52000, "description": "update" }';
			
			console.log("[transfer - make a transfer from an account] Response: "+ transferAccount.createTransfer(accID, sampleTransfer));
			console.log(transferAccount.createTransfer(accID, sampleTransfer));
			console.log(transferAccount.getAllByAccountId(accID));
			/*
			console.log("[transfer - get transfers by account] Response: "+ transferAccount.getAllByAccountId(accID));
			console.log("[transfer - get transfers by id] Response: " + transferAccount.getTransferById(transferID));
			
			var lastAcct = transferAccount.getAllByAccountId(accID).pop();
			console.log("[transfer - update transfer] Response: " + transferAccount.updateTransferById('56b7152887dcc0100021c042', sampleTransferUpdate));
			//console.log("[withdrawal - delete withdrawal] Response: " + withdrawalAccount.deleteWithdrawals('56019011ce1cef140015e4a1'));
			*/
		}

function customerDemo (apikey, customer) {
			var customerAccount = customer.initWithKey(apikey);
			var custID = '55e94a6af8d8770528e60e64';
			var accID = '560072e0ce1cef140015e483';
			console.log("[Customer - Get All Customers] : Sample Customer: " + customerAccount.getCustomers()[0].first_name);
			console.log("[Customer - Get Customer By Customer ID] : Sample Customer: " + customerAccount.getCustomerById(custID).first_name);
			console.log("[Customer - Get Customer By Account ID] : Sample Customer: " + customerAccount.getCustomerByAcountId(accID));
			var customerInfo = "{\"address\": {\"street_number\": \"8020\",\"street_name\": \"Greenroad Dr\",\"city\": \"McLean\",\"state\": \"VA\",\"zip\": \"22102\"}}";
			console.log("[Customer - Update Customer] :" + customerAccount.updateCustomer(custID, customerInfo));
		}