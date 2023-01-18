$(function () {
    $.when(
        $.getJSON('./make_json/recipes.json')
    ).then((recipesJson) => {
        let allStatus = recipesJson;

        // ボタン
        const btn = document.getElementById("10gacha-button");
        let disp1 = document.getElementById("10gacha-display");

        //if(disp1!=NULL){
               // document.querySelector("10gacha-display").innerHTML = '';
       // }
       let list = [];
       btn.addEventListener("click", function() {
        if(list.length != 0){
            //list = [];
            disp1.innerHTML = "";
            console.log("bbb");
        }
        if(list.length == 0){
            console.log("aaa");
            for(var i=0; i<10; i++){
                //　ランダム乱数
                const num1 = Math.floor(Math.random() * allStatus.length);
                //console.log(num1);
                let a = document.createElement("a");
                    a.classList.add("widelink", "text-pink", "text-left");
                    a.href = "./recipe.html?recipeId=" + allStatus[num1].id;
                        
                    let h1 = document.createElement("h5");
                    h1.classList.add("font-weight-bold");
                    h1.textContent = "☆" + difficulty(allStatus[num1].id, allStatus) + "　" + allStatus[num1].name;
    
                    a.appendChild(h1);
                    //disp1.innerHTML = "";
                    list[i] = document.getElementById("10gacha-display").appendChild(a);
                }
                //disp1.innerHTML = "";
            }
            disp1 = list;
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