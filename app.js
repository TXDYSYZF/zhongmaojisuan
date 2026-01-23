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

function downloadQuoteDoc() {
  if (!g_priceWithTax) {
    alert("请先计算单价");
    return;
  }

  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth()+1}月${today.getDate()}日`;

  const html = `
<html>
<head>
<meta charset="UTF-8">
<style>
  body {
    font-family: SimSun;
    font-size: 10.5pt;
    line-height: 1.6;
  }
  .title {
    text-align: center;
    font-size: 16pt;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .info {
    margin-bottom: 10px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 10.5pt;
  }
  th, td {
    border: 1px solid #000;
    padding: 6px;
    text-align: center;
  }
  th {
    font-size: 12pt;
    font-weight: bold;
  }
  .no-border td {
    border: none;
    text-align: left;
    padding: 4px 0;
  }
  .footer {
    margin-top: 20px;
    text-align: right;
  }
</style>
</head>

<body>

<div class="title">江苏中茂金属科技有限公司</div>

<div class="info">
  电 话：0512-86162111　　13962313598<br/>
  邮 箱：gzw@zmwj.cn<br/>
  网 址：www.zmwj.cn<br/>
  地 址：江苏·常熟沙家浜镇南新路58号
</div>

<table class="no-border">
  <tr>
    <td>收件公司：</td>
    <td>收件人：</td>
  </tr>
  <tr>
    <td>电 话：</td>
    <td>传 真：</td>
  </tr>
</table>

<p>您好！贵司所需产品报价如下：</p>

<table>
  <tr>
    <th>序号</th>
    <th>产品名称</th>
    <th>产品规格</th>
    <th>单价（元/套）</th>
    <th>备注</th>
  </tr>
  <tr>
    <td>1</td>
    <td></td>
    <td></td>
    <td>${g_priceWithTax.toFixed(4)}</td>
    <td></td>
  </tr>
</table>

<p>（1）材质：</p>
<p>（2）以上价格含税，含运费</p>
<p>（3）表面处理：</p>
<p>（4）报价有效期为30天</p>
<p>（5）交货期限：订单确认后30天内交货</p>
<p>（6）包装方式：纸箱散装</p>
<p>（7）付款方式：款到发货</p>

<div class="footer">
  江苏中茂金属科技有限公司<br/>
  报价人：龚子文<br/>
  ${dateStr}
</div>

</body>
</html>
`;

  const blob = new Blob(["\ufeff" + html], {
    type: "application/msword"
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "中茂汽标报价单.doc";
  a.click();
}
