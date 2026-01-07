function calc() {
  const weightGram = getVal("weight");
  const weightKg = weightGram / 1000;
  const materialPrice = getVal("materialPrice");

  // 固定成本
  const process = getVal("process");
  const mold = getVal("mold");
  const die = getVal("die");
  const components = getVal("components");
  const extra1 = getVal("extra1");
  const extra2 = getVal("extra2");
  const freight = getVal("freight");

  // 重量相关成本（保留参与计算）
  const heatPricePerKg = getVal("heat");
  const platingPricePerKg = getVal("plating");

  const lossRate = getVal("loss") / 100;
  const profitRate = getVal("profit") / 100;
  const taxRate = getVal("tax") / 100;

  // 材料成本
  const materialCost = weightGram * materialPrice / 1_000_000;

  // 热处理 & 镀层成本（参与但不显示）
  const heatCost = weightKg * heatPricePerKg;
  const platingCost = weightKg * platingPricePerKg;

  const fixedCost =
    process +
    mold +
    die +
    components +
    extra1 +
    extra2 +
    freight;

  const baseCost =
    materialCost +
    heatCost +
    platingCost +
    fixedCost;

  const costAfterLoss = baseCost * (1 + lossRate);
  const priceNoTax = costAfterLoss * (1 + profitRate);
  const priceWithTax = priceNoTax * (1 + taxRate);

  // 结果区（不显示热处理 / 镀层）
  document.getElementById("result").innerHTML = `
    <p>材料成本：${materialCost.toFixed(4)} 元</p>
    <p>固定成本合计：${fixedCost.toFixed(4)} 元</p>
    <p>含损耗成本：${costAfterLoss.toFixed(4)} 元</p>
    <p>销售单价（未税）：${priceNoTax.toFixed(4)} 元</p>
    <p><strong>销售单价（含税）：${priceWithTax.toFixed(4)} 元</strong></p>
  `;
}

function getVal(id) {
  return +document.getElementById(id).value || 0;
}

// 深色模式
function toggleTheme() {
  document.body.classList.toggle("dark");
}
