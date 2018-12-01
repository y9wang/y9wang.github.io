var spelling;
var vocabs;
readFile("./spelling.txt");
readFile("./vocabulary.txt");


function readFile(fileName) {
    var raw = new XMLHttpRequest();
    raw.open("GET", fileName, true);
    raw.onload = function (e) {
        if (raw.readyState === 4) {
            if (raw.status === 200) {
                switch (fileName) {
                    case "./spelling.txt":
                        spelling = raw.responseText.split("\n");
                        break;
                    case "./vocabulary.txt":
                        vocabs = raw.responseText.split("\n");
                        break;
                }
                //console.log(raw.responseText);
            } else {
                console.error(raw.statusText);
            }
        }
    };
    raw.onerror = function (e) {
        console.error(raw.statusText);

    };
    raw.send(null);
}



function generate(type, length) {
    result = [];
    var i = 0;
    var words;

    if (type === "Vocabulary") {
        words = vocabs;
        //console.log("vocab");

    } else {
        words = spelling;
        //console.log("spelling");
    }
    var len = words.length - 1;

    while (i < length) {
        var idx = Math.floor((Math.random() * len) + 1);
        //console.log(idx);
        word = words[idx];
        if ((result.indexOf(word)) < 0) {
            result.push(word);
            i++;
        }
    }
    return result;
}

function doWork(type) {
    document.getElementById("label").innerHTML = type;
    var amount = document.getElementById("amount").value;
    //console.log(amount);

    var display_result = generate(type, amount);;

    var list = document.createElement('ol');
    for (var i = 0; i < display_result.length; i++) {
        var item = document.createElement('li');
        item.setAttribute("class", "list-group-item");
        item.appendChild(document.createTextNode(display_result[i]));
        list.appendChild(item);
    }

    document.getElementById("list").innerHTML = "";
    document.getElementById("list").appendChild(list);
    document.getElementsByTagName("OL")[0].setAttribute("class", "list-group");

    //document.getElementById("list").replaceChild(list);


}
