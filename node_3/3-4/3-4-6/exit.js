let i=1;
setInterval(()=>{
	if(i===5){
		console.log("stop!");
		process.exit();
	}
	console.log(i);
	i+=1;
}, 1000);