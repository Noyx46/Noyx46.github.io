const files = "abcdefgh"
const ranks = "87654321"

// Create the chess grid
let grid = document.getElementsByClassName("game-grid")[0];

// There are 8 rows
for (let row = 0; row < 8; row++) {
  let gameRow = document.createElement("div");
  gameRow.classList.add("game-row");
  grid.append(gameRow);

  // Each row contains 8 tiles
  for (let col = 0; col < 8; col++) {
    let gameTile = document.createElement("div");
    gameTile.classList.add("game-tile");
    gameTile.classList.add("code");
    gameTile.innerHTML = `${files[col]}${ranks[row]}`;
    gameTile.style.textAlign = "center";
    gameTile.style.lineHeight = "80px";

    // Add right-click highlighting action
    gameTile.addEventListener("contextmenu", (e) => {
      // Prevent opening a menu
      e.preventDefault();

      let hlColor = "var(--red)";
      // Use a different color for each key;
      if (e.ctrlKey) {
        if (e.altKey) {
          hlColor = "var(--green)";
        } else {
          hlColor = "var(--blue)";
        }
      } else if (e.altKey) {
        hlColor = "var(--yellow)";
      }

      if (gameTile.style.backgroundColor == hlColor) {
        let parent = gameTile.parentElement;

        let findRow = 0;
        let findCol = 0;

        // find parent element in grid for row
        for (findRow = 0; findRow < 8; findRow++) {
          if (grid.children[findRow] == parent) {
            break;
          }
        }

        // find self in parent for column
        for (findCol = 0; findCol < 8; findCol++) {
          if (parent.children[findCol] == gameTile) {
            break;
          }
        }

        // white if row + column is even
        if ((findRow + findCol) % 2 == 0) {
          gameTile.style.backgroundColor = "var(--grey2)";
        } else {
          gameTile.style.backgroundColor = "var(--grey0)";
        }
      } else {
        gameTile.style.backgroundColor = hlColor;
      }
    })

    gameRow.append(gameTile);
  }
}

// Show coordinates on each game tile
function showCoords() {

}

// Hide coordinates on each game tile
function hideCoords() {
  for (let rowDiv of grid.children) {
    for (let tile of rowDiv.children) {
      tile.innerHTML = "";
    }
  }
}
