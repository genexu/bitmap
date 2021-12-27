const fs = require("fs");
const { registerFont, createCanvas } = require("canvas");
const Point = require(__dirname + "/../utils/point");

registerFont(__dirname + "/../fonts/manaspace/manaspc.ttf", {
  family: "Manaspc",
});

const width = 600;
const height = 600;
const pixelUnit = 10;
const padding = pixelUnit * 2;

const playerBarWidth = pixelUnit * 2;
const playerBarHeight = pixelUnit * 10;

const canvas = createCanvas(width, height, "svg");
const ctx = canvas.getContext("2d");

function renderScene() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "white";
  ctx.lineWidth = 5;
  ctx.setLineDash([20, 15]);
  ctx.beginPath();
  ctx.lineTo(width / 2, 0);
  ctx.lineTo(width / 2, height);
  ctx.stroke();
}

// 7 pixel unit + padding (2 pixel unit)
function renderPlayerScore(x, score) {
  ctx.font = `${pixelUnit * 6}px "Manaspc"`;
  ctx.fillStyle = "white";

  const text = ctx.measureText(score);
  const fontHeight =
    text.actualBoundingBoxAscent + text.actualBoundingBoxDescent;

  ctx.fillText(score, x, fontHeight + padding);

  ctx.strokeStyle = "white";
  ctx.lineWidth = pixelUnit * 1;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.lineTo(x, fontHeight + padding + 1 * pixelUnit);
  ctx.lineTo(x + text.width, fontHeight + padding + 1 * pixelUnit);
  ctx.stroke();
}

function renderPlayerBar(originPoint, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = playerBarWidth;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.lineTo(originPoint.x, originPoint.y);
  ctx.lineTo(originPoint.x, originPoint.y + playerBarHeight);
  ctx.stroke();
}

function renderBall(originPoint, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = pixelUnit * 2;

  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.lineTo(originPoint.x, originPoint.y);
  ctx.lineTo(originPoint.x, originPoint.y + pixelUnit * 2);
  ctx.stroke();
}

function render() {
  renderScene();

  const player1ScoreTextX = (width / 5) * 4;
  const player2ScoreTextX = width / 5;

  renderPlayerScore(player1ScoreTextX, "0");
  renderPlayerScore(player2ScoreTextX, "0");

  const playgroundInitY = pixelUnit * 9;

  const player1BarOriginPoint = new Point(
    0 + padding,
    playgroundInitY + 10 * pixelUnit
  );
  const player2BarOriginPoint = new Point(
    width - padding,
    playgroundInitY + 20 * pixelUnit
  );

  renderPlayerBar(player1BarOriginPoint, "red");
  renderPlayerBar(player2BarOriginPoint, "blue");

  const ballPoint = new Point(pixelUnit * 25, playgroundInitY + 5 * pixelUnit);

  renderBall(ballPoint, "green");
  fs.writeFileSync("pingpong.svg", canvas.toBuffer());
}

module.exports = {
  render,
};
