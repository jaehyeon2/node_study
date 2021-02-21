const fs=require("fs").promises;
const constants=require("fs").constants;

fs.access("./folder", constants.F_OK|constants.W_OK|constants.R_OK)
	.then(()=>{
	return Promise.reject("already exist folder");
})
	.catch((err)=>{
	if(err.code==="ENOENT"){
		console.log("no exist folder");
		return fs.mkdir("./folder");
	}
	return Promise.reject(err);
})
	.then(()=>{
	console.log("make folder success");
	return fs.open("./folder/file.js", "w");
})
	.then((fd)=>{
	console.log("make empty file success", fd);
	fs.rename("./folder/file.js", "./folder/newfile.js");
})
	.then(()=>{
	console.log("change name success");
})
	.catch((err)=>{
	console.error(err);
});