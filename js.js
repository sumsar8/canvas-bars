var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var size = 1650;
canvas.style.width = size + "px";
canvas.style.height = size + "px";
var scale = window.devicePixelRatio;
canvas.width = Math.floor(size * scale);
canvas.height = Math.floor(size * scale);
ctx.scale(scale, scale);

let array = [];

function getRandom() {
    return Math.floor(Math.random() * (13 - 1 + 1)) + 1;
}
function CreateBars() {
    for (let i = 0; i < 27; i++) {
        setTimeout(function timer() {
            array.push(getRandom());
            console.log(i);
            DrawBars();
        }, i * 60);
    }
}

console.log(array);
CreateBars();
function DrawBars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < array.length; i++) {
        ctx.fillStyle = "#bada55";
        ctx.fillRect(60 * i, 0, 50, 70 * array[i]);
    }
}
function insertionSort(array) {
    let n = array.length;
    for (let i = 1; i < n; i++) {
        let current = array[i];
        let j = i - 1;
        while (j > -1 && current < array[j]) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = current;
        DrawBars();
    }
    return array;
}
setTimeout(() => {
    console.log(insertionSort(array));
}, 4000);
