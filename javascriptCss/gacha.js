$(function () {
    $.when(
        $.getJSON('./make_json/recipes.json')
    ).then((recipesJson) => {
        let allStatus = recipesJson;

        // ボタン
        const btn = document.getElementById("gacha-button");
        const disp = document.getElementById("gacha-display");

        btn.addEventListener("click", function () {
            //　ランダム乱数
            const num = Math.floor(Math.random() * allStatus.length);
            console.log(num);
            let a = document.createElement("a");
            a.classList.add("widelink", "text-pink", "text-left");
            a.href = "./recipe.html?recipeId=" + allStatus[num].id;

            let h5 = document.createElement("h5");
            h5.classList.add("font-weight-bold");
            h5.textContent = "☆" + difficulty(allStatus[num].id, allStatus) + "　" + allStatus[num].name;

            a.appendChild(h5);
            disp.innerHTML = "";
            disp = document.getElementById("gacha-display").appendChild(a);
        });
    });
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
});