// src/utils/format.js

// Formata entrada digitada em tempo real (1234 → R$ 12,34)
export const formatCurrencySmart = (value) => {
  if (!value) return "";
  const onlyNumbers = value.replace(/\D/g, "");
  const number = parseFloat(onlyNumbers) / 100;
  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
};

// Formata um número puro para moeda (1234 → R$ 1.234,00)
export const formatNumberToCurrency = (value) => {
  if (typeof value !== "number" || isNaN(value)) return "";
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
};

// Converte string de moeda para número (R$ 1.234,56 → 1234.56)
export const parseCurrencyToNumber = (value) => {
  if (!value) return 0;
  const cleanedValue = value.replace(/[R$\s.]/g, "").replace(",", ".");
  const number = parseFloat(cleanedValue);
  return isNaN(number) ? 0 : number;
};