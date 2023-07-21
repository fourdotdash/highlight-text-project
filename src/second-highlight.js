function applyPermanentHighlight(event) {
  const selection = document.getSelection();
  const paragraph = document.getElementById("two");

  if (selection.toString().length > 0 && paragraph.tagName === "P") {
    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.className = "permanent-highlight";
    range.surroundContents(span);

    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.innerHTML = '<button class="remove-btn">Remove Highlight</button>';

    const boundingRect = span.getBoundingClientRect();
    tooltip.style.top = boundingRect.top - 35 + "px";
    tooltip.style.left = boundingRect.left + "px";

    const removeBtn = tooltip.querySelector(".remove-btn");
    removeBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      span.classList.remove("permanent-highlight");
      tooltip.parentNode.removeChild(tooltip);
    });

    document.body.appendChild(tooltip);

    function hideTooltip() {
      tooltip.style.display = "none";
    }

    let timeoutId;
    span.addEventListener("mouseover", function () {
      clearTimeout(timeoutId);
      tooltip.style.display = "block";
    });

    span.addEventListener("mouseout", function (event) {
      timeoutId = setTimeout(function () {
        tooltip.style.display = "none";
      }, 1000);
    });

    tooltip.addEventListener("mouseover", function () {
      clearTimeout(timeoutId);
    });

    tooltip.addEventListener("mouseout", function (event) {
      if (!span.contains(event.relatedTarget)) {
        timeoutId = setTimeout(function () {
          tooltip.style.display = "none";
        }, 1000);
      }
    });
  }
}

document
  .getElementById("two")
  .addEventListener("mouseup", applyPermanentHighlight);
