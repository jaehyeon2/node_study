const cluster=require("cluster");
const http=require("http");
const numCPUs=require("os").cpus().length;

if(cluster.isMaster){
	console.log("cpu number:", numCPUs);
	console.log(`master pid:${process.pid}`);
	//worker production
	for(let i=0; i<numCPUs; i+=1){
		cluster.fork();
	}
	//when worker stop
	cluster.on("exit", (worker, code, signal)=>{
		console.log(`${worker.process.pid} worker stop`);
		console.log("code", code, "signal", signal);
		cluster.fork();//워커 프로세스가 종료되었을 때 다른 워커 생성
	});
}
else{
	http.createServer((req, res)=>{
		res.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
		res.write("<h1>Hello Node!</h1>");
		res.end("<p>Hello Cluster!</p>");
		setTimeout(()=>{//워커가 존재하는 지 확인하기 위해 1초마다 강제 종료
			process.exit(1);
		}, 1000);
	})
		.listen(8080);
	
	console.log(`${process.pid} worker start`);
}