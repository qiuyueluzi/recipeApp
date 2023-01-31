//文字列の類似度チェック
function levenshteinDistance(str1, str2) {
    let r, c, cost,
    d = [];
    
    for (r = 0; r <= str1.length; r++) {
        d[r] = [r];
    }
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

function difficulty(status) {
    let rank = 0;
    
    let difficult = status.time / status.num_process * status.num_item * 2;
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

function get(varName, url) {
    var varLimit = 2;
    var i;
    var urlAry;
    var varAry;
    var workAry;
    
    urlAry = url.split('?', 2);
    if (urlAry[1]) varAry = urlAry[1].split('&', varLimit);
    
    if (varAry) {
        for (i = 0; i < varAry.length; i++) {
            workAry = varAry[i].split('=', 2)
            if (workAry[0] == varName) return workAry[1];
        }
    }
    
    return null;
}

export{levenshteinDistance, difficulty, get}