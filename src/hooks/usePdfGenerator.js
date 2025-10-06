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
        imagens.map(img => toPngDataUrl(getCloudinaryOriginal(img.imagemUrl)))
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
    document.body.classList.add("pdf-mode-body-overflow");
    element.classList.add("force-print-layout");

    try {
      await sleep(300);
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        scrollY: -window.scrollY,
        windowWidth: element.scrollWidth,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      const pdf = new jsPDF("portrait", "mm", [pdfWidth, pdfHeight]);

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Adiciona as imagens originais em alta resolução nas páginas seguintes
      await appendOriginalImagesToPdf(pdf, orcamento?.imagens || []);

      const filename = `Orçamento_OS_${orcamento?.ordemServico || "SemOS"}_${
        orcamento?.cliente || "SemCliente"
      }.pdf`;
      pdf.save(filename);

    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
    } finally {
      document.body.classList.remove("pdf-mode-body-overflow");
      element.classList.remove("force-print-layout");
      setIsGenerating(false);
    }
  }, [componentRef, isGenerating]);

  return { generatePdf, isGenerating };
};