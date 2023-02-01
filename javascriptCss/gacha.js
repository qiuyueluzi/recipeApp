import { difficulty } from "./modules.js";

$(function () {
    $.when(
        $.getJSON('./make_json/recipes.json')
    ).then((recipesJson) => {
        let allStatus = recipesJson;

        // ボタン
        let btn = document.getElementById("gacha-button");
        let disp = document.getElementById("gacha-display");
        let btn10 = document.getElementById("10gacha-button");
        let disp10 = document.getElementById("10gacha-display");
        
        btn.addEventListener("click", function () {
            let a = gacha();
            disp.innerHTML = "";
            disp.appendChild(a);
        });

        btn10.addEventListener("click", function() {
            disp10.innerHTML = "";
            for(var i=0; i<10; i++){    
                let a = gacha();
                disp10.appendChild(a);
            }
        });

        function gacha(){
            //　ランダム乱数
            const num = Math.floor(Math.random() * allStatus.length);
            let a = document.createElement("a");
            a.classList.add("widelink", "text-pink", "text-left");
            a.href = "./recipe.html?recipeId=" + allStatus[num].id;
            a.target="_blank" 
            a.rel="noopener noreferrer"
            
            let h5 = document.createElement("h5");
            h5.classList.add("font-weight-bold");
            let diffiStatus = allStatus.filter(e => e.id === allStatus[num].id)[0]
            h5.textContent = "☆" + difficulty(diffiStatus) + "　" + allStatus[num].name;
            
            a.appendChild(h5);
            return a;
        }
    });
});