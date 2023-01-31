import { difficulty } from "./modules.js";

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
            a.target="_blank" 
            a.rel="noopener noreferrer"

            let h5 = document.createElement("h5");
            h5.classList.add("font-weight-bold");
            let diffiStatus = allStatus.filter(e => e.id === allStatus[num].id)[0]
            h5.textContent = "☆" + difficulty(diffiStatus) + "　" + allStatus[num].name;

            a.appendChild(h5);
            disp.innerHTML = "";
            disp = document.getElementById("gacha-display").appendChild(a);
        });
    });
});