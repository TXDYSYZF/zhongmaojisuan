function calc() {
  // 基础参数
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

  // 重量相关成本（输入保留，但不显示结果）
  const heat = getVal("heat");
  const plating = getVal("plating");

  // 系数
  const loss = getVal("loss") / 100;
  const profit = getVal("profit") / 100;
  const tax = getVal("tax") / 100;

  // 材料成本
  const materialCost = weightGram * materialPrice / 1_000_000;

  // 重量相关成本
  const heatCost = heat * weightKg;
  const platingCost = plating * weightKg;

  // 固定成本合计
  const fixedCost = process + mold + die + components + extra1 + extra2 + freight;

  // 基础成本
  const baseCost = materialCost + heatCost + platingCost + fixedCost;
  const costAfterLoss = baseCost * (1 + loss);
  const priceNoTax = costAfterLoss * (1 + profit);
  const priceWithTax = priceNoTax * (1 + tax);

  // 输出结果（不显示热处理 / 镀层）
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

// 深色模式切换
function toggleTheme() {
  document.body.classList.toggle("dark");
}
