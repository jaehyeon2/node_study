const fs=require("fs").promises;

console.log("start");
fs.readFile("./readme2.txt")
	.then((data)=>{
	console.log("1", data.toString());
	return fs.readFile("./readme2.txt");
})
	.then((data)=>{
	console.log("2", data.toString());
	return fs.readFile("./readme2.txt");
})
	.then((data)=>{
	console.log("3", data.toString());
	console.log("end");
})
	.catch((err)=>{
	console.error(err);
})
