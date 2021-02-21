const fs=require("fs").promises;

fs.readdir("./folder")
.then((dir)=>{
	console.log("check folder content", dir);
	return fs.unlink("./folder/newfile.js");
})
.then(()=>{
	console.log("delete file success");
	return fs.rmdir("./folder");
})
.then(()=>{
	console.log("delete foler success");
})
.catch((err)=>{
	console.error(err);
})