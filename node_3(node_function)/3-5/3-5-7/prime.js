const min=2;
const max=1000000;
const primes=[];

function generatePrimes(start, range){
	let isPrime=true;
	const end=start+range;
	for(let i=start; i<end; i++){
		for(let j=min; j<Math.sqrt(end); j++){
			if(i!==j&&i%j===0){
				isPrime=false;
				break;
			}
		}
		console.log(i);
		if(isPrime){
			primes.push(i);
		}
		isPrime=true;
	}
}

console.time("prime");
generatePrimes(min, max);
console.timeEnd("prime");
console.log(primes.length);

//1000000 -> prime: 3:26.202 (m:ss.mmm) 78498