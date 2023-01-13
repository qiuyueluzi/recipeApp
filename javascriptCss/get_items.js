$(function () {
    $.when(
        $.getJSON('./make_json/item_list.json'),
        $.getJSON('./make_csv/detail.json')
    ).then((item_listJson, detail_listJson) => {
        let allItems = item_listJson;
        let allDetails = detail_listJson;

        ID = 1;
        for (let detail of allDetails[0]) {    //材料一覧をレンダリング
            //for (let detail of val) {
            detail.for = ID;
            ID++;
            //}
        }

        //console.log(allDetails);
        for (let detail of allDetails[0]) {    //材料一覧をレンダリング
            //for (let detail of val) {
            let row = document.createElement("div");
            let input = document.createElement("input");
            row.classList.add("form-check", "p-0");

            //inputタグを編集
            input.classList.add("form-check-input", "check");
            input.type = "checkbox";
            input.name = "items";
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
            //}
        }
    });

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