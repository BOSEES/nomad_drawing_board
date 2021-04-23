const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const ctx = canvas.getContext("2d");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const backColorCanvas = document.querySelector(".canvas");

const INITIAL_COLOR = "#2c2c2c";

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = INITIAL_COLOR;
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let filling = true;
let painting = false;

function changeColors(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
}

function stopPainting() {
  painting = false;
}

function startpainting() {

}

function onMouseLeave(event) {
  painting = false;
}

function onMouseUp(event) {
  stopPainting();
}

function onMouseDown(event){
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleRangeChange(event) {
  const width = event.target.value;
  ctx.lineWidth = width;
}

function handleModeClick(event) {
  if (filling) {
    filling = false;
    painting = false;
    mode.innerText = "Fill"
  } else {
    filling = true;
    painting = true;
    mode.innerText = "Paint"
  }
}

function handleBackCol(event) {
  const backColor = event.target.style.backgroundColor;
  if (!filling) {
    backColorCanvas.style.backgroundColor = backColor;
  }
}

if(canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseleave", stopPainting);
  // colors.addEventListener("click", changeColors);
}
Array.from(colors).forEach(color => color.addEventListener("click", changeColors));
Array.from(colors).forEach(backColor => backColor.addEventListener("click", handleBackCol))

if (range) {
  range.addEventListener("input", handleRangeChange)
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

