let amountSpan;
let currentAmount;
const $id = (id) => document.getElementById(id);

window.onload = () => {
  amountSpan = $id("amount");
  currentAmount = getRandomAmount(100, 90000);

  renderAmount(currentAmount);

  amountSpan.style.cursor = "pointer";
  amountSpan.addEventListener("click", promptForAmount);

  $id("toolbar1").addEventListener("click", () => {
    $id("QRcode").click();
  });
};

function getRandomAmount(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderAmount(amount) {
  const formatted = amount.toLocaleString();
  amountSpan.innerHTML = `${formatted} <img src="/res/Right.png" class="arrow" />`;
}

function promptForAmount() {
  const input = prompt("請輸入新的金額：", currentAmount);
  const parsed = parseInt(input, 10);

  if (input !== null && !isNaN(parsed)) {
    currentAmount = parsed;
    renderAmount(currentAmount);
  } else if (input !== null) {
    alert("請輸入有效的數字！");
  }
}
