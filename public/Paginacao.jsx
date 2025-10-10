import React from 'react';
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from 'react-icons/fa';
import './Paginacao.css';

const Paginacao = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const handleFirst = () => {
    onPageChange(1);
  };

  const handlePrevious = () => {
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  const handleLast = () => {
    onPageChange(totalPages);
  };

  return (
    <div className="paginacao-container">
      <button
        onClick={handleFirst}
        disabled={currentPage === 1}
        className="paginacao-button"
        aria-label="Primeira página"
      >
        <FaAngleDoubleLeft />
      </button>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="paginacao-button"
        aria-label="Página anterior"
      >
        <FaAngleLeft />
      </button>
      <span className="paginacao-info">
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="paginacao-button"
        aria-label="Próxima página"
      >
        <FaAngleRight />
      </button>
      <button
        onClick={handleLast}
        disabled={currentPage === totalPages}
        className="paginacao-button"
        aria-label="Última página"
      >
        <FaAngleDoubleRight />
      </button>
    </div>
  );
};

export default Paginacao;