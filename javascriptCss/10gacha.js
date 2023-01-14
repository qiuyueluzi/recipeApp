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
                    a.classList.add("widelink", "text-pink");
                    a.href = "./recipe.html?recipeId=" + allStatus[num1].id;
                        
                    let h1 = document.createElement("h5");
                    h1.classList.add("font-weight-bold");
                    h1.textContent = allStatus[num1].name;
    
                    a.appendChild(h1);
                    //disp1.innerHTML = "";
                    list[i] = document.getElementById("10gacha-display").appendChild(a);
                }
                //disp1.innerHTML = "";
            }
            disp1 = list;
        });
    });
});