let hltiles = []

$(".game-board").contextmenu((e) => {
  e.preventDefault();

  // Get mouse position
  let offset = $(".game-board").offset();
  let mouseX = e.pageX - offset.left;
  let mouseY = e.pageY - offset.top;

  let color = "red";
  if (e.altKey) {
    if (e.ctrlKey) {
      color = "green";
    } else {
      color = "yellow";
    }
  } else if (e.ctrlKey) {
    color = "blue";
  }

  highlightTile(Math.floor(mouseX / 80), Math.floor(mouseY / 80), color);
})

$(".game-board").click((e) => {
  $(".highlight-tile").remove();
})

// Create a highlight at a certain coordinate
// x: x-coordinate on board
// y: y-coordinate on board
// c: color variable ("red")
function highlightTile(x, y, c) {
  // Check for highlighted tile in position
  if ($(`.cco-${x}${y}`).length) {
    if ($(`.cco-${x}${y}.hl-${c}`).length) {
      $(`.cco-${x}${y}.hl-${c}`).remove();
      return;
    } else {
      $(`.cco-${x}${y}`).remove();
    }
  }

  let color = getComputedStyle($("body").get(0)).getPropertyValue(`--${c}` || "--red");
  let xpx = `${x * 80}px`;
  let ypx = `${y * 80}px`;
  let hl = $("<div>", {
    width: "80px",
    height: "80px",
  }).css("background-color", color + "cc")
    .css("transform", `translate(${xpx}, ${ypx})`)
    .addClass("highlight-tile")
    .addClass(`cco-${x}${y}`)
    .addClass(`hl-${c}`);
  $(".game-board").append(hl);
}
