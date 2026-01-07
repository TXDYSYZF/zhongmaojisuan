function calc() {
  // ===== 基础参数 =====
  const weightGram = getVal("weight");      // g
  const weightKg = weightGram / 1000;       // kg
  const materialPrice = getVal("materialPrice"); // 元 / 吨

  // ===== 固定成本（元 / 件）=====
  const process = getVal("process");
  const mold = getVal("mold");
  const die = getVal("die");
  const components = getVal("components");
  const extra1 = getVal("extra1");
  const extra2 = getVal("extra2");
  const freight = getVal("freight");

  // ===== 重量相关成本（元 / kg，参与计算但不展示）=====
  const heatPricePerKg = getVal("heat");
  const platingPricePerKg = getVal("plating");

  // ===== 系数 =====
  const lossRate = getVal("loss") / 100;
  const profitRate = getVal("profit") / 100;
  const taxRate = getVal("tax") / 100;

  // ===== 计算 =====

  // 材料成本（元 / 件）
  const materialCost = weightGram * materialPrice / 1_000_000;

  // 热处理 & 镀层成本（内部用）
  const heatCost = weightKg * heatPricePerKg;
  const platingCost = weightKg * platingPricePerKg;

  // 固定成本合计
  const fixedCost =
    process +
    mold +
    die +
    components +
    extra1 +
    extra2 +
    freight;

  // 基础成本
  const baseCost =
    materialCost +
    heatCost +
    platingCost +
    fixedCost;

  // 含损耗
  const costAfterLoss = baseCost * (1 + lossRate);

  // 售价
  const priceNoTax = costAfterLoss * (1 + profitRate);
  const priceWithTax = priceNoTax * (1 + taxRate);

  // ===== 输出（不显示热处理 / 镀层）=====
  document.getElementById("result").innerHTML = `
    <p>材料成本：${materialCost.toFixed(4)} 元</p>
    <p>固定成本合计：${fixedCost.toFixed(4)} 元</p>
    <p>含损耗成本：${costAfterLoss.toFixed(4)} 元</p>
    <p>销售单价（未税）：${priceNoTax.toFixed(4)} 元</p>
    <p><strong>销售单价（含税）：${priceWithTax.toFixed(4)} 元</strong></p>
  `;
}

// ===== 工具函数 =====
function getVal(id) {
  return Number(document.getElementById(id).value) || 0;
}
