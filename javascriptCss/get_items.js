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
                parent.classList.add("h4", "mt-2");
                parent.style = "width: 100%;"
                let child = document.createElement("div");
                child.textContent = detail.text;

                parent.appendChild(child);
                document.getElementById("details").appendChild(parent);
            } else {
                let row = document.createElement("div");
                let input = document.createElement("input");
                row.classList.add("form-check", "p-0", "border-bottom", "border-danger");

                //inputタグを編集
                input.classList.add("form-check-input", "check");
                input.type = "checkbox";
                input.name = "items";
                input.value = detail.for;
                input.id = detail.for;
                input.aue = detail.for;
                //input.setAttribute('onclick', "onCheckFunc(" + detail.for + ")");

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
        $("input").click(function () {
            if (this.checked == true) {
                this.parentNode.style.backgroundColor = '#B22222';
                this.parentNode.style.color = '#fff';
            } else {
                this.parentNode.style.backgroundColor = '#fff';
                this.parentNode.style.color = '#000';
            }
        })

        $("#checkVal").click(function () {
            let disp = document.getElementById("index");
            let calSelect = document.getElementById("cal");
            let levelSelect = document.getElementById("level");
            let cnt = 0;
            let resultID = [];
            let checks = document.getElementsByClassName('check');
            let footer = document.getElementById("footer");
            if (footer.style.display == "none") {
                footer.style.display = "block";
            } else {
                document.querySelector("#index").innerHTML = '';
                document.querySelector("#alert").innerHTML = '';
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
            console.log(levelSelect.value);
            let filterStatus = []
            let filtered = [];
            if (calSelect.value != "Select") {
                filtered = filterCal(allrecipes[0], calSelect.value);
                //console.log(filtered);
            } else {
                filtered = allrecipes[0];
                //console.log(filtered);
            }

            if (levelSelect.value != "Select") {
                filtered = filterlevel(filtered, levelSelect.value);
                //console.log(filtered);
            }

            for (let recipe of filtered) {
                if (list.includes(recipe.id) == true) {
                    //console.log(recipe)
                    filterStatus.push(recipe);
                }
            }
            if (filterStatus != 0) {
                disp = index(filterStatus);
            } else {
                let div = document.createElement("div");
                div.classList.add("alert", "alert-warning");
                div.role = "alert";
                div.textContent = "項目がヒットしませんでした";

                alert = document.getElementById("alert").appendChild(div);
            }
        });
        function index(Status) {
            let list = [];
            for (let i = 0; i < Object.keys(Status).length; i++) {
                let tr = document.createElement("tr");
                tr.classList.add("border");

                let nobr = document.createElement("p-asano");

                let td_name = document.createElement("td");
                td_name.classList.add("px-3", "pt-1");

                let td = document.createElement("td");
                td.classList.add("px-1", "py-2");

                let a = document.createElement("a");
                a.classList.add("widelink", "text-pink");
                let comparison = get("recipeId")
                if (comparison) a.href = "./comparison.html?recipeId=" + Status[i].id + comparison;
                else a.href = "./recipe.html?recipeId=" + Status[i].id;

                let i_num = document.createElement("i");
                i_num.classList.add("fas", "fa-user-friends", "mr-2", "text-primary");

                let span_num = document.createElement("span");
                span_num.classList.add("text-left", "mr-2");
                span_num.textContent = Status[i].num_people;

                let i_time = document.createElement("i");
                i_time.classList.add("far", "fa-clock", "mr-1", "mt-2", "lead");

                let span_time = document.createElement("span");
                span_time.classList.add("text-right", "mr-2");
                span_time.textContent = Status[i].time + " min";

                let h5 = document.createElement("h5");
                h5.classList.add("font-weight-bold");
                h5.textContent = "☆" + difficulty(Status[i]) + "　" + Status[i].name;

                a.appendChild(h5);
                td.appendChild(i_num);
                td_name.appendChild(a);
                td.appendChild(span_num);
                nobr.appendChild(i_time);
                nobr.appendChild(span_time);
                tr.appendChild(td_name);
                td.appendChild(nobr);
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
/*function onCheckFunc(chkID) {
    //console.log(chkID);
    ID = document.getElementById(chkID);
    if (ID.checked == true) {
        ID.parentNode.style.backgroundColor = '#B22222';
        ID.parentNode.style.color = '#fff';
    } else {
        ID.parentNode.style.backgroundColor = '#fff';
        ID.parentNode.style.color = '#000';
    }
}*/

filterCal = function (Status, value) {
    let cnt = 0;
    let list = [];
    for (let element of Status) {
        if (cnt <= 30949) {
            if (value == 1 && element.energy > 0 && element.energy < 200) {
                list.push(element);
            } else if (value == 2 && element.energy >= 200 && element.energy < 400) {
                list.push(element);
            } else if (value == 3 && element.energy >= 400 && element.energy < 600) {
                list.push(element);
            } else if (value == 4 && element.energy >= 600) {
                list.push(element);
            }
        }
        cnt++;
    }
    return list;
}


filterlevel = function (Status, value) {
    let cnt = 0;
    let list = [];
    for (let element of Status) {
        let diff = difficulty(element);
        if (cnt <= 30949) {
            if (value >= diff) {
                list.push(element);
            }
        }
        cnt++;
    }
    return list;
}

function difficulty(status) {
    let rank = 0;
    let difficult = parseInt(status.time) + parseInt(status.num_process*10) + parseInt(status.num_item*10);
    if (difficult < 100) {
        rank = 1;
    }
    if ( 100<= difficult && difficult < 150) {
        rank = 2;
    }
    if (150 <= difficult && difficult < 200) {
        rank = 3;
    }
    if (200 <= difficult && difficult < 250) {
        rank = 4;
    }
    if (250 <= difficult) {
        rank = 5;
    }
    return rank;

}

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