const string="abc";
const number=1;
const boolean=true;
const obj={
	outside:{
		inside:{
			key:"value",
		},
	},
};
console.time("전체 시간");//time과 timeEnd 사이의 시간을 측정
console.log("슁표로 구분해 여러 값을 찍을 수 있음");
console.log(string, number, boolean);
console.error("에러 메시지는 console.log에 담아줌");//에러 내용을 표시

console.table([{name:"zero", birth:1994}, {name:"hero", birth:2020}]);//테이블 형식으로 표현

console.dir(obj, {colors:false, depth:2});//객체를 콘솔에 표시할 때 사용; depth는 객체 안의 객체를 몇 단계까지 보여줄지를 결정; 기본값:2
console.dir(obj, {colors:true, depth:1});

console.time("시간 측정");
for(let i=0; i<100000; i++){}
console.timeEnd("시간측정");

function b(){
	console.trace("에러 위치 추적");//에러가 어디서 발생했는지 추적할 수 있게 함; 에러 위치가 나오지 않는다면 사용
}
function a(){
	b();
}
a();

console.timeEnd("전체 시간");
