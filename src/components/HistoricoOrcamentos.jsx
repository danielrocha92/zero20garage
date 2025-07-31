// src/components/HistoricoOrcamentos.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PainelOrcamentos.css'; // Reutiliza o estilo existente

/**
 * Componente HistoricoOrcamentos
 * Exibe uma tabela com o histórico de orçamentos.
 * Permite visualizar um orçamento detalhado.
 *
 * @param {Object} props - As propriedades do componente.
 * @param {Function} props.onViewBudget - Função de callback para visualizar um orçamento detalhado.
 * @param {Function} props.onEditarOrcamento - Função de callback para editar um orçamento (já existente).
 */
const HistoricoOrcamentos = ({ onViewBudget, onEditarOrcamento }) => { // Adicionado onViewBudget
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // ATENÇÃO: Substitua 'https://seu-backend/render/api/historico' pela URL REAL do seu microserviço de backend.
  // Este endpoint deve retornar um array de objetos de orçamento no formato esperado pelo OrcamentoImpresso.
  // Exemplo de estrutura de dados esperada:
  // [
  //   {
  //     id: "um-id-unico",
  //     cliente: "João Silva",
  //     tipo: "motor", // ou "cabecote"
  //     data: "2023-10-26T10:00:00Z",
  //     valorTotal: 1500.75,
  //     status: "Aberto", // Ex: "Aberto", "Aprovado", "Rejeitado"
  //     // Outros campos necessários para OrcamentoImpresso:
  //     telefone: "(XX) XXXX-XXXX",
  //     veiculo: "Carro Modelo",
  //     placa: "ABC-1234",
  //     detalhesPecas: [{ nome: "Pistão", quantidade: 4, valorUnitario: 100.00, total: 400.00, subItens: ["Medida: 0,50"] }],
  //     detalhesServicos: [{ nome: "Usinagem completa", valor: 500.00, subItens: ["Cabeçote"] }],
  //     formaPagamento: "Cartão",
  //     garantia: "90 dias",
  //     ordemServico: "OS-001"
  //   },
  //   // ... mais orçamentos
  // ]
  useEffect(() => {
    const buscarHistorico = async () => {
      try {
        const response = await axios.get('https://api-orcamento-n49u.onrender.com/api/orcamento'); // URL do seu backend
        setHistorico(response.data);
      } catch (error) {
        console.error('Erro ao buscar histórico:', error);
        // Em caso de erro, você pode querer exibir uma mensagem para o usuário
        // setHistorico([]); // Limpa o histórico para não mostrar dados incompletos
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
                <th>OS</th> {/* Adicionado coluna OS */}
                <th>Cliente</th>
                <th>Veículo</th> {/* Adicionado coluna Veículo */}
                <th>Tipo de Serviço</th>
                <th>Data</th>
                <th>Valor Total</th>
                <th>Status</th>
                <th>Ações</th> {/* Nova coluna para botões de ação */}
              </tr>
            </thead>
            <tbody>
              {historico.map((item, index) => (
                <tr key={item.id || index}> {/* Use item.id se disponível, senão index */}
                  <td>{item.ordemServico || 'N/A'}</td> {/* Exibe o número da OS */}
                  <td>{item.cliente || 'Não Informado'}</td>
                  <td>{item.veiculo || 'Não Informado'}</td> {/* Exibe o veículo */}
                  <td>{item.tipo || 'Não Informado'}</td> {/* Usa 'tipo' do orçamento */}
                  <td>{new Date(item.data).toLocaleDateString('pt-BR')}</td>
                  <td>R$ {Number(item.valorTotal || 0).toFixed(2)}</td>
                  <td className={`status-${(item.status || 'aberto').toLowerCase()}`}>{item.status || 'Aberto'}</td>
                  <td>
                    <button
                      onClick={() => onViewBudget(item)}
                      className="action-btn-small view-btn"
                    >
                      Visualizar
                    </button>
                    {/* Botão de editar, se você quiser manter a funcionalidade */}
                    <button
                      onClick={() => onEditarOrcamento(item)}
                      className="action-btn-small edit-btn"
                    >
                      Editar
                    </button>
                  </td>
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
