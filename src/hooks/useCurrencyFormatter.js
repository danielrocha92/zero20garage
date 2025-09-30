// src/hooks/useCurrencyFormatter.js
export const formatCurrency = (value) => {
  if (!value && value !== 0) return "";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const parseCurrency = (value) => {
  if (!value) return 0;
  return parseFloat(
    value
      .replace(/[R$\s.]/g, "")
      .replace(",", ".")
  ) || 0;
};
