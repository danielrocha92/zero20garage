import React, { useState } from 'react';

const OrcamentoMotorCompleto = () => {
  const [formData, setFormData] = useState({
    pistao: '',
    anel: '',
    filtroOleo: false,
    filtroAr: false,
    valvulaTerm: false,
    comandoValvula: [],
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, options } = e.target;
    const values = Array.from(options).filter(opt => opt.selected).map(opt => opt.value);
    setFormData(prev => ({ ...prev, [name]: values }));
  };

  return (
    <div className="orcamento-container">
      <h2>Orçamento - Motor Completo</h2>

      {/* Variações com select */}
      <label>
        Pistão:
        <select name="pistao" value={formData.pistao} onChange={handleSelectChange}>
          <option value="">Selecione</option>
          <option value="0.25">0,25</option>
          <option value="0.50">0,50</option>
          <option value="0.75">0,75</option>
        </select>
      </label>

      <label>
        Anel:
        <select name="anel" value={formData.anel} onChange={handleSelectChange}>
          <option value="">Selecione</option>
          <option value="0.25">0,25</option>
          <option value="0.50">0,50</option>
          <option value="0.75">0,75</option>
        </select>
      </label>

      {/* Checkboxes simples */}
      <label>
        <input
          type="checkbox"
          name="filtroOleo"
          checked={formData.filtroOleo}
          onChange={handleCheckboxChange}
        />
        Filtro de Óleo
      </label>

      <label>
        <input
          type="checkbox"
          name="filtroAr"
          checked={formData.filtroAr}
          onChange={handleCheckboxChange}
        />
        Filtro de Ar
      </label>

      <label>
        <input
          type="checkbox"
          name="valvulaTerm"
          checked={formData.valvulaTerm}
          onChange={handleCheckboxChange}
        />
        Válvula Termostática
      </label>

      {/* Seleção múltipla */}
      <label>
        Comando de Válvula:
        <select
          name="comandoValvula"
          multiple
          value={formData.comandoValvula}
          onChange={handleMultiSelectChange}
        >
          <option value="admissao">Admissão</option>
          <option value="escape">Escape</option>
        </select>
      </label>

      {/* Resultado JSON para debug */}
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
};

export default OrcamentoMotorCompleto;