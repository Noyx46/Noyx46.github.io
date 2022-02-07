const DIMENSIONS = 8;
const TILE_SIZE = $(".game-board").width() / 8;

$(".game-board").contextmenu(function (e) {
  e.preventDefault();

  // Get mouse position
  let offset = $(".game-board").offset();
  let mouseX = e.pageX - offset.left;
  let mouseY = e.pageY - offset.top;

  // Change the color depending on modifer keys
  let yellow = e.ctrlKey;
  let blue = e.altKey || e.shiftKey;

  let color;
  if (yellow && blue) {
    color = "green";
  } else if (yellow) {
    color = "yellow";
  } else if (blue) {
    color = "blue";
  } else {
    color = "red"
  }

  let boardX = Math.floor(mouseX / TILE_SIZE);
  let boardY = Math.floor(mouseY / TILE_SIZE);
  highlightTile(boardX, boardY, color);
})

$(".game-board").click(function (e) {
  $(".game-highlight").remove();
})

function highlightTile(boardX, boardY, color) {
  let match = $(`.game-tile-${boardX}${boardY}`)
  if (match.length) {
    if (match.hasClass(`game-tile-${color}`)) {
      match.remove();
      return;
    } else {
      match.remove();
    }
  }

  let bodyStyle = getComputedStyle($("body").get(0));
  let colorHex = bodyStyle.getPropertyValue(`--${color}` || "--red");
  let transparentColorHex = colorHex + "cc";

  let translateX = `${boardX * TILE_SIZE}px`;
  let translateY = `${boardY * TILE_SIZE}px`;

  let tile = $("<div>")
    .css("background-color", transparentColorHex)
    .css("transform", `translate(${translateX}, ${translateY})`)
    .addClass("game-tile-highlight")
    .addClass(`game-tile-${boardX}${boardY}`)
    .addClass(`game-tile-${color}`);

  $(".game-board").append(tile);
}
