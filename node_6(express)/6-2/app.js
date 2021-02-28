const express=require("express");
const morgan=require("morgan");
const cookieParser=require("cookie-parser");
const session=require("express-session");
const dotenv=require("dotenv");
const path=require("path");

dotenv.config();
const app=express();
app.set("port", process.env.PORT||3000);

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
	resave:false,
	saveUninitialized:false,
	secret:process.env.COOKIE_SECRET,
	cookie:{
		httpOnly:true,
		secure:false,
	},
	name:"session-cookie",
}));

const multer=require("multer");
const fs=require("fs");

try{
	fs.readdirSync("uploads");
}
catch(error){
	console.error("uploads folder is no exists. create uploads folder");
	fs.mkdirSync("uploads");
}
const upload=multer({
	storage:multer.diskStorage({
		destination(req, file, done){
			done(null, "uploads/");
		},
		filename(req, file, done){
			const ext=path.extname(file.originalname);
			done(null, path.basename(file.originalname, ext)+Date.now()+ext);
		},
	}),
	limits:{fileSize:5*1024*1024},
});
app.get("/upload", (req, res)=>{
	res.sendFile(path.join(__dirname, "multipart.html"));
});
app.post("/upload",
	upload.fields([{name:"image1"}, {name:"image2"}]),
	(req, res)=>{
		console.log(req.files, req.body);
		res.send("ok");
	},
);

app.use((req, res, next)=>{
	console.log("run by all request");
	next();
});
app.get("/", (req, res, next)=>{
	console.log("run bt GET / request");
	next();
}, (req, res)=>{
	throw new Error("error go to error exception middleware");
});

app.use((err, req, res, next)=>{
	console.error(err);
	res.status(500).send(err.message);
});

app.listen(app.get("port"), ()=>{
	console.log(app.get("port"), "port waiting");
});