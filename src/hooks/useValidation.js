// src/hooks/useValidation.js
export const regexTelefone = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
export const regexPlaca = /^[A-Z]{3}-?\d{4}$/i;
export const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateTelefone = (telefone) => regexTelefone.test(telefone);
export const validatePlaca = (placa) => regexPlaca.test(placa);
export const validateEmail = (email) => regexEmail.test(email);
