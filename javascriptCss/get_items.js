$(function () {
    $.when(
        $.getJSON('./make_json/recipes.json'),
        $.getJSON('./make_json/ingredients.json'),
        $.getJSON('./make_json/item_list.json'),
        $.getJSON('./make_json/detail.json')
    ).then((recipesJson, ingredientsJson, item_listJson, detailJson) => {
        let allrecipes = recipesJson;
        let allIngredients = ingredientsJson;
        let allItems = item_listJson;
        let allDetails = detailJson;

        ID = 1;
        for (let detail of allDetails[0]) {    //材料一覧をレンダリング
            //for (let detail of val) {
            detail.for = ID;
            ID++;
            //}
        }

        //console.log(allDetails);
        for (let detail of allDetails[0]) {    //材料一覧をレンダリング
            if (detail.children) {
                let parent = document.createElement("div");
                parent.classList.add("h4");
                parent.style = "width: 100%;"
                let child = document.createElement("div");
                child.textContent = detail.text;

                parent.appendChild(child);
                document.getElementById("details").appendChild(parent);
            } else {
                let row = document.createElement("div");
                let input = document.createElement("input");
                row.classList.add("form-check", "p-0");

                //inputタグを編集
                input.classList.add("form-check-input", "check");
                input.type = "checkbox";
                input.name = "items";
                input.value = detail.for;
                input.id = detail.for;
                input.aue = detail.for;
                input.setAttribute('onclick', "onCheckFunc(" + detail.for + ")");

                //labelタグを編集
                let label = document.createElement("label");
                label.classList.add("form-check-label");
                label.textContent = detail.text;
                label.htmlFor = detail.for;

                row.appendChild(input);
                row.appendChild(label);
                document.getElementById("details").appendChild(row);

            }
        }

        $("#checkVal").click(function () {
            let disp = document.getElementById("index");
            let cnt = 0;
            let resultID = [];
            let checks = document.getElementsByClassName('check');
            let footer = document.getElementById("footer");
            if (footer.style.display == "none") {
                footer.style.display = "block";
            } else {
                document.querySelector("#index").innerHTML = '';
            }
            for (i = 0; i < checks.length; i++) {
                if (checks[i].checked === true) {
                    let listID = [];
                    for (let detail of allDetails[0]) {
                        if (detail.for == checks[i].value) {
                            for (let item of allItems[0]) {
                                if (detail.text.length < 4) {
                                    if (item.name.includes(detail.text) == true) {
                                        for (let ingredients of allIngredients[0]) {
                                            if (ingredients.ingredient.includes(item.name) == true) {
                                                //console.log(ingredients.ingredient);
                                                listID.push(ingredients.id);
                                            }
                                        }
                                    }
                                } else {
                                    if (levenshteinDistance(item.name, detail.text) < detail.text.length / 2) {
                                        for (let ingredients of allIngredients[0]) {
                                            if (ingredients.ingredient.includes(item.name) == true) {
                                                //console.log(ingredients.ingredient);
                                                listID.push(ingredients.id);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    resultID[cnt++] = listID
                }
            }
            let getArraysIntersect = (array01, array02) => {
                return [...new Set(array01)].filter(value => array02.includes(value));
            }
            let list = resultID[0];
            for (i = 1; i < resultID.length; i++) {
                list = getArraysIntersect(list, resultID[i])
            }
            //console.log(list);
            let filterStatus = []
            for (let recipe of allrecipes[0]) {
                if (list.includes(recipe.id) == true) {
                    //console.log(recipe)
                    filterStatus.push(recipe);
                }
            }
            disp = index(filterStatus);
        });
        function index(Status) {
            let list = [];
            for (let i = 0; i < Object.keys(Status).length; i++) {
                let tr = document.createElement("tr");
                tr.classList.add("border");

                let td_name = document.createElement("td");
                td_name.classList.add("px-3", "pt-1");

                let td = document.createElement("td");
                td.classList.add("px-1", "py-2");

                let a = document.createElement("a");
                a.classList.add("widelink", "text-pink");
                a.href = "./recipe.html?recipeId=" + Status[i].id;

                let i_num = document.createElement("i");
                i_num.classList.add("fas", "fa-user-friends", "mr-2", "text-primary");

                let span_num = document.createElement("span");
                span_num.classList.add("text-left");
                span_num.textContent = Status[i].num_people;

                let i_time = document.createElement("i");
                i_time.classList.add("far", "fa-clock", "ml-2", "mr-1", "mt-2", "lead");

                let span_time = document.createElement("span");
                span_time.classList.add("text-right", "mr-2");
                span_time.textContent = Status[i].time + " min";

                let h5 = document.createElement("h5");
                h5.classList.add("font-weight-bold");
                h5.textContent = Status[i].name;

                a.appendChild(h5);
                td.appendChild(i_num);
                td_name.appendChild(a);
                td.appendChild(span_num);
                td.appendChild(i_time);
                td.appendChild(span_time);
                tr.appendChild(td_name);
                tr.appendChild(td);
                list[i] = document.getElementById("index").appendChild(tr);
            }
            return list;
        }
    });

});
//文字列の類似度チェック
levenshteinDistance = function (str1, str2) {
    let r, c, cost,
        d = [];

    for (r = 0; r <= str1.length; r++) {
        d[r] = [r];
    }
    //console.log(str2);
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
function onCheckFunc(chkID) {
    //console.log(chkID);
    ID = document.getElementById(chkID);
    if (ID.checked == true) {
        ID.parentNode.style.backgroundColor = '#B22222';
        ID.parentNode.style.color = '#fff';
    } else {
        ID.parentNode.style.backgroundColor = '#fff';
        ID.parentNode.style.color = '#000';
    }
}