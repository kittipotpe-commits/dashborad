import React from "react";

const formatNumber = (n) =>
  n === null || n === undefined ? "-" : n.toLocaleString();

const formatCurrency = (n, currency = "THB") =>
  n === null || n === undefined
    ? "-"
    : new Intl.NumberFormat("th-TH", { style: "currency", currency }).format(n);

const ArrowUp = ({ className }) => (
  <svg className={className} width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowDown = ({ className }) => (
  <svg className={className} width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M19 12l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function KPICard({
  title,
  value,
  isCurrency = false,
  currency = "THB",
  change = null,
  changeIsPercent = true,
  compareLabel = ""
}) {
  const positive = typeof change === "number" ? change >= 0 : null;
  const changeAbs = typeof change === "number" ? Math.abs(change) : null;

  const displayValue =
    isCurrency
      ? formatCurrency(value, currency)
      : typeof value === "number"
      ? formatNumber(value)
      : value;

  const changeText =
    change === null
      ? ""
      : changeIsPercent
      ? `${(changeAbs * 100).toFixed(2)}%`
      : isCurrency
      ? formatCurrency(changeAbs, currency)
      : formatNumber(changeAbs);

  return (
    <div className="kpi-card" role="group" aria-label={title}>
      <div className="kpi-title">{title}</div>

      <div className="kpi-value-row">
        <div className="kpi-value">{displayValue}</div>
      </div>

      <div className="kpi-meta">
        {change !== null ? (
          <div className={`kpi-change ${positive ? "positive" : "negative"}`}>
            {positive ? <ArrowUp className="kpi-arrow" /> : <ArrowDown className="kpi-arrow" />}
            <span className="kpi-change-text">{changeText}</span>
          </div>
        ) : null}
        {compareLabel ? <div className="kpi-compare">{compareLabel}</div> : null}
      </div>
    </div>
  );
}
