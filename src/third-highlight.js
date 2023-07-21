function convertURLsToHyperlinks(paragraph) {
  const text = paragraph.textContent;
  const regex = /https?:\/\/\S+/g;
  const matches = text.match(regex);

  if (matches) {
    matches.forEach((url) => {
      const hyperlink = document.createElement("a");
      hyperlink.href = url;
      hyperlink.textContent = url;
      paragraph.innerHTML = paragraph.innerHTML.replace(
        url,
        hyperlink.outerHTML
      );
    });
  }
}

const thirdParagraph = document.getElementById("three");
convertURLsToHyperlinks(thirdParagraph);

function applyPermanentHighlight(event) {
  const selection = document.getSelection();
  const paragraph = document.getElementById("three");

  if (
    selection.toString().length > 0 &&
    paragraph.contains(selection.anchorNode)
  ) {
    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.className = "permanent-highlight";
    range.surroundContents(span);

    const links = span.querySelectorAll("a");
    links.forEach((link) => {
      link.removeAttribute("href");
      link.style.pointerEvents = "none";
    });
  }
}

document
  .getElementById("three")
  .addEventListener("mouseup", applyPermanentHighlight);
