function getRandomRainbowColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let currentRainbowColor;

function applyPermanentHighlight(event) {
  const selection = document.getSelection();
  const paragraph = document.getElementById("four");

  if (
    selection.toString().length > 0 &&
    paragraph.contains(selection.anchorNode)
  ) {
    const range = selection.getRangeAt(0);
    const span = document.createElement("span");

    const selectedText = selection.toString();
    const containsIpsum = selectedText.toLowerCase().includes("ipsum");

    if (containsIpsum) {
      const textArray = selectedText.split("");
      const rainbowText = textArray.map((letter) => {
        currentRainbowColor = getRandomRainbowColor();
        return `<span style="background-color: ${currentRainbowColor};">${letter}</span>`;
      });
      span.innerHTML = rainbowText.join("");
    } else {
      span.style.backgroundColor = "cyan";
      span.textContent = selectedText;
    }

    range.deleteContents();
    range.insertNode(span);
  }
}

document
  .getElementById("four")
  .addEventListener("mouseup", applyPermanentHighlight);

document.addEventListener("mouseup", function (event) {
  if (!document.getElementById("four").contains(event.target)) {
    window.getSelection().removeAllRanges();
  }
});
