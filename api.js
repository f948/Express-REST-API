var app = require('express')();
var http = require('http').Server(app);

var data =[];
var i;
var dataFound=false;


// get all data 
app.get('/get', function (req, res) {
	
	if (data.length == 0){
		res.send("There is no data");
		
	}
	
	else{
		res.send(data);
	}
	
});

// get a specific account data 
app.get('/get/:account', function (req, res) {
	
	
	for(i=0;i<=data.length-1;i++){
		if(data[i].account == req.params.account){
			res.send(data[i]);
			dataFound=true;
			break;
		}
	}
	
	
	if(!dataFound){
		res.send("Data not found");
	}
	
	dataFound=false;
});

// add another entry into the api 
app.get('/:account/:username/:password', function (req, res) {
	
	for (i=0;i<=data.length-1;i++){
		if(data[i].account == req.params.account && data[i].username == req.params.username  && data[i].password == req.params.password){
			dataFound=true;
		}
	}
	
	if(!dataFound){
		data.push({account:req.params.account,username:req.params.username,password:req.params.password});
		res.send(data);
	}
	
	else{
		res.send("Cannot duplicate entries");
	}
	
	dataFound=false;
});

// modify an entry in the api
app.get('/:oldaccount/:oldusername/:oldpassword/:newaccount/:newusername/:newpassword', function (req, res) {
	
	for(i=0;i<=data.length-1;i++){
		
		if(data[i].account == req.params.oldaccount && data[i].username == req.params.oldusername  && data[i].password == req.params.oldpassword){
			data[i].account=req.params.newaccount;
			data[i].username=req.params.newusername;
			data[i].password=req.params.newpassword;
		}
	}
	
	res.send(data);
	
	
});

// delete all entries in the api
app.get('/delete', function (req, res) {
	
	data=[];
	res.send(data);
	
	
});

// delete an entry in the api
app.get('/delete/:account/:username/:password', function (req, res) {
	
	for(i=0;i<=data.length-1;i++){
		if(data[i].account == req.params.account && data[i].username == req.params.username  && data[i].password == req.params.password){
			data[i]="";

		}
	}
	
	res.send(data);
	

	
	
});

http.listen(60276, function() {
   console.log('listening on localhost:60276');
});