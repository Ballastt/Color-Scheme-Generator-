let colorPicker = document.getElementById("color-picker");
let customSelect = document.getElementById("color-scheme");
let selectSelected = customSelect.querySelector(".select-selected");
let selectItems = customSelect.querySelector(".select-items");
let options = selectItems.querySelectorAll("div");
let getSchemeBtn = document.getElementById("get-scheme-btn");
let colorDisplays = document.getElementsByClassName("color-display");
let colorHexes = document.getElementsByClassName("color-hex");

let selectedValue = "monochrome";

// Toggle dropdown
selectSelected.addEventListener("click", (e) => {
  e.stopPropagation();
  const isExpanded = selectItems.classList.toggle("select-hide");
  customSelect.setAttribute("aria-expanded", !isExpanded);
});

// Select option
options.forEach((option) => {
  option.addEventListener("click", (e) => {
    e.stopPropagation();
    selectSelected.textContent = option.textContent.replace("✓", "").trim();
    selectedValue = option.getAttribute("data-value");

    // Remove selected class and aria-selected from all options
    options.forEach((opt) => {
      opt.classList.remove("selected");
      opt.setAttribute("aria-selected", "false");
    });
    // Add selected class and aria-selected to clicked option
    option.classList.add("selected");
    option.setAttribute("aria-selected", "true");

    selectItems.classList.add("select-hide");
    customSelect.setAttribute("aria-expanded", "false");
  });
});

// Close dropdown when clicking outside
document.addEventListener("click", () => {
  selectItems.classList.add("select-hide");
  customSelect.setAttribute("aria-expanded", "false");
});

getSchemeBtn.addEventListener("click", () => {
  let baseColor = colorPicker.value.slice(1);
  let schemeMode = selectedValue;
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=${schemeMode}&count=5`
  )
    .then((res) => res.json())
    .then((data) => {
      data.colors.forEach((color, i) => {
        colorDisplays[i].style.backgroundColor = color.hex.value;
        colorHexes[i].textContent = color.hex.value;
        colorDisplays[i].setAttribute("aria-label", `Color ${i + 1}: ${color.hex.value}`);
      });
    });
});
