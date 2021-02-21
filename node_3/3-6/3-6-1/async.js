const fs=require("fs");

console.log("start");
fs.readFile("./readme2.txt", (err, data)=>{
	if(err){
		throw err;
	}
	console.log("1", data.toString());
});
fs.readFile("./readme2.txt", (err, data)=>{
	if(err){
		throw err;
	}
	console.log("2", data.toString());
});
fs.readFile("./readme2.txt", (err, data)=>{
	if(err){
		throw err;
	}
	console.log("3", data.toString());
});

console.log("end");