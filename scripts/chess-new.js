const DIMENSIONS = 8;
let style = getComputedStyle(document.querySelector(".game-board"))
const TILE_SIZE = parseInt(style.getPropertyValue("width")) / 8;

document.querySelector(".game-board").addEventListener("contextmenu", function (e) {
  e.preventDefault();

  let rect = document.querySelector(".game-board").getBoundingClientRect();
  let mouseX = e.clientX - rect.left;
  let mouseY = e.clientY - rect.top;

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

document.querySelector(".game-board").addEventListener("click", function (e) {
  let highlights = document.querySelectorAll(".game-tile-highlight");
  for (let tile of highlights) {
    tile.remove();
  }
})

function highlightTile(boardX, boardY, color) {
  let match = document.querySelector(`.game-tile-${boardX}${boardY}`);
  console.log(match);
  if (match) {
    let match_color = match.classList.contains(`game-tile-${color}`)
    if (match) {
      match.remove();
      return;
    } else {
      match.remove();
    }
  }

  let body = document.body;
  let colorHex = getComputedStyle(body).getPropertyValue(`--${color}`);
  let transparentColorHex = colorHex + "cc";

  let translate_x = (TILE_SIZE * boardX).toString() + "px";
  let translate_y = (TILE_SIZE * boardY).toString() + "px";

  let tile = document.createElement("div");
  tile.style.setProperty("background-color", transparentColorHex)
  tile.style.setProperty("transform", `translate(${translate_x}, ${translate_y})`);
  tile.classList.add("game-tile-highlight");
  tile.classList.add(`game-tile-${boardX}${boardY}`)
  tile.classList.add(`game-tile-${color}`)

  document.querySelector(".game-board").appendChild(tile);
}
