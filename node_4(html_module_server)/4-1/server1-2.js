const http=require("http");

http.createServer((req, res)=>{
	res.writeHead(200, {"Content-Type":"text/html; sharser=utf-8"});
	res.write("<h1>Hello Node!</h1>");
	res.end("<p>Hello Server 8080!</p>");
})
	.listen(8080, ()=>{//connect server
	console.log("8080번 포트에서 서버 대기 중입니다.");
});

http.createServer((req, res)=>{
	res.writeHead(200, {"Content-Type":"text/html; sharser=utf-8"});
	res.write("<h1>Hello Node!</h1>");
	res.end("<p>Hello Server 3000!</p>");
})
	.listen(3000, ()=>{//connect server
	console.log("3000번 포트에서 서버 대기 중입니다.");
});