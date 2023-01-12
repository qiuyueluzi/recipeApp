$(function () {
    $.when(
        $.getJSON('./make_json/item_list.json')
    ).then((item_listJson) => {
        let allItems = item_listJson;

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