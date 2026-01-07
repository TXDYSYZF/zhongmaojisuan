function calc() {
  const weightGram = getVal("weight");
  const materialPrice = getVal("materialPrice");

  const process = getVal("process");
  const mold = getVal("mold");
  const die = getVal("die");
  const components = getVal("components");
  const extra1 = getVal("extra1");
  const extra2 = getVal("extra2");
  const freight = getVal("freight");

  const lossRate = getVal("loss") / 100;
  const profitRate = getVal("profit") / 100;
  const taxRate = getVal("tax") / 100;

  // 材料成本
  const materialCost = weightGram * materialPrice / 1_000_000;

  const fixedCost =
    process +
    mold +
    die +
    components +
    extra1 +
    extra2 +
    freight;

  const baseCost = materialCost + fixedCost;

  const costAfterLoss = baseCost * (1 + lossRate);
  const priceNoTax = costAfterLoss * (1 + profitRate);
  const priceWithTax = priceNoTax * (1 + taxRate);

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

/* 深色模式 */
function toggleTheme() {
  document.body.classList.toggle("dark");
}
