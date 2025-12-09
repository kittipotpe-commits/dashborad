import React from "react";
import KPICard from "./KPICard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer
} from "recharts";
import sampleData, { kpiData } from "../data/sampleData";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A78BFA"];

export default function Dashboard() {
  return (
    <div className="dashboard">
      <section className="kpi-row">
        {kpiData.map((k) => (
          <KPICard
            key={k.title}
            title={k.title}
            value={k.value}
            isCurrency={k.isCurrency}
            currency={k.currency}
            change={k.change}
            changeIsPercent={k.changeIsPercent}
            compareLabel={k.compareLabel}
          />
        ))}
      </section>

      <section className="charts">
        <div className="chart-card">
          <h3>ยอดขายตามเดือน</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={sampleData.line}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => new Intl.NumberFormat("th-TH").format(value)} />
              <Line type="monotone" dataKey="sales" stroke="#0088FE" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>ค่าใช้จ่ายตามเดือน</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={sampleData.bar}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip formatter={(value) => new Intl.NumberFormat("th-TH").format(value)} />
              <Bar dataKey="expenses" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>ยอดของเสีย (ตามเดือน)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={sampleData.pie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                {sampleData.pie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
