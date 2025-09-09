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
  showNextImage(); // 初始顯示
  setInterval(showNextImage, 3000); // 每3秒切換
  fetchUSDTData(); // 初始取得資料
  setInterval(fetchUSDTData, 6000); // 每6秒更新一次資料
  initOnclick();
};

function initOnclick() {
  $id("Market").addEventListener("click", () => {
    location.href = "../page/Market.html";
  });
  $id("Filled").addEventListener("click", () => {
    location.href = "../page/Filled.html";
  });
  $id("Assets").addEventListener("click", () => {
    location.href = "../page/Assets.html";
  });
  $id("Account").addEventListener("click", () => {
    location.href = "../page/Account.html";
  });
}

const images = [
  "https://cdn.bitopro.com/mini_banner/36/banner_img_tw.webp",
  "https://cdn.bitopro.com/mini_banner/50/banner_img_tw.webp",
  "https://cdn.bitopro.com/mini_banner/51/banner_img_tw.webp",
  "https://cdn.bitopro.com/mini_banner/5/banner_img_tw.webp",
];

let index = 0;
const adspage = $id("Adspage");

function showNextImage() {
  adspage.style.backgroundImage = `url('${images[index]}')`;
  index = (index + 1) % images.length;
}

function getRandomAmount(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderAmount(amount) {
  const formatted = amount.toLocaleString();
  amountSpan.innerHTML = `${formatted} <svg class="arrow" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"
          d="M12.7071 5.29289C12.3166 4.90237 11.6834 4.90237 11.2929 5.29289C10.9024 5.68342 10.9024 6.31658 11.2929 6.70711L15.5858 11H6C5.44772 11 5 11.4477 5 12C5 12.5523 5.44772 13 6 13H15.5858L11.2929 17.2929C10.9024 17.6834 10.9024 18.3166 11.2929 18.7071C11.6834 19.0976 12.3166 19.0976 12.7071 18.7071L18.7071 12.7071C19.0976 12.3166 19.0976 11.6834 18.7071 11.2929L12.7071 5.29289Z">
        </path>
      </svg>`;
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

async function fetchUSDTData() {
  try {
    const bitoproResponse = await fetch('https://api.bitopro.com/v3/tickers/USDT_TWD');
    const bitoproData = await bitoproResponse.json();

    const usdResponse = await fetch('https://open.er-api.com/v6/latest/USD');
    const usdData = await usdResponse.json();

    const lastPrice = parseFloat(bitoproData.data.lastPrice);
    const priceChange = parseFloat(bitoproData.data.priceChange24hr);
    const usdToTwdRate = parseFloat(usdData.rates.TWD);
    const usdtPriceInUsd = lastPrice / usdToTwdRate;

    if (isNaN(lastPrice) || isNaN(priceChange) || isNaN(usdToTwdRate) || isNaN(usdtPriceInUsd)) {
      return;
    }
    if (priceChange > 0) {
      document.getElementById('USDT_Change').style.backgroundColor = '#41b498';
    } else {
      document.getElementById('USDT_Change').style.backgroundColor = '#f6465d';
    }
    document.getElementById('TWD').textContent = lastPrice.toFixed(2);
    document.getElementById('USDT').textContent = usdtPriceInUsd.toFixed(5) + ' USD';
    document.getElementById('USDT_Change').textContent = priceChange.toFixed(2) + ' %';
  } catch (error) {
    console.error('資料取得失敗：', error);
  }
}

