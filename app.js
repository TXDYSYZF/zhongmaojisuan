function calc() {
  // ========= 基础 =========
  const weightGram = getVal("weight");
  const weightKg = weightGram / 1000;

  const materialPrice = getVal("materialPrice"); // 元 / 吨

  // ========= 固定单件成本（元 / 件）=========
  const process = getVal("process");
  const mold = getVal("mold");
  const die = getVal("die");
  const washer = getVal("washer");
  const extra1 = getVal("extra1");
  const extra2 = getVal("extra2");
  const freight = getVal("freight");

  // ========= 重量相关成本（元 / kg）=========
  const heatPricePerKg = getVal("heat");
  const platingPricePerKg = getVal("plating");

  // ========= 系数 =========
  const lossRate = getVal("loss") / 100;
  const profitRate = getVal("profit") / 100;
  const taxRate = getVal("tax") / 100;

  // ========= 计算 =========

  // 材料成本（元 / 件）
  const materialCost = weightGram * materialPrice / 1_000_000;

  // 重量相关成本
  const heatCost = weightKg * heatPricePerKg;
  const platingCost = weightKg * platingPricePerKg;

  // 固定成本合计
  const fixedCost =
    process +
    mold +
    die +
    washer +
    extra1 +
    extra2 +
    freight;

  // 基础成本
  const baseCost =
    materialCost +
    heatCost +
    platingCost +
    fixedCost;

  // 相乘项
  const costAfterLoss = baseCost * (1 + lossRate);
  const priceNoTax = costAfterLoss * (1 + profitRate);
  const priceWithTax = priceNoTax * (1 + taxRate);

  // ========= 输出 =========
  document.getElementById("result").innerHTML = `
    <p>材料成本：${materialCost.toFixed(4)} 元</p>
    <p>热处理成本：${heatCost.toFixed(4)} 元</p>
    <p>镀层成本：${platingCost.toFixed(4)} 元</p>
    <p>固定成本合计：${fixedCost.toFixed(4)} 元</p>
    <p>含损耗成本：${costAfterLoss.toFixed(4)} 元</p>
    <p>销售单价（未税）：${priceNoTax.toFixed(4)} 元</p>
    <p><strong>销售单价（含税）：${priceWithTax.toFixed(4)} 元</strong></p>
  `;
}

// 工具函数
function getVal(id) {
  return +document.getElementById(id).value || 0;
}
