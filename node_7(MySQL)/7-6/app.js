const express=require("express");
const path=require("path");
const morgan=require("morgan");
const nunjucks=require("nunjucks");

const { sequelize }=require("./models");
const indexRouter=require("./routes");
const userRouter=require("./routes/users");
const commentsRouter=require("./routes/comments");

const app= express();
app.set("port", process.env.PORT || 3000);
app.set("view engine", "html");
nunjucks.configure("views", {
	express:app,
	watch:true,
});
sequelize.sync({force:false})
	.then(()=>{
		console.log("DB connect!");
	})
	.catch((err)=>{
		console.error(err);
	});

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/comments", commentsRouter);

app.use((req, res, next)=>{
	const error=new Error(`${req.method} ${req.url} router is no exist`);
	error.status=404;
	next(error);
});

app.use((err, req, res, next)=>{
	res.locals.message=err.message;
	res.locals.error=process.env.NODE_ENV!=="production"?err:{};
	res.status(err.status||500);
	res.render("error");
});

app.listen(app.get("port"), ()=>{
	console.log(app.get("port"), "port waiting");
});