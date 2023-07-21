function applyPermanentHighlight() {
  const selection = document.getSelection();
  if (selection.toString().length > 0) {
    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.className = "permanent-highlight";
    range.surroundContents(span);
  }
}

document
  .getElementById("one")
  .addEventListener("mouseup", applyPermanentHighlight);
