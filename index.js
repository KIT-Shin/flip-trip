var stone_template = document.getElementById("stone_template").content;
var game_area = document.getElementById("game_area");
var result = document.getElementById("result");

var stones = [];
var statuses = [];
var values = [];
var length = 0;
var count = 1;
function start() {
    length = document.getElementById("num").value;
    while (game_area.hasChildNodes())
        game_area.removeChild(game_area.firstChild);
    for (var i = 0; i < length; i++) {
        var stone = document.importNode(stone_template, true).querySelector(".stone");
        let j = i;
        stone.addEventListener("click", function (ev) {
            clicked(j);
        });
        game_area.appendChild(stone);
        stones.push(stone);
        statuses.push(false);
    }
    for (var i = 0; i < (1 << length); i++) {
        values.push(false);
    }
    values[0] = true;
}

function clicked(i) {
    if (result.innerText !== "") return;
    stones[i].classList.toggle("flip")
    statuses[i] = !statuses[i];
    let value = 0;
    for (var i = 0; i < length; i++) {
        value <<= 1;
        value |= (statuses[i] ? 1 : 0);
    }
    if (values[value]) {
        result.innerText = "Error!";
        return;
    }
    values[value] = true;
    count++;
    if (count >= (1 << length)) {
        result.innerText = "FullTrip!";
        return;
    }
}