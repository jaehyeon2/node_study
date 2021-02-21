process.on("uncaughtException", (err)=>{
	console.error("unexpectedError!", err);
});

setInterval(()=>{
	throw new Error("server break!");
}, 1000);

setTimeout(()=>{
	console.log("run");
}, 2000);