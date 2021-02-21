const{
	Worker, isMainThread, parentPort,
}=require("worker_threads");

if(isMainThread){//parent case
	const worker=new Worker(__filename);
	console.log("worker");
	worker.on("message", message=>console.log("from worker", message));
	worker.on("exit", ()=>console.log("worker exit"));
	worker.postMessage("ping");
}
else{//worker case
	parentPort.on("message", (value)=>{
		console.log("from parent", value);
		parentPort.postMessage("pong");
		parentPort.close();
	});
}