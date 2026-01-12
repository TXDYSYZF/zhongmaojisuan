let g_materialCost = 0;
let g_fixedCost = 0;
let g_costAfterLoss = 0;
let g_priceNoTax = 0;
let g_priceWithTax = 0;

function getVal(id) {
  return +document.getElementById(id).value || 0;
}

function calc() {
  const weightGram = getVal("weight");
  const weightKg = weightGram / 1000;
  const materialPrice = getVal("materialPrice");

  const materialCost = weightGram * materialPrice / 1_000_000;

  const fixedCost =
    getVal("process") +
    getVal("mold") +
    getVal("die") +
    getVal("components") +
    getVal("extra1") +
    getVal("extra2") +
    getVal("extra3") +
    getVal("freight");

  const heatCost = getVal("heat") * weightKg;
  const platingCost = getVal("plating") * weightKg;

  const baseCost = materialCost + fixedCost + heatCost + platingCost;

  const costAfterLoss = baseCost * (1 + getVal("loss") / 100);
  const priceNoTax = costAfterLoss * (1 + getVal("profit") / 100);
  const priceWithTax = priceNoTax * (1 + getVal("tax") / 100);

  g_materialCost = materialCost;
  g_fixedCost = fixedCost;
  g_costAfterLoss = costAfterLoss;
  g_priceNoTax = priceNoTax;
  g_priceWithTax = priceWithTax;

  document.getElementById("result").innerHTML = `
    <p>材料成本：${materialCost.toFixed(4)} 元</p>
    <p>固定成本合计：${fixedCost.toFixed(4)} 元</p>
    <p>含损耗成本：${costAfterLoss.toFixed(4)} 元</p>
    <p>销售单价（未税）：${priceNoTax.toFixed(4)} 元</p>
    <p><strong>销售单价（含税）：${priceWithTax.toFixed(4)} 元</strong></p>
  `;
}

function downloadExcel() {
  const rows = [
    ["项目", "数值"],
    ["料号", code.value],
    ["规格", spec.value],
    ["单重(g)", getVal("weight")],
    ["材料单价(元/吨)", getVal("materialPrice")],
    ["加工费", getVal("process")],
    ["模具费", getVal("mold")],
    ["牙板费", getVal("die")],
    ["组件", getVal("components")],
    ["热处理", getVal("heat")],
    ["镀层", getVal("plating")],
    ["附加1", getVal("extra1")],
    ["附加2", getVal("extra2")],
    ["附加3", getVal("extra3")],
    ["运费", getVal("freight")],
    ["损耗率%", getVal("loss")],
    ["利润率%", getVal("profit")],
    ["税率%", getVal("tax")],
    ["——计算结果——", ""],
    ["材料成本", g_materialCost.toFixed(4)],
    ["固定成本合计", g_fixedCost.toFixed(4)],
    ["含损耗成本", g_costAfterLoss.toFixed(4)],
    ["销售单价（未税）", g_priceNoTax.toFixed(4)],
    ["销售单价（含税）", g_priceWithTax.toFixed(4)]
  ];

  const csv = "\uFEFF" + rows.map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "汽标成本报价表.csv";
  a.click();
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}
