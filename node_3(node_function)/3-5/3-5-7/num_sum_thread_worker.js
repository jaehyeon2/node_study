const{Worker, isMainThread, parentPort, workerData}=require("worker_threads");

let sum=0;
let threadsum=0;
function numsum(start, range){
	threadsum=0;
	let end=start+range;
	for(let i=start; i<end; i++){
		threadsum+=i;
	}
}

if(isMainThread){
	const max=1000000000;
	const threadCount=5;
	const threads=new Set();
	const range=Math.ceil(max/threadCount);//thread range 나눔
	let start=1;
	console.time("sum");
	for(let i=0; i<threadCount-1; i++){
		const wStart=start;
		threads.add(new Worker(__filename,{workerData:{start:wStart, range}}));
		start+=range;
	}
	threads.add(new Worker(__filename, {workerData:{start, range:range+max%threadCount}}));
	for(let worker of threads){
		worker.on("error", (err)=>{
			throw err;
		});
		worker.on("exit", ()=>{
			threads.delete(worker);
			if(threads.size===0){
				console.timeEnd("sum");
				console.log(sum);
			}
		});
		worker.on("message", (threadsum)=>{
			sum+=threadsum;
		});
	}
}
else{
	numsum(workerData.start, workerData.range);
	parentPort.postMessage(threadsum);
	threadsum=0;
}