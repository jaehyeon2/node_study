const fs=require("fs");

console.log("start");

let data = fs.readFileSync("./readme2.txt");
console.log("1", data.toString());
data;// = fs.readFileSync("./readme2.txt");
console.log("2", data.toString());
data;
console.log("3", data.toString());

console.log("end");