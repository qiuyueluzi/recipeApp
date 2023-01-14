$(function(){
	$.when(
		$.getJSON('./make_json/recipes.json'),
		$.getJSON('./make_json/make_list.json'),
		$.getJSON('./make_json/ingredients.json'),
		).then((recipesJson, make_listJson, ingredientsJson) => {
			let allStatus = recipesJson[0];
			let allOrders = make_listJson[0];
			let allMaterials = ingredientsJson[0];
			
			let id = get("recipeId");
			let subId;
			if(id.length>9){
				subId = id.slice(-8);
				id = id.slice(0, 8);
			}
			let status = allStatus.filter( e => e.id === id)[0]
			let orders = allOrders.filter( e => e.id === id)
			let materials = allMaterials.filter( e => e.id === id)
			
			let title = status.name;
			document.getElementById("recipeTitle").innerHTML = title;
			let peopleDisplay = document.getElementById("people");
			peopleDisplay.textContent =  status.num_people + "人分";
			let people_zairyou_Display = document.getElementById("people_zairyou");
			people_zairyou_Display.textContent =  "("+status.num_people + "人分)";
			//console.log(status)
			for(let material of materials){
				let row = document.createElement("tr");
				let food = document.createElement("td");
				food.textContent = material.ingredient;
				let volume = document.createElement("td");
				volume.textContent = material.quantity;
				row.appendChild(food);
				row.appendChild(volume);
				
				document.getElementById("ingredients").appendChild(row)
			}
			
			let energyDisplay = document.getElementById("energy")
			energyDisplay.textContent = status.energy + "kcal";
			let saltDisplay = document.getElementById("salt");
			saltDisplay.textContent = status.salt + "g";
			
			let timeDisplay = document.getElementById("time");
			timeDisplay.textContent = status.time + "分";
			
			
			
			for(let order of orders){
				let row = document.createElement("li");
				row.textContent = order.process;
				document.getElementById("process").appendChild(row)
				row.classList.add("process_list");
			}

			if(subId){
				let statusC = allStatus.filter( e => e.id === subId)[0]
				let ordersC = allOrders.filter( e => e.id === subId)
				let materialsC = allMaterials.filter( e => e.id === subId)
				
				let titleC = statusC.name;
				document.getElementById("recipeTitleC").innerHTML = titleC;
				let peopleDisplay = document.getElementById("peopleC");
				peopleDisplay.textContent = statusC.num_people + "人分";
				let people_zairyouC_Display = document.getElementById("people_zairyouC");
				people_zairyouC_Display.textContent =  "("+status.num_people + "人分)";
				//console.log(status)
				for(let material of materialsC){
					let row = document.createElement("tr");
					let food = document.createElement("td");
					food.textContent = material.ingredient;
					let volume = document.createElement("td");
					volume.textContent = material.quantity;
					row.appendChild(food);
					row.appendChild(volume);
					
					document.getElementById("ingredientsC").appendChild(row)
				}
				
				let energyDisplay = document.getElementById("energyC")
				energyDisplay.textContent = statusC.energy + "kcal";
				let saltDisplay = document.getElementById("saltC");
				saltDisplay.textContent = statusC.salt + "g";
				let timeDisplay = document.getElementById("timeC");
				timeDisplay.textContent = statusC.time + "分";
				
				//console.log(orders)
				for(let order of ordersC){
					let row = document.createElement("li");
					row.textContent = order.process;
					document.getElementById("processC").appendChild(row);
					row.classList.add("process_list");
				}
			}

			let suggest = [];
			for(let i = 0; i < allStatus.length; i++){
				let comparator = allStatus[i].name;
				let distant = levenshteinDistance(title, comparator);
				if(distant<10&&allStatus[i].id!=status.id)suggest.push([distant, allStatus[i].id]);
			}
			suggest.sort(function(a,b){
				return a[0] - b[0];
			})

			for (let i = 0; i < 10; i++) {
				let proposal = document.createElement("a");
				proposal.textContent = allStatus.filter( e => e.id === suggest[i][1])[0].name;
				proposal.href = "./comparison.html?recipeId=" + status.id + suggest[i][1];
				let list = document.createElement("li");
				list.appendChild(proposal)
				document.getElementById("proposal").append(list);
			}
			

			let clickBtn = function() {
				
				let text1 = form1.text1.value;
				let text2 = form1.text2.value;
				let dist = levenshteinDistance(text1, text2);
				let result = document.getElementById('result');
				let newRow = result.insertRow();
				let rowData = [dist, text1, text2];
				//tableに結果書き出し
				for (let i=0; i<rowData.length; i++) {
					let newCell = newRow.insertCell(),
					newText = document.createTextNode(rowData[i]);
					newCell.appendChild(newText);
				}
				return false;
			}
			difficulty(id, allStatus)
			

		})
		
		


	/*function toArray(fileName){
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
	}*/

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
	//文字列の類似度チェック
	levenshteinDistance = function(str1, str2) {
		let r, c, cost,
		d = [];
		
		for (r=0; r<=str1.length; r++) {
			d[r] = [r];
		}
		for (c=0; c<=str2.length; c++) {
			d[0][c] = c;
		}
		for (r=1; r<=str1.length; r++) {
			for (c=1; c<=str2.length; c++) {
				cost = str1.charCodeAt(r-1) == str2.charCodeAt(c-1) ? 0: 1;
				d[r][c] = Math.min(d[r-1][c]+1, d[r][c-1]+1, d[r-1][c-1]+cost);
			}
		}
		return d[str1.length][str2.length];
	}
	
				
	function difficulty(recipeID, allStatus){
		let status = allStatus.filter( e => e.id === recipeID)[0]
		let difficult = status.num_process / status.time * status.num_item;
		console.log(difficult)
	}
				/*let allStatus = toArray('../data_file/all/recipes.csv');
				let allIngredients = toArray('../data_file/all/ingredients.csv');
				
	let allProcess = toArray('../data_file/all/make_list.csv')

	let id = get("recipeId");
	let status = allStatus.filter( e => e[0] === id)
	let ingredients = allIngredients.filter( e => e[0] === id)
	let processes = allProcess.filter( e => e[0] === id)*/
	
	/*let title = status[0][2]
	document.getElementById("recipeTitle").innerHTML = title;*/

	/*for(let ingredient of ingredients){
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
	}*/
})
