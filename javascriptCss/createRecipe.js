$(function(){


	function toArray(fileName){
		let srt = new XMLHttpRequest();
	
		srt.open("GET", fileName, false);
		
		try {
			srt.send(null);
		} catch (err) {
			console.log(err)
		}
		
		// 配列を用意
		let csletr = [];
		// 改行ごとに配列化
		let lines = srt.responseText.split(/\r\n|\n/);
		
		// 1行ごとに処理
		for (let i = 0; i < lines.length; ++i) {
			let cells = lines[i].split(",");
			if (cells.length != 1) {
				csletr.push(cells);
			}
		}
		return csletr
	}

	function get(varName){
		var varLimit=2;
		var i;
		var urlAry;
		var varAry;
		var workAry;
		
		urlAry=location.href.split('?',2);
		if(urlAry[1])varAry=urlAry[1].split('&',varLimit);
		
		if(varAry){
			for(i=0;i<varAry.length;i++){
				workAry=varAry[i].split('=',2)
				if(workAry[0]==varName)return workAry[1];
			}
		}
		
		return null;
	}
	
		

	let allStatus = toArray('../data_file/all/recipes.csv');
	let allIngredients = toArray('../data_file/all/ingredients.csv');
	let allProcess = toArray('../data_file/all/make_list.csv')

	let id = get("recipeId");
	let status = allStatus.filter( e => e[0] === id)
	let ingredients = allIngredients.filter( e => e[0] === id)
	let processes = allProcess.filter( e => e[0] === id)



	console.log(status)
	console.log(ingredients)
	let title = status[0][2]
	document.getElementById("recipeTitle").innerHTML = title;

	for(let ingredient of ingredients){
		let row = document.createElement("tr");
		let food = document.createElement("td");
		food.textContent = ingredient[1];
		let volume = document.createElement("td");
		volume.textContent = ingredient[2];
		row.appendChild(food);
		row.appendChild(volume);

		document.getElementById("ingredients").appendChild(row)
	}

	let energy = document.getElementById("energy")
	energy.textContent = status[0][3] + "kcal";
	let salt = document.getElementById("salt");
	salt.textContent = status[0][4] + "g";
	let people = document.getElementById("people");
	people.textContent = status[0][5] + "人";
	let time = document.getElementById("time");
	time.textContent = status[0][6] + "分";

	for(let process of processes){
		let row = document.createElement("li");
		row.textContent = process[2];
		document.getElementById("process").appendChild(row)
	}
})