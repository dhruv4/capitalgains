define('transfer', function (require) {
    "use strict";
 	var Config = require('capital_one');

    var Withdrawal = {
		initWithKey: function(apiKey) {
			Config.setApiKey(apiKey);
			return this;
		},
		urlWithEntity: function() {
			return Config.baseUrl+'/transfers/';
		},
		urlWithAccountEntity: function() {
			return Config.baseUrl+'/accounts/'
		},
		apiKey: function() {
			return Config.apiKey;
		},
		/**
		   # @Method: getAllByAccountId
		   # @Brief: Get all transfers for a specific account
		   # @Parameters: AccountID
		   # @Returns an array of JSON Objects containing the transfers for that account.
		**/
		getAllByAccountId: function(accID) {
			var transfers;
			var request = $.ajax({
				url: this.urlWithAccountEntity()+accID+'/transfers',
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'
			});

			request.complete(function(results) {
				transfers = results.responseJSON;
			});
			return transfers;
		},
		/**
		  # @Method: getTransferById
		  # @Brief: Get a single transfer for a given ID
		  # @Parameters: TransferId
		  # @Returns a JSON Object
		**/
		getTransferById: function(id) {
			var transfer;
			var request = $.ajax({
				url: this.urlWithEntity()+id,
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'});

			request.complete(function(results) {
				transfer = results.responseJSON;
			});
			return transfer;
		},
		/**
		  # @Method: createTransfer
		  # @Brief: Creates a new transfer
		  # @Parameters: toAccountId, Transferobject
		  # Transferobject formatted as follows: 
		  # {
  		  #		"medium": "balance",
		  #		"payee_id": "string",
		  #		"amount": 0,
		  #		"transaction_date": "2016-02-07",
		  #		"status": "pending",
		  #		"description": "string"
		  #		}
		  # @Returns http response code
		**/
		createTransfer: function(toAcc, json) {
			var respCode;
			var request = $.ajax({
					url: this.urlWithAccountEntity()+toAcc+'/transfers?key='+this.apiKey(),
					data: json,
					contentType: 'application/json',
					async: false,
					type: 'POST'
				});
			request.complete(function(jqXHR, textStatus) {
				respCode = jqXHR.status;
			});
			return respCode;
		},
		/**
		  # @Method: updateTransfer
		  # @Brief: Updates an existing transfer
		  # @Parameters: TransferId, Transferobject
		  # Transferobject formatted as follows: 
		  # {
		  #	  "medium": "balance",
		  #	  "payee_id": "string",
		  #	  "amount": 0,
		  #	  "description": "string"
		  #	}
		  # @Returns http response code
		**/
		updateTransferById: function(id, json){
			var respCode;
			var request = $.ajax({
				url: this.urlWithEntity()+id+'/?key='+this.apiKey(),
				data: json,
				contentType: 'application/json',
				async: false,
				type: 'PUT'
			});
			request.complete(function(jqXHR, textStatus){
				respCode = jqXHR.status;
			});
			return respCode;
		},
		/**
		   # @Method: deleteTransfer
		   # @Brief: Deletes a specified transfer from a specified account.
		   # @Parameters: TransferID
		   # @Returns http response code.
		   # @Note: This does not actually delete the transfer from the database, it only sets its status to 'cancelled'
		**/
		deleteTransfers: function(id)  {
			var respCode;
			var request = $.ajax({
					url: this.urlWithEntity()+id,
					data: {'key': this.apiKey()},
					async: false,
					type: 'DELETE'
				});
			request.complete(function(jqXHR, textStatus) {
				respCode = jqXHR.status;
			});
			return respCode;
		}
	};
    return Transfer;
});
