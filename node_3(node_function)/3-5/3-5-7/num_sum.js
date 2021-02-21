let sum=0;
let start=1;
const max=1000000000;
function numsum(start, range){
	let end=start+range;
	for(let i=start; i<end; i++){
		sum+=i;
	}
}
console.time("sum");
numsum(start, max);
console.timeEnd("sum");
console.log(sum);