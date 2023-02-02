import {levenshteinDistance, difficulty, get} from "./modules.js";

$(function () {
	$.when(
		$.getJSON('./make_json/recipes.json'),
		$.getJSON('./make_json/make_list.json'),
		$.getJSON('./make_json/ingredients.json'),
	).then((recipesJson, make_listJson, ingredientsJson) => {
		let allStatus = recipesJson[0];
		let allOrders = make_listJson[0];
		let allMaterials = ingredientsJson[0];

		let id = get("recipeId", location.href);
		let subId;
		if (id.length > 9) {
			subId = id.slice(-8);
			id = id.slice(0, 8);
		}
		//メインレシピ
		let status = allStatus.filter(e => e.id === id)[0]
		let orders = allOrders.filter(e => e.id === id)
		let materials = allMaterials.filter(e => e.id === id)

		let title = status.name;
		document.getElementById("recipeTitle").innerHTML = title;
		let peopleDisplay = document.getElementById("people");
		peopleDisplay.textContent = status.num_people + "人分";
		let people_zairyou_Display = document.getElementById("people_zairyou");
		people_zairyou_Display.textContent = "(" + status.num_people + "人分)";
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
		let diffiStatus = allStatus.filter(e => e.id === id)[0]
		let rank = difficulty(diffiStatus);
		let starDisplay = document.getElementById("star")
		starDisplay.textContent = "難易度:" + "☆".repeat(rank);
		let URLDisplay = document.getElementById("URL");
		URLDisplay.href = status.url;
		//サブレシピ
		if (subId) {
			let soloURL = document.getElementById("titleURL")
			soloURL.href = "./recipe.html?recipeId=" + id
			let soloURLC = document.getElementById("titleURLC")
			soloURLC.href = "./recipe.html?recipeId=" + subId

			let statusC = allStatus.filter(e => e.id === subId)[0]
			let ordersC = allOrders.filter(e => e.id === subId)
			let materialsC = allMaterials.filter(e => e.id === subId)

			let titleC = statusC.name;
			document.getElementById("recipeTitleC").innerHTML = titleC;
			let peopleDisplay = document.getElementById("peopleC");
			peopleDisplay.textContent = statusC.num_people + "人分";
			let people_zairyouC_Display = document.getElementById("people_zairyouC");
			people_zairyouC_Display.textContent = "(" + statusC.num_people + "人分)";
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

			let diffiStatus = allStatus.filter(e => e.id === subId)[0]
			let rank = difficulty(diffiStatus);
			let starDisplay = document.getElementById("starC")
			starDisplay.textContent = "難易度:" + "☆".repeat(rank);
			let URLDisplay = document.getElementById("URLC");
			URLDisplay.href = statusC.url;
			
			for (let order of ordersC) {
				let row = document.createElement("li");
				row.textContent = order.process;
				document.getElementById("processC").appendChild(row);
				row.classList.add("process_list");
			}
		}
		else{
			let searchComparison = document.getElementById("searchComparison")
			searchComparison.href = "itemsearch.html?recipeId=" + id
		}

		//材料を同時に閉じる
		$("#detailsLeft").click(function(){
			console.log("le")
			let right = document.getElementById("detailsRight");
			right.open = !right.open;
		})
		$("#detailsRight").click(function(){
			console.log("ri")
			let left = document.getElementById("detailsLeft");
			left.open = !left.open;
		})

		//類似
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
			let diffiStatus = allStatus.filter(e => e.id === suggest[i][1])[0]
			div.textContent = "☆" + difficulty(diffiStatus) + "　" + allStatus.filter(e => e.id === suggest[i][1])[0].name;

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

	})


})
