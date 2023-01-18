$(function () {
    $.when(
        $.getJSON('./make_json/recipes.json')
    ).then((recipesJson) => {
        let allStatus = recipesJson;

        document.getElementById("footer").style.display = "none";

        $("#submit").click(function () {
            /*console.log(filterStatus.length);
            if (filterStatus.length != 0) {
                //document.querySelector("#index").innerHTML = '';
                filterStatus.length = 0;
            }*/
            let filterStatus = [];
            let disp = document.getElementById("index");
            let alert = document.getElementById("alert");
            let cnt = 0;
            let footer = document.getElementById("footer");
            if (footer.style.display == "none") {
                footer.style.display = "block";
            } else {
                document.querySelector("#index").innerHTML = '';
            }
            let request = $("#search").val();
            for (let status of allStatus) {
                if (cnt <= 30949) {
                    //if (request.length > 3) {
                    let distant = levenshteinDistance(request, status.name);
                    //} else {
                    if (status.name.includes(request) == true) {
                        status.distant = 0;
                        filterStatus.push(status);
                    }
                    //}
                    cnt++;
                }
            }
            cnt = 0;
            if (filterStatus.length == 0) {
                for (let status of allStatus) {
                    if (cnt <= 30949) {
                        if (distant < request.length / 2) {
                            //console.log(distant);
                            status.distant = distant;
                            filterStatus.push(status);
                        }
                        cnt++;
                    }
                }
            }
            if (filterStatus.length != 0) {
                filterStatus.sort((a, b) => a.distant - b.distant);
                disp = index(filterStatus);
            } else {
                let div = document.createElement("div");
                div.classList.add("alert", "alert-warning");
                div.role = "alert";
                div.textContent = "キーワードがヒットしませんでした";

                alert = document.getElementById("alert").appendChild(div);
            }
        });
        $("#search").keypress(function (e) {
            if (e.which == 13) {
                $("#submit").click();
            }
        })

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