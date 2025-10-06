// src/components/BudgetSection.jsx
import React from "react";
import { formatValue } from "../utils/formatters";

const BudgetSection = ({ title, items, total, totalLabel }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="items-section">
      <h2>{title}</h2>
      <div className="items-columns">
        {items.map((item, index) => (
          <div key={index} className="list-item-impresso">
            <input type="checkbox" checked readOnly className="checkbox-box" />
            <span className="item-text">{item}</span>
          </div>
        ))}
      </div>
      <div className="total-line-impresso">
        <span>{totalLabel}:</span>
        <strong>{formatValue(total)}</strong>
      </div>
    </section>
  );
};

export default BudgetSection;