//사용자 이름을 눌렀을 때 로딩
document.querySelectorAll("#user-list tr").forEach((el)=>{
	el.addEventListener("click", function(){
		const id=el.querySelector("td").textContent;
		getComment(id);
	});
});

//user loading
async function getUser(){
	try{
		const res=await axios.get("/users");
		const users=res.data;
		console.log(users);
		const tbody=document.querySelector("#user-list tbody");
		tbody.innerHTML="";
		users.map(function(user){
			const row=document.createElement("tr");
			row.addEventListener("click", ()=>{
				getComment(user.id);
			});
			//add row cell
			let td = document.createElement('td');
			td.textContent = user.id;
			row.appendChild(td);
			td = document.createElement('td');
			td.textContent = user.name;
			row.appendChild(td);
			td = document.createElement('td');
			td.textContent = user.age;
			row.appendChild(td);
			td = document.createElement('td');
			td.textContent = user.married ? '기혼' : '미혼';
			row.appendChild(td);
			tbody.appendChild(row);
		});
	} catch(error){
		console.error(error);
	}
}
//comment loading
async function getComment(id){
	try{
		const res=await axios.get(`/users/${id}/comments`);
		const comments=res.data;
		const tbody=document.querySelector("#comment-list tbody");
		tbody.innerHTML="";
		comments.map(function(comment){
			//add row cell
			const row = document.createElement('tr');
			let td = document.createElement('td');
			td.textContent = comment.id;
			row.appendChild(td);
			td = document.createElement('td');
			td.textContent = comment.User.name;
			row.appendChild(td);
			td = document.createElement('td');
			td.textContent = comment.comment;
			row.appendChild(td);
			const edit = document.createElement('button');
			edit.textContent = '수정';
			edit.addEventListener("click", async ()=>{
				//click edit
				const newComment=prompt("change comment!");
				if (!newComment){
					return alert("enter comment!");
				}
				try{
					await axios.patch(`/comments/${comment.id}`, {comment:newComment});
					getComment(id);
				} catch (err){
					console.error(err);
				}
			});
			const remove=document.createElement("button");
			remove.textContent="delete";
			remove.addEventListener("click", async ()=>{
				//click delete
				try{
					await axios.delete(`/comments/${comment.id}`);
					getComment(id);
				} catch(err){
					console.error(err);
				}
			});
			//add button
			td = document.createElement('td');
			td.appendChild(edit);
			row.appendChild(td);
			td = document.createElement('td');
			td.appendChild(remove);
			row.appendChild(td);
			tbody.appendChild(row);
		});
	} catch (err){
		console.error(err);
	}
}
//enter user
document.getElementById("user-form").addEventListener("submit", async (e)=>{
	e.prenentDefault();
	const name=e.target.username.value;
	const age=e.target.age.value;
	const married=e.target.married.checked;
	if (!name) {
		return alert('이름을 입력하세요');
	}
	if (!age) {
		return alert('나이를 입력하세요');
	}
	try {
		await axios.post('/users', { name, age, married });
		getUser();
	} catch (err) {
		console.error(err);
	}
	e.target.username.value = '';
	e.target.age.value = '';
	e.target.married.checked = false;
});
//enter comments
document.getElementById('comment-form').addEventListener('submit', async (e) => {
	e.preventDefault();
	const id = e.target.userid.value;
	const comment = e.target.comment.value;
	if (!id) {
		return alert('아이디를 입력하세요');
	}
	if (!comment) {
		return alert('댓글을 입력하세요');
	}
	try {
		await axios.post('/comments', { id, comment });
		getComment(id);
	} catch (err) {
		console.error(err);
	}
	e.target.userid.value = '';
	e.target.comment.value = '';
});