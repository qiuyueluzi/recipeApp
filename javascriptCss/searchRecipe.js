$(function () {
    $.when(
        $.getJSON('./make_json/recipes.json')
    ).then((recipesJson) => {
        let allStatus = recipesJson;
        let switchBtn = document.getElementsByTagName('button')[0];
        let footer = document.getElementById('footer');

        let changeElement = (el) => {
            if (el.style.display == '') {
                el.style.display = 'none';
            } else {
                el.style.display = '';
            }
        }
        switchBtn.addEventListener('click', () => {
            changeElement(box);
        }, false)


        let cnt = 0;
        let filterStatus = [];
        $("#submit").click(function () {
            let request = $("#search").val();
            //console.log(request.length)
            for (let status of allStatus) {
                if (cnt <= 30949) {
                    //console.log(status.name);
                    if (request.length > 4) {
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
                //}
            }
            //console.log(filterStatus);

            index(filterStatus);
        });
        $("#search").keypress(function (e) {
            if (e.which == 13) {
                $("#submit").click();
            }
        })

        function indexFooter() {
            let footer = document.createElement("footer");
            footer.classList("box active bg-lightgreen");
        }
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
                a.href = "./recipe.html?recipeId=" + filterStatus[i].id;

                let i_num = document.createElement("i");
                i_num.classList.add("fas", "fa-user-friends", "mr-2", "text-primary");

                let span_num = document.createElement("span");
                span_num.classList.add("text-left");
                span_num.textContent = filterStatus[i].num_people;

                let i_time = document.createElement("i");
                i_time.classList.add("far", "fa-clock", "ml-2", "mr-1", "mt-2", "lead");

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