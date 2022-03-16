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
const BarAmount = 100;
const BarHeight = 4.6;
const CreateBarsTime = 10;
let SortBarsTime = 1;
let canvasheight = window.innerHeight - 26;
let canvaswidth = window.innerWidth;
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
        document.getElementById("sortbutton2").style.display = "block";
        console.table(array);
    }, CreateBarsTime * BarAmount);

    for (let i = 0; i < BarAmount; i++) {
        setTimeout(function timer() {
            array.push(getRandom());
            DrawBars();
        }, i * CreateBarsTime);
    }
}

function DrawBars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < array.length; i++) {
        ctx.fillStyle = "#bada55";
        ctx.fillRect(
            13 * i,
            0,
            canvaswidth / 100,
            (canvasheight / BarHeight) * array[i] * 0.046
        );
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
            SortBarsTime -= 0.002;
            DrawBars();
            await timer(SortBarsTime);
        }
        array[j + 1] = current;
    }
    DrawBars();
    DrawBarsFinished();
}
async function DrawBarsFinished() {
    for (let i = 0; i < array.length; i++) {
        await timer(10);
        ctx.fillStyle = "#e31102";
        ctx.fillRect(
            13 * i,
            0,
            canvaswidth / 100,
            (canvasheight / BarHeight) * array[i] * 0.046
        );
    }
}
function MergeSort() {}
function Reset() {
    array = [];
    DrawBars();
    document.getElementById("generatebutton").style.display = "block";
    document.getElementById("sortbutton1").style.display = "none";
    document.getElementById("sortbutton2").style.display = "none";
}
function swap(array, leftIndex, rightIndex) {
    var temp = array[leftIndex];
    array[leftIndex] = array[rightIndex];
    array[rightIndex] = temp;
}
function partition(array, left, right) {
    var pivot = array[Math.floor((right + left) / 2)], //middle element
        i = left, //left pointer
        j = right; //right pointer
    while (i <= j) {
        while (array[i] < pivot) {
            i++;
        }
        while (array[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(array, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}

async function QuickSort(array, left, right) {
    var index;
    await timer(8);
    DrawBars();
    if (array.length > 1) {
        index = partition(array, left, right); //index returned from partition
        if (left < index - 1) {
            //more elements on the left side of the pivot
            QuickSort(array, left, index - 1);
        }
        if (index < right) {
            //more elements on the right side of the pivot
            QuickSort(array, index, right);
        }
    }

    return array;
}
// first call to quick sort
