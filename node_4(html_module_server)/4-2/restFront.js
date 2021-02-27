async function getUser(){
	try{
		const res=await axios.get("/users");
		const users=res.data;
		const list=document.getElementById("list");
		list.innerHTML="";
		
		Object.keys(users).map(function(key){ //Object.keys(obj) – 객체의 키만 담은 배열을 반환합니다.
			const userDiv=document.createElement("div");
			const span=document.createElement("span");
			span.textContent=users[key];
			const edit=document.createElement("button");
			edit.textContent="edit";
			edit.addEventListener("click", async()=>{
				const name=prompt("바굴 이름을 입력하세요");
				if(!name){
					return alert("이름을 입력하세요!");
				}
				try{
					await axios.put("/user/"+key, {name});
					getUser();
				}
				catch(err){
					console.error(err);
				}
			});
			const remove=document.createElement("button");
			remove.textContent="remove";
			remove.addEventListener("click", async()=>{
				try{
					await axios.delete("/user/"+key);
					getUser();
				}
				catch(err){
					console.error(err);
				}
			});
			userDiv.appendChild(span);
			userDiv.appendChild(edit);
			userDiv.appendChild(remove);
			list.appendChild(userDiv);
			console.log(res.data);
		});
	}
	catch(err){
		console.error(err);
	}
}
window.onload=getUser;

document.getElementById("form").addEventListener("submit", async(e)=>{
	e.preventDefault();
	const name=e.target.username.value;
	if(!name){
		return alert("이름을 입력하세요!");
	}
	try{
		await axios.post("/user", {name});
		getUser();
	}
	catch(err){
		console.error(err);
	}
	e.target.username.value="";
});