const files = "abcdefgh";
const ranks = "87654321";
const tileDim = "64px";

// Create the chess grid
let grid = document.getElementsByClassName("game-grid")[0];

// There are 8 rows
for (let r = 0; r < 8; r++) {
  let gameRow = document.createElement("div");
  gameRow.classList.add("game-row");
  grid.append(gameRow);

  // Each row contains 8 tiles
  for (let c = 0; c < 8; c++) {
    let gameTile = document.createElement("div");
    gameTile.classList.add("game-tile");
    gameTile.classList.add("code");

    // Add a coordinate to class list for speed later
    gameTile.classList.add(`coord-${c}-${r}`);

    // Add a "chess coordinate" to class list for easy access
    gameTile.classList.add(`vis-coord-${files[c]}${ranks[r]}`)
    gameTile.innerHTML = `${files[c]}${ranks[r]}`;

    gameTile.style.textAlign = "center";
    gameTile.style.lineHeight = "80px";

    // Add right-click highlighting action
    gameTile.addEventListener("contextmenu", (e) => {
      // Prevent opening a menu
      e.preventDefault();

      // Get the color variables from CSS
      let body = document.getElementsByTagName("body")[0];
      let bodyStyle = getComputedStyle(body);

      let hlColor = "--red";
      // Use a different color for each key;
      if (e.ctrlKey) {
        if (e.altKey) {
          hlColor = "--green";
        } else {
          hlColor = "--blue";
        }
      } else if (e.altKey) {
        hlColor = "--yellow";
      }

      hlColor = bodyStyle.getPropertyValue(`${hlColor}bb`);

      // Get coordinates from class name
      let col = -1;
      let row = -1;
      let re = /^coord-(\d)-(\d)$/;
      for (let c of gameTile.classList) {
        let matchResults = c.match(re);
        if (!matchResults) {
          continue;
        }
        
        col = parseInt(matchResults[1]);
        row = parseInt(matchResults[2]);
      }

      highlightTile(col, row, hlColor);
    })

    gameRow.append(gameTile);
  }
}

// Highlight a tile
function highlightTile(col, row, color) {
  if (typeof(col) != "number" || typeof(row) != "number") {
    throw "Column and row should be numbers";
  }

  let highlight = document.createElement("div");
  highlight.style.width = tileDim;
  highlight.style.height = tileDim;
  highlight.style.position = "absolute";
  highlight.style.backgroundColor = color;

  // Get tileDim number and units
  let dim = parseFloat(tileDim);
  let unit = tileDim.match(/[1-9.]+(.*)/)[1];

  highlight.style.top = `${row * dim}${unit}`
  highlight.style.left = `${col * dim}${unit}`

  grid.append(highlight);
}

// Show coordinates on each game tile
function showCoords() {
  let row = 0;
  let column = 0;

  for (let rowDiv of grid.children) {
    // Skip effects and highlighting, etc.
    if (!rowDiv.classList.contains("game-row")) {
      continue;
    }

    row++;

    for (let tile of rowDiv.children) {
      if (!rowDiv.classList.contains("game-tile")) {
        continue;
      }

      column++;
      tile.innerHTML = `${files[column]}${ranks[row]}`;
    }
  }
}

// Hide coordinates on each game tile
function hideCoords() {
  for (let rowDiv of grid.children) {
    // Skip effects and highlighting, etc.
    if (!rowDiv.classList.contains("game-row")) {
      continue;
    }

    for (let tile of rowDiv.children) {
      if (!rowDiv.classList.contains("game-tile")) {
        continue;
      }

      tile.innerHTML = "";
    }
  }
}

// Reverse the white/black view of the board
function reverseView() {
  // Change grid flex direction to column-reverse or column
  if (grid.style.flexDirection == "column") {
    grid.style.flexDirection = "column-reverse";
  } else {
    grid.style.flexDirection = "column";
  }

  for (let rowDiv of grid.children) {
    // Skip effects and highlighting, etc.
    if (!rowDiv.classList.contains("game-row")) {
      continue;
    }
    
    // Change row into row-reverse, vice-versa
    if (rowDiv.style.flexDirection == "row") {
      rowDiv.style.flexDirection = "row-reverse";
    } else {
      rowDiv.style.flexDirection = "row";
    }
  }
}

