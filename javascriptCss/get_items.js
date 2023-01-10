$(function () {
    $.when(
        $.getJSON('./make_json/recipes.json'),
        $.getJSON('./make_json/item_list.json'),
    ).then((recipesJson, item_listJson) => {
        let allStatus = recipesJson;
        let allItems = item_listJson;

        let cnt = 0;
        let filterStatus = [];
        $("#submit").on("click", function () {
            let request = $("#search").val();
            console.log(request.length)
            for (let i = 0; i < allStatus.length - 1; i++) {
                //console.log(allStatus[i]);
                for (let status of allStatus[i]) {
                    if (cnt <= 30949) {
                        //console.log(status.name);
                        if (request.length > 3) {
                            let distant = levenshteinDistance(request, status.name);
                            if (distant < request.length / 2) {
                                filterStatus.push(status);
                            }
                        } else {
                            if (status.name.includes(request) == true) {
                                filterStatus.push(status);
                            }
                        }
                        cnt++;
                    }
                }
                //}
            }
            //console.log(filterStatus);

            index(filterStatus);
        });

        function index(Status) {
            for (let i = 0; i < Object.keys(Status).length; i++) {
                let tr = document.createElement("tr");
                tr.classList.add("border");

                let td_name = document.createElement("td");
                td_name.classList.add("px-3", "pt-1");

                let td = document.createElement("td");
                td.classList.add("px-1", "py-2");

                let a = document.createElement("a");
                a.classList.add("widelink", "text-pink");
                a.href = "/recipe.html?recipeId=" + filterStatus[i].id;

                let i_num = document.createElement("i");
                i_num.classList.add("fas", "fa-user-friends", "mr-2", "text-primary");

                let span_num = document.createElement("span");
                span_num.classList.add("text-left");
                span_num.textContent = filterStatus[i].num_people;

                let i_time = document.createElement("i");
                i_time.classList.add("fas", "fa-clock", "ml-2", "mr-1", "mt-2", "lead", "text-primary");

                let span_time = document.createElement("span");
                span_time.classList.add("text-right", "mr-2");
                span_time.textContent = filterStatus[i].time + " min";

                let h5 = document.createElement("h5");
                h5.classList.add("font-weight-bold");
                h5.textContent = filterStatus[i].name;

                a.appendChild(h5);
                td.appendChild(i_num);
                td_name.appendChild(a);
                td.appendChild(span_num);
                td.appendChild(i_time);
                td.appendChild(span_time);
                tr.appendChild(td_name);
                tr.appendChild(td);
                document.getElementById("index").appendChild(tr);
            }
        }

        for (let a of allItems) {    //材料一覧をレンダリング
            for (let item of a) {
                let row = document.createElement("div");
                let input = document.createElement("input");
                row.classList.add("form-check", "p-0");

                //inputタグを編集
                input.classList.add("form-check-input", "check");
                input.type = "checkbox";
                input.name = "items";
                input.id = item.field1;
                input.aue = item.field1;
                input.setAttribute('onclick', "onCheckFunc(" + item.field1 + ")");

                //labelタグを編集
                let label = document.createElement("label");
                label.classList.add("form-check-label");
                label.textContent = item.name;
                label.htmlFor = item.field1;

                row.appendChild(input);
                row.appendChild(label);
                document.getElementById("item").appendChild(row);
            }
        }
        function isString(value) {
            if (typeof value === "string" || value instanceof String) {
                return true;
            } else {
                return false;
            }
        }
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
});

function onCheckFunc(chkID) {
    console.log(chkID);
    ID = document.getElementById(chkID);
    if (ID.checked == true) {
        ID.parentNode.style.backgroundColor = '#B22222';
        ID.parentNode.style.color = '#fff';
    } else {
        ID.parentNode.style.backgroundColor = '#fff';
        ID.parentNode.style.color = '#000';
    }
}