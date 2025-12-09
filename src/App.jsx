import React from "react";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>แดชบอร์ดยอดขาย (ตัวอย่าง)</h1>
      </header>
      <main className="main">
        <Dashboard />
      </main>
    </div>
  );
}
