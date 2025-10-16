// src/hooks/usePdfGenerator.js
import { useState, useCallback } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const getCloudinaryOriginal = (url) => {
    if (typeof url !== "string" || !url.includes("/upload/")) return url;
    const [base, after] = url.split("/upload/");
    const parts = after.split("/");
    return `${base}/upload/${parts.slice(1).join("/")}`;
};

const toPngDataUrl = async (src) => {
    try {
        const img = await new Promise((resolve, reject) => {
            const i = new Image();
            i.crossOrigin = "anonymous";
            i.onload = () => resolve(i);
            i.onerror = () => reject(new Error(`Erro ao carregar imagem: ${src}`));
            i.src = src;
        });
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        canvas.getContext("2d").drawImage(img, 0, 0);
        return canvas.toDataURL("image/png");
    } catch (e) {
        console.error("Erro na conversão da imagem para DataURL:", e);
        return null;
    }
};

const appendOriginalImagesToPdf = async (pdf, imagens) => {
    // ... (toda a lógica da função appendOriginalImagesToPdf permanece aqui)
    // Pequena modificação para usar toPngDataUrl e getCloudinaryOriginal
    if (!imagens || imagens.length === 0) return;

    const dataUrls = await Promise.all(
        imagens.map(img => toPngDataUrl(getCloudinaryOriginal(img.imageUrl)))
    );

    const validDataUrls = dataUrls.filter(Boolean);
    if (validDataUrls.length === 0) return;

    // ... o resto da lógica para adicionar imagens ao PDF
};

export const usePdfGenerator = (componentRef) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePdf = useCallback(async (orcamento) => {
    const element = componentRef.current;
    if (!element || isGenerating) return;

    setIsGenerating(true);

    // Adiciona uma classe ao container para controlar o layout de impressão via CSS
    const container = element.parentElement;
    if (container) {
      container.classList.add('pdf-generating');
    }

    try {
      await sleep(300);
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff', // Garante um fundo branco para o canvas
        scrollY: -window.scrollY,
        windowWidth: element.scrollWidth,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = 210; // A4 width in mm
      const margin = 10; // Margem em mm
      const contentWidth = pdfWidth - 2 * margin;
      const contentHeight = (canvas.height * contentWidth) / canvas.width;
      const pdfHeight = contentHeight + 2 * margin;

      const pdf = new jsPDF("portrait", "mm", [pdfWidth, pdfHeight]);
      pdf.addImage(imgData, "PNG", margin, margin, contentWidth, contentHeight);

      // Adiciona as imagens originais em alta resolução nas páginas seguintes
      await appendOriginalImagesToPdf(pdf, orcamento?.imagens || []);

      const filename = `Orçamento_OS_${orcamento?.ordemServico || "SemOS"}_${
        orcamento?.cliente || "SemCliente"
      }.pdf`;
      pdf.save(filename);

    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
    } finally {
      // Remove a classe para restaurar o layout original da tela
      if (container) {
        container.classList.remove('pdf-generating');
      }
      setIsGenerating(false);
    }
  }, [componentRef, isGenerating]);

  return { generatePdf, isGenerating };
};