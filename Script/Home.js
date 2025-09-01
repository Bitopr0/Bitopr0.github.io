let amountSpan;
let currentAmount;

window.onload = function () {
  amountSpan = document.getElementById("amount");

  currentAmount = Math.floor(Math.random() * (90000 - 100 + 1)) + 100;
  updateAmountDisplay(currentAmount);

  amountSpan.style.cursor = "pointer";
  amountSpan.addEventListener("click", handleAmountChange);
};

function updateAmountDisplay(amount) {
  const formatted = amount.toLocaleString();
  amountSpan.innerHTML = `${formatted} <img src="/res/Right.png" class="arrow" />`;
}

function handleAmountChange() {
  const input = prompt("請輸入新的金額：", currentAmount);
  if (input !== null && !isNaN(input)) {
    currentAmount = parseInt(input);
    updateAmountDisplay(currentAmount);
  } else if (input !== null) {
    alert("請輸入有效的數字！");
  }
}
