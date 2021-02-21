const thimeout=setTimeout(()=>{
	console.log("after 1.5sec");
}, 1500);

const interval=setInterval(()=>{
	console.log("while 1sec");
}, 1000);

const timeout2=setTimeout(()=>{
	console.log("can't run");
}, 3000);

setTimeout(()=>{
	
	clearTimeout(timeout2);
	clearInterval(interval);
}, 2500);

const immediate=setImmediate(()=>{
	console.log("run now");
});

const immediate2=setImmediate(()=>{
	console.log("can't run");
});

clearImmediate(immediate2);