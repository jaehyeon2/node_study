const path=require("path");

const string=__filename;

console.log("path.sep:", path.sep);
console.log("path.delimiter:", path.delimiter);
console.log("-----------------------");
console.log("path.dirname():",path.dirname(string));
console.log("path.extname():",path.extname(string));
console.log("path.basename():",path.basename(string));
console.log("path.basename-extname",path.basename(string, path.extname(string)));
console.log("-----------------------");
console.log("path.parse()",path.parse(string));
console.log("path.format()",path.format({
	dir:"C://users//jaehyeon2",
	name:"path",
	ext:"js",
}));
console.log("path.normalize():",path.normalize("C:///users/\\\/path.js"));
console.log("-----------------------");
console.log("path.isAbsolute(C://):",path.isAbsolute("C://"));
console.log("path.isAbsolute(./home)",path.isAbsolute("./home"));
console.log("-----------------------");
console.log("path.relative():",path.relative("C://users//jaehyeon2//path.js", "C://"));
console.log("path.join():",path.join(__dirname, "..", "..", "/3-4", ".", "/3-4-4"));
console.log("path.resolve():",path.resolve(__dirname, "..", "/3-4", ".", "/3-4-4"));