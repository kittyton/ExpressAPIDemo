var express=require('express');
var app=express();
var fs=require("fs");
var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:false})
var id=4;

app.get('/addAttraction.html',function(req,res){
	res.sendFile( __dirname+"/"+"addAttraction.html");
})

//@URL:http://127.0.0.1:8081/api/attractions
//@Des:Get all attractions information
app.get('/api/attractions',function(req,res){
	fs.readFile(__dirname+"/"+"attractions.json",'utf-8',function(error,data){
		if(error){
			res.statusCode=404;
			res.send('Error occurred: file not found');
			console.log(error);
		}
		else
			res.end(data);
	});
})

//@URL:http://127.0.0.1:8081/api/attraction/id
//@Des:Get a specific  attraction information
app.get('/api/attraction/:id',function(req,res){
	fs.readFile(__dirname+"/"+"attractions.json",'utf-8',function(error,data)
	{
		if(error){
			res.statusCode=404;
			res.send('Error occurred: file not found');
			console.log(error);
		}
		else{
			data=JSON.parse(data);
			var attraction=data["attraction"+req.params.id];
			res.end(JSON.stringify(attraction));
		}
	});
})


//@URL:http://127.0.0.1:8081/addAttraction.html
//@Des:create a new attraction with the input information
app.post('/api/attraction',urlencodedParser,function(req,res){
	response={
			name:req.body.name,
			location:req.body.location,
			description:req.body.description,
			id:id++
		};
		fs.readFile(__dirname+"/"+"attractions.json",'utf-8',function(error,data){
			data=JSON.parse(data);
			data["attraction"+(id-1)]=JSON.stringify(response);
			fs.writeFile(__dirname+"/"+"attractions.json",JSON.stringify(data),'utf-8',function(error,data){
			if(error)
				res.send(500,'Error occurred: file write error!');
			else{
				res.send(201,'Attraction adds successfully!');
			}
		});
})
})

//@URL:http://127.0.0.1:8081/api/delete
//@Des:delete a specific  attraction 
app.get('/api/delete',function(req,res){
	fs.readFile(__dirname+"/"+"attractions.json",'utf-8',function(error,data){
		data=JSON.parse(data);
		delete data["attraction"+4];
		res.end(JSON.stringify(data));
	});
})


var server=app.listen(8081, function(){
	var host=server.address().address;
	var port=server.address().port;

	console.log(" Example ,access address is http://%s:%s",host,port)
})