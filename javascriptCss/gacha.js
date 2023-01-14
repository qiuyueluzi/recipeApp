$(function () {
    $.when(
        $.getJSON('./make_json/recipes.json')
    ).then((recipesJson) => {
        let allStatus = recipesJson;

        // ボタン
        const btn = document.getElementById("gacha-button");
        const disp = document.getElementById("gacha-display");

        btn.addEventListener("click", function() {
            //　ランダム乱数
            const num = Math.floor(Math.random() * allStatus.length);
            console.log(num);
            let a = document.createElement("a");
                a.classList.add("widelink", "text-pink");
                a.href = "./recipe.html?recipeId=" + allStatus[num].id;
            
            let h5 = document.createElement("h5");
            h5.classList.add("font-weight-bold");
            h5.textContent = allStatus[num].name;

            a.appendChild(h5);
            disp.innerHTML = "";
            disp = document.getElementById("gacha-display").appendChild(a);
        });
    });
});