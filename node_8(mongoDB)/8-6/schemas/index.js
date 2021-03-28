const mongoose=require("mongoose");

const connect=()=>{
	if(process.env.NODE_ENV!=="production"){
		mongoose.set("debug", true);
	}
	mongoose.connect("mongodb://jaehyeon2:rkd-wogus013@127.0.0.1:27017/admin",{
		dbName:"nodejs",
		useNewUrlParser:true,
		useCreateIndex:true,
	},(error)=>{
		if(error){
			console.log("mongodb connect error!", error);
		}
		else{
			console.log("mongodb connect!");
		}
	});
};
mongoose.connection.on("error", (error)=>{
	console.error("mongodb connect error!", error);
});
mongoose.connection.on("disconnected", ()=>{
	console.error("mongodb disconnected! try connect");
	connect();
});

module.exports=connect;