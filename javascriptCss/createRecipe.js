$(function () {
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
		if (id.length > 9) {
			subId = id.slice(-8);
			id = id.slice(0, 8);
		}
		let status = allStatus.filter(e => e.id === id)[0]
		let orders = allOrders.filter(e => e.id === id)
		let materials = allMaterials.filter(e => e.id === id)

		let title = status.name;
		document.getElementById("recipeTitle").innerHTML = title;
		let peopleDisplay = document.getElementById("people");
		peopleDisplay.textContent = status.num_people + "人分";
		let people_zairyou_Display = document.getElementById("people_zairyou");
		people_zairyou_Display.textContent = "(" + status.num_people + "人分)";
		//console.log(status)
		for (let material of materials) {
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

		for (let order of orders) {
			let row = document.createElement("li");
			row.textContent = order.process;
			document.getElementById("process").appendChild(row)
			row.classList.add("process_list");
		}
		let rank = difficulty(id, allStatus);
		let starDisplay = document.getElementById("star")
		starDisplay.textContent = "難易度:" + "☆".repeat(rank);
		let URLDisplay = document.getElementById("URL");
		URLDisplay.href = status.url;
		if (subId) {
			let statusC = allStatus.filter(e => e.id === subId)[0]
			let ordersC = allOrders.filter(e => e.id === subId)
			let materialsC = allMaterials.filter(e => e.id === subId)

			let titleC = statusC.name;
			document.getElementById("recipeTitleC").innerHTML = titleC;
			let peopleDisplay = document.getElementById("peopleC");
			peopleDisplay.textContent = statusC.num_people + "人分";
			let people_zairyouC_Display = document.getElementById("people_zairyouC");
			people_zairyouC_Display.textContent = "(" + statusC.num_people + "人分)";
			//console.log(status)
			for (let material of materialsC) {
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

			let rank = difficulty(subId, allStatus);
			let starDisplay = document.getElementById("starC")
			starDisplay.textContent = "難易度:" + "☆".repeat(rank);
			let URLDisplay = document.getElementById("URLC");
			URLDisplay.href = statusC.url;
			
			//console.log(orders)
			for (let order of ordersC) {
				let row = document.createElement("li");
				row.textContent = order.process;
				document.getElementById("processC").appendChild(row);
				row.classList.add("process_list");
			}
		}

		let suggest = [];
		for (let i = 0; i < allStatus.length; i++) {
			let comparator = allStatus[i].name;
			let distant = levenshteinDistance(title, comparator);
			if (allStatus[i].id != status.id) suggest.push([distant, allStatus[i].id]);
		}
		suggest.sort(function (a, b) {
			return a[0] - b[0];
		})

		for (let i = 0; i < 10; i++) {
			let tr = document.createElement("tr");
			tr.classList.add("border");

			let td_name = document.createElement("td");
			td_name.classList.add("px-3", "pt-1");

			let td = document.createElement("td");
			td.classList.add("px-1", "py-2");

			let a = document.createElement("a");
			a.classList.add("widelink", "text-pink");
			a.href = "./comparison.html?recipeId=" + status.id + suggest[i][1];
			//a.target = "_blank"

			let div = document.createElement("div");
			div.classList.add("font-weight-bold");
			div.textContent = "☆" + difficulty(allStatus.filter(e => e.id === suggest[i][1])[0].id, allStatus) + "　" + allStatus.filter(e => e.id === suggest[i][1])[0].name;

			/*let proposal = document.createElement("a");
			proposal.textContent = "☆" + difficulty(allStatus.filter(e => e.id === suggest[i][1])[0].id,
				allStatus) + "　" + allStatus.filter(e => e.id === suggest[i][1])[0].name;
			proposal.href = "./comparison.html?recipeId=" + status.id + suggest[i][1];*/

			a.appendChild(div);
			td_name.appendChild(a);
			//td_name.appendChild(proposal);
			tr.appendChild(td_name);
			tr.appendChild(td);
			document.getElementById("proposal").append(tr);
		}


		let clickBtn = function () {

			let text1 = form1.text1.value;
			let text2 = form1.text2.value;
			let dist = levenshteinDistance(text1, text2);
			let result = document.getElementById('result');
			let newRow = result.insertRow();
			let rowData = [dist, text1, text2];
			//tableに結果書き出し
			for (let i = 0; i < rowData.length; i++) {
				let newCell = newRow.insertCell(),
					newText = document.createTextNode(rowData[i]);
				newCell.appendChild(newText);
			}
			return false;
		}



	})


	function get(varName) {
		var varLimit = 2;
		var i;
		var urlAry;
		var varAry;
		var workAry;

		urlAry = location.href.split('?', 2);
		if (urlAry[1]) varAry = urlAry[1].split('&', varLimit);

		if (varAry) {
			for (i = 0; i < varAry.length; i++) {
				workAry = varAry[i].split('=', 2)
				if (workAry[0] == varName) return workAry[1];
			}
		}

		return null;
	}
	//文字列の類似度チェック
	levenshteinDistance = function (str1, str2) {
		let r, c, cost,
			d = [];

		for (r = 0; r <= str1.length; r++) {
			d[r] = [r];
		}
		for (c = 0; c <= str2.length; c++) {
			d[0][c] = c;
		}
		for (r = 1; r <= str1.length; r++) {
			for (c = 1; c <= str2.length; c++) {
				cost = str1.charCodeAt(r - 1) == str2.charCodeAt(c - 1) ? 0 : 1;
				d[r][c] = Math.min(d[r - 1][c] + 1, d[r][c - 1] + 1, d[r - 1][c - 1] + cost);
			}
		}
		return d[str1.length][str2.length];
	}


	function difficulty(recipeID, allStatus) {
		let rank = 0;
		let status = allStatus.filter(e => e.id === recipeID)[0]
		let difficult = status.time / status.num_process * status.num_item * 2;
		if (difficult < 60) {
			rank = 1;
		}
		if (60 <= difficult && difficult < 110) {
			rank = 2;
		}
		if (110 <= difficult && difficult < 160) {
			rank = 3;
		}
		if (160 <= difficult && difficult < 210) {
			rank = 4;
		}
		if (210 <= difficult) {
			rank = 5;
		}
		return rank;

	}
})
