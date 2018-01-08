$(document).ready(function(){
	if (typeof web3 !== 'undefined') {
	    web3 = new Web3(web3.currentProvider);
	} else {
	    // set the provider you want from Web3.providers
	    web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/RkeQNk1tmz2SlNBIFu2X"));
	}
	
	console.log('web3.eth.defaultAccount',web3.eth.defaultAccount)
	var setNameContract = web3.eth.contract([
	{
		"constant": true,
		"inputs": [],
		"name": "getName",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "",
				"type": "string"
			}
		],
		"name": "modifico",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "setName",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]);
	var setNameC = setNameContract.at('0x958f9bee79a57bf999650c787534ccd5ddec9985');
	var modifico = setNameC.modifico();
	console.log('setNameC:',setNameC)
	modifico.watch(function(err,result){
		$("#loader").hide();

		if (err) {
			$("#result").html("Resultado: "+err);
		}else{
			console.log('result.args',result.args)
			$("#result").html("Resultado: "+result.args.name);
			$("#get_name_btn").click();
		}
	});
	$("#save_name_btn").click(function(){
	$("#loader").show();

		setNameC.setName($("#name").val(),function(err,result){
			if (err) {
				$("#result").html("Resultado: "+err);
			}else{
				$("#result").html("Resultado: "+result);
			}
		})
	});
	$("#get_name_btn").click(function(){
		console.log("Get Name")
		$("#loader").show();
		setNameC.getName(function(err,result){
			$("#loader").hide();

			if (err) {
				$("#result").html("Resultado: "+err);
			}else{
				console.log('result:',result)
				$("#result").html("Resultado Actual: "+result);
			}
		})
	})
})