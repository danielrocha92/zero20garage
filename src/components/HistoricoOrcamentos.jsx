import React, { useEffect, useState } from 'react';
import './PainelOrcamentos.css'; // Reutiliza o estilo existente
import axios from 'axios';

const HistoricoOrcamentos = () => {
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarHistorico = async () => {
      try {
        const response = await axios.get('https://seu-backend/render/api/historico'); // Altere para sua URL real
        setHistorico(response.data);
      } catch (error) {
        console.error('Erro ao buscar histórico:', error);
      } finally {
        setCarregando(false);
      }
    };

    buscarHistorico();
  }, []);

  return (
    <div className="painel-container">
      <h2 className="painel-titulo">Histórico de Orçamentos</h2>

      {carregando ? (
        <p className="painel-loading">Carregando dados...</p>
      ) : historico.length === 0 ? (
        <p className="painel-vazio">Nenhum orçamento encontrado.</p>
      ) : (
        <div className="tabela-scroll">
          <table className="painel-tabela">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Tipo de Serviço</th>
                <th>Data</th>
                <th>Valor Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {historico.map((item, index) => (
                <tr key={index}>
                  <td>{item.cliente}</td>
                  <td>{item.tipoServico}</td>
                  <td>{new Date(item.data).toLocaleDateString()}</td>
                  <td>R$ {Number(item.valorTotal).toFixed(2)}</td>
                  <td className={`status-${item.status.toLowerCase()}`}>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistoricoOrcamentos;
