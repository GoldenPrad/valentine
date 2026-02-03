const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

const noTexts = [
  "Are you sure?",
  "Are you REALLY sure?",
  "Are you positive?",
  "Absolutely so?",
  "No takesies backsies...",
  "You'll have to catch me first!"
];

const runawayTexts = [
  "You'll have to be faster than that!",
  "Try harder!",
  "I'm over here!",
  "Too slow 😜",
  "Almost!",
  "Missed me!"
];

let noClickCount = 0;
let runawayMode = false;
let yesScale = 1;
let currentCorner = null;
let runawayCount = 0;
const MAX_RUNAWAYS = 4;

function moveNoButtonToNewCorner() {
  const corners = [
    { name: "top-left", top: "20px", left: "20px" },
    { name: "top-right", top: "20px", right: "20px" },
    { name: "bottom-left", bottom: "20px", left: "20px" },
    { name: "bottom-right", bottom: "20px", right: "20px" }
  ];

  const availableCorners = corners.filter(
    corner => corner.name !== currentCorner
  );

  const nextCorner =
    availableCorners[Math.floor(Math.random() * availableCorners.length)];

  noBtn.style.top = "";
  noBtn.style.bottom = "";
  noBtn.style.left = "";
  noBtn.style.right = "";

  Object.assign(noBtn.style, nextCorner);
  currentCorner = nextCorner.name;
}


noBtn.addEventListener("click", () => {
  noClickCount++;

  // Make YES button bigger
  yesScale += 0.25;
  yesBtn.style.transform = `scale(${yesScale})`;

  if (noClickCount < noTexts.length) {
    noBtn.textContent = noTexts[noClickCount];
  } else {
  runawayMode = true;
  noBtn.textContent = "Catch me!";
  noBtn.style.position = "fixed";

  moveNoButtonToNewCorner(); // 👈 instantly moves it to a corner
}
});

noBtn.addEventListener("mouseover", () => {
  if (!runawayMode) return;

  runawayCount++;

  if (runawayCount > MAX_RUNAWAYS) {
    window.location.href = "sad.html";
    return;
  }

  const corners = [
    { name: "top-left", top: "20px", left: "20px" },
    { name: "top-right", top: "20px", right: "20px" },
    { name: "bottom-left", bottom: "20px", left: "20px" },
    { name: "bottom-right", bottom: "20px", right: "20px" }
  ];

  // Pick a corner that's NOT the current one
  const availableCorners = corners.filter(
    corner => corner.name !== currentCorner
  );

  const nextCorner =
    availableCorners[Math.floor(Math.random() * availableCorners.length)];

  // Reset positioning
  noBtn.style.top = "";
  noBtn.style.bottom = "";
  noBtn.style.left = "";
  noBtn.style.right = "";

  Object.assign(noBtn.style, nextCorner);
  currentCorner = nextCorner.name;

  const randomText =
    runawayTexts[Math.floor(Math.random() * runawayTexts.length)];
  noBtn.textContent = randomText;
});



yesBtn.addEventListener("click", () => {
  window.location.href = "yes.html";
});
