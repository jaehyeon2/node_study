const fs=require("fs").promises;

setInterval(()=>{
	fs.unlink("./abcdfsddf.js")
}, 1000);
//promises에서는 에러를 알아서 처리함