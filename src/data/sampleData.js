// ข้อมูลมาจากรูป (คอลัมน์: เดือน, ยอดขายรวม, ค่าใช้จ่าย, ยอดของเสีย)
const rows = [
  { month: "2025-06", label: "มิถุนายน",   sales: 184292,  expenses: null,      loss: null    },
  { month: "2025-07", label: "กรกฎาคม",  sales: 1455490, expenses: 1549635, loss: 189432 },
  { month: "2025-08", label: "สิงหาคม",   sales: 2241620, expenses: 2347187, loss: 210046 },
  { month: "2025-09", label: "กันยายน",   sales: 1232979, expenses: 1218982, loss: 188720 },
  { month: "2025-10", label: "ตุลาคม",     sales: 1426077, expenses: 1604857, loss: 243555 },
  { month: "2025-11", label: "พฤศจิกายน", sales: 364788,  expenses: 423671,  loss: 50461  }
];

function sum(arr, key) {
  return arr.reduce((acc, r) => acc + (typeof r[key] === "number" ? r[key] : 0), 0);
}
function safe(value) {
  return value === null || value === undefined ? null : value;
}
function pctChange(curr, prev) {
  if (prev === null || prev === 0 || prev === undefined) return null;
  return (curr - prev) / prev;
}

const totalSales = sum(rows, "sales");
const totalExpenses = sum(rows, "expenses");
const totalLoss = sum(rows, "loss");

const latest = rows[rows.length - 1];
const prev = rows[rows.length - 2] || null;

const kpiData = [
  {
    title: "ยอดขายรวม",
    value: totalSales,
    isCurrency: true,
    currency: "THB",
    change: null,
    changeIsPercent: false,
    compareLabel: ""
  },
  {
    title: `ยอดขาย (${latest.label})`,
    value: safe(latest.sales),
    isCurrency: true,
    currency: "THB",
    change: prev ? pctChange(latest.sales, prev.sales) : null,
    changeIsPercent: true,
    compareLabel: prev ? `vs ${prev.label}` : ""
  },
  {
    title: "ค่าใช้จ่ายรวม",
    value: totalExpenses,
    isCurrency: true,
    currency: "THB",
    change: null,
    changeIsPercent: false,
    compareLabel: ""
  },
  {
    title: "ยอดของเสียรวม",
    value: totalLoss,
    isCurrency: true,
    currency: "THB",
    change: null,
    changeIsPercent: false,
    compareLabel: ""
  }
];

const line = rows.map((r) => ({ date: r.month, label: r.label, sales: r.sales }));
const bar = rows.map((r) => ({ label: r.label, expenses: r.expenses || 0 }));
const pie = rows.map((r) => ({ name: r.label, value: r.loss || 0 }));

export default { rows, line, bar, pie };
export { kpiData };
