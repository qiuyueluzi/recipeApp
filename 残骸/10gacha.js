import { difficulty } from "./modules.js";

$(function () {
    $.when(
        $.getJSON('./make_json/recipes.json')
    ).then((recipesJson) => {
        let allStatus = recipesJson;

        // ボタン
        const btn10 = document.getElementById("10gacha-button");
        let disp10 = document.getElementById("10gacha-display");

       let list = [];
       btn10.addEventListener("click", function() {
        if(list.length != 0){
            disp10.innerHTML = "";
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
                a.target="_blank" 
                a.rel="noopener noreferrer"
                
                let h1 = document.createElement("h5");
                h1.classList.add("font-weight-bold");
                let diffiStatus = allStatus.filter(e => e.id === allStatus[num1].id)[0]
                h1.textContent = "☆" + difficulty(diffiStatus) + "　" + allStatus[num1].name;
                
                a.appendChild(h1);
                list[i] = document.getElementById("10gacha-display").appendChild(a);
            }
        }
        disp10 = list;
    });
});

});