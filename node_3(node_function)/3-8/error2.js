const fs=require("fs");
setInterval(()=>{
	fs.unlink("./abcdefg.js", (err)=>{//실제 존재하지 않는 파일 삭제 시 에러
		if(err){
			console.error(err);
		}
	});
}, 1000);