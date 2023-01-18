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
            let calSelect = document.getElementById("cal");
            let cnt = 0;
            let footer = document.getElementById("footer");

            if (footer.style.display == "none") {
                footer.style.display = "block";
            } else {
                document.querySelector("#index").innerHTML = '';
                document.querySelector("#alert").innerHTML = '';
            }
            let request = $("#search").val();
            for (let status of allStatus) {
                if (cnt <= 30949) {
                    //if (request.length > 3) {
                    //} else {
                    if (status.name.includes(request) == true) {
                        let distant = levenshteinDistance(request, status.name);
                        status.distant = distant;
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
                        let distant = levenshteinDistance(request, status.name);
                        if (distant < request.length / 2) {
                            //console.log(distant);
                            status.distant = distant;
                            filterStatus.push(status);
                        }
                        cnt++;
                    }
                }
            }
            console.log(calSelect);
            if (calSelect != null && calSelect.value != "Select") {
                filterStatus = filterCal(filterStatus, calSelect.value);
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

                let nobr = document.createElement("p-asano");

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
                h5.textContent = "☆" + difficulty(Status[i]) + "　" + Status[i].name;

                a.appendChild(h5);
                td.appendChild(i_num);
                td_name.appendChild(a);
                td.appendChild(span_num);
                nobr.appendChild(i_time);
                nobr.appendChild(span_time);
                td.appendChild(nobr);
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

    filterCal = function (Status, value) {
        let cnt = 0;
        list = [];
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

    function difficulty(Status) {
        let rank = 0;
        let difficult = Status.time / Status.num_process * Status.num_item * 2;
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