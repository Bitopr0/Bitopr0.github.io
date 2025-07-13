// 點擊「×」隱藏主內容卡片
document
  .querySelector(".歷史表頭 .關閉按鈕")
  .addEventListener("click", () => {
    document.querySelector(".內容卡片").style.display = "none";
  });

// 隨機產生錢包地址
function 隨機地址(prefix = "T", length = 34) {
  const 字元集 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let 結果 = prefix;
  for (let i = 1; i < length; i++) {
    結果 += 字元集.charAt(Math.floor(Math.random() * 字元集.length));
  }
  return 結果;
}

// 日期格式化
function 格式化時間(時間物件) {
  const yyyy = 時間物件.getFullYear();
  const mm = String(時間物件.getMonth() + 1).padStart(2, "0");
  const dd = String(時間物件.getDate()).padStart(2, "0");
  const hh = String(時間物件.getHours()).padStart(2, "0");
  const mi = String(時間物件.getMinutes()).padStart(2, "0");
  const ss = String(時間物件.getSeconds()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

// 隨機金額（浮點）
function 隨機金額(最小, 最大) {
  return (Math.random() * (最大 - 最小) + 最小).toFixed(6);
}

// 初始化紀錄清單容器
const 紀錄清單容器 = document.getElementById("紀錄清單");

// 隨機幣種選擇器
function 隨機幣種() {
  const 幣種池 = ["USDT", "TWD"];
  return 幣種池[Math.floor(Math.random() * 幣種池.length)];
}

// 建立單筆紀錄項目
function 建立紀錄(幣種, 時間, 金額, 狀態類型, 狀態文字, 索引) {
  const 項目 = document.createElement("div");
  項目.className = "紀錄項目";
  項目.innerHTML = `
    <div class="紀錄列"
         data-coin="${幣種}"
         data-amount="${金額}"
         data-time="${時間}"
         data-status="${狀態文字}"
         data-index="${狀態類型 === "處理中" ? 0 : 1}">
      <img src="${幣種}.png" class="幣種圖示" />
      <div class="紀錄文字區塊">
        <div class="幣種文字">${幣種}</div>
        <div class="時間文字">${時間}</div>
      </div>
      <div class="右側資訊">
        <div class="金額文字 可編輯">${金額}</div>
        <div class="狀態 可彈窗 ${狀態類型}">${狀態文字}</div>
      </div>
    </div>
  `;
  紀錄清單容器.appendChild(項目);

  // 綁定左側金額點擊事件（修改金額）
  項目.querySelector('.右側資訊').onclick = function (e) {
    e.stopPropagation();
    // 只選擇金額文字進行修改
    const 金額元素 = this.querySelector('.金額文字');
    let currentAmount = 金額元素.textContent;
    let newAmount = prompt('請輸入新金額：', currentAmount);
    if (newAmount !== null && newAmount.trim() !== '') {
      金額元素.textContent = newAmount;
    }
  };
  // 綁定右側狀態點擊事件（彈出明細）
  項目.querySelector('.紀錄文字區塊').onclick = function (e) {
    e.stopPropagation();
    document.getElementById('遮罩背景').style.display = 'block';
    document.getElementById('提領彈窗').style.display = 'block';
    document.getElementById('彈窗明細').textContent =
      `幣種：${幣種}\n金額：${項目.querySelector('.金額文字').textContent}\n時間：${時間}\n狀態：${狀態文字}`;
  };
}

// ⌛ 初始化第一筆資料
let 現在時間 = new Date();
const 總筆數 = 8;
let 上一幣種 = "USDT";

建立紀錄("USDT", 格式化時間(現在時間), "8650.284771", "處理中", "處理中", 0);
上一幣種 = "USDT";

// 🔄 建立後續隨機紀錄
for (let i = 1; i < 總筆數; i++) {
  const 回朔天數 = Math.floor(Math.random() * 5) + 1;
  現在時間.setDate(現在時間.getDate() - 回朔天數);

  let 幣種;
  if (上一幣種 === "TWD") {
    幣種 = "USDT";
  } else {
    幣種 = Math.random() < 0.4 ? "TWD" : "USDT";
  }

  const 金額 =
    幣種 === "TWD"
      ? Math.floor(Math.random() * (900000 - 80000 + 1)) + 80000
      : 隨機金額(500, 9000);

  建立紀錄(幣種, 格式化時間(現在時間), 金額, "已完成", "完成", i);
  上一幣種 = 幣種;
}

// 關閉彈窗
document.getElementById('關閉彈窗').onclick = function () {
  document.getElementById('遮罩背景').style.display = 'none';
  document.getElementById('提領彈窗').style.display = 'none';
};


