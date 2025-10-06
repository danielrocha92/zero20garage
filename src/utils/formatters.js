// src/utils/formatters.js
import dayjs from "dayjs";

/**
 * Formata um valor numérico para a moeda brasileira (BRL).
 * Retorna uma string vazia se o valor for inválido ou zero.
 * @param {number | string} value - O valor a ser formatado.
 * @returns {string} - O valor formatado como "R$ 1.234,56" ou "".
 */
export const formatValue = (value) => {
  const num = Number(value);
  if (isNaN(num) || num === 0) return "";
  return `R$ ${num
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

/**
 * Formata um objeto de data ou string para o formato DD/MM/YYYY.
 * Lida com timestamps do Firebase (_seconds) e datas padrão.
 * @param {object | string} dateInput - O objeto de data ou string.
 * @returns {string} - A data formatada ou uma string vazia.
 */
export const formatDate = (dateInput) => {
  if (!dateInput) return "";

  let dateToFormat;
  if (typeof dateInput === "object" && dateInput._seconds) {
    dateToFormat = dayjs.unix(dateInput._seconds).local();
  } else {
    dateToFormat = dayjs(dateInput);
  }

  return dateToFormat.isValid() ? dateToFormat.format("DD/MM/YYYY") : "";
};