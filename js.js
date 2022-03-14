var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var size = 1650;
let num;
canvas.style.width = size + "px";
canvas.style.height = size + "px";
var scale = window.devicePixelRatio;
canvas.width = Math.floor(size * scale);
canvas.height = Math.floor(size * scale);
ctx.scale(scale, scale);
const BarAmount = 128;
const BarHeight = 4.6;
const CreateBarsTime = 10;
const SortBarsTime = 6;

let array = [];

function getRandom() {
    let UntilNewInt = true;
    while (UntilNewInt) {
        num = Math.floor(Math.random() * (BarAmount - 1 + 1)) + 1;
        if (!array.includes(num)) {
            UntilNewInt = false;
        }
    }
    return num;
}

function CreateBars() {
    document.getElementById("generatebutton").style.display = "none";

    setTimeout(() => {
        document.getElementById("sortbutton1").style.display = "block";
    }, CreateBarsTime * BarAmount);

    for (let i = 0; i < BarAmount; i++) {
        setTimeout(function timer() {
            array.push(getRandom());
            console.log(i);
            DrawBars();
        }, i * CreateBarsTime);
    }
}

console.log(array);

function DrawBars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < array.length; i++) {
        ctx.fillStyle = "#bada55";
        ctx.fillRect(10 * i, 0, 10, BarHeight * array[i]);
    }
}
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

async function InsertionSort(array) {
    let n = array.length;
    for (let i = 1; i < n; i++) {
        let current = array[i];
        let j = i - 1;
        while (j > -1 && current < array[j]) {
            array[j + 1] = array[j];
            j--;
            DrawBars();
            await timer(SortBarsTime);
        }
        array[j + 1] = current;
    }
    DrawBars();

    return array;
}
function MergeSort() {}
function Reset() {
    array = [];
    DrawBars();
    document.getElementById("generatebutton").style.display = "block";
    document.getElementById("sortbutton1").style.display = "none";
    document.getElementById("sortbutton2").style.display = "none";
}
