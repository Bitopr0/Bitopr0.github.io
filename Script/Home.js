window.onload = function () {
    const amountSpan = document.getElementById("amount");

    // 生成随机金额（例如：100,000 到 9,999,999）
    const randomAmount = Math.floor(Math.random() * (9999999 - 100000 + 1)) + 100000;

    // 格式化为带逗号的金额
    const formattedAmount = randomAmount.toLocaleString();

    // 设置初始金额
    amountSpan.innerHTML = `${formattedAmount} <img src="/res/Right.png" class="arrow" />`;

    // 点击后允许用户修改金额
    amountSpan.style.cursor = "pointer";
    amountSpan.onclick = function () {
        const newAmount = prompt("請輸入新的金額：", randomAmount);
        if (newAmount !== null && !isNaN(newAmount)) {
            const updatedAmount = parseInt(newAmount).toLocaleString();
            amountSpan.innerHTML = `${updatedAmount} <img src="/res/Right.png" class="arrow" />`;
        }
    };
};

