// src/components/OrcamentoImpresso.jsx
import React from 'react';
import './OrcamentoForms.css'; // Importa o CSS específico para impressão

/**
 * Componente OrcamentoImpresso
 *
 * Este componente é responsável por exibir um orçamento formatado para visualização
 * e impressão. Ele recebe os dados de um orçamento como propriedade e os renderiza
 * em um layout que simula um documento, pronto para ser impresso como PDF.
 *
 * @param {Object} props - As propriedades do componente.
 * @param {Object} props.orcamento - O objeto de orçamento contendo todos os detalhes
 * (cliente, veículo, peças, serviços, totais, etc.).
 * @param {Function} props.onClose - Função de callback para fechar a visualização
 * do orçamento e retornar ao painel/formulário anterior.
 */
const OrcamentoImpresso = ({ orcamento, onClose }) => {
  if (!orcamento) {
    return (
      <div className="orcamento-impresso-wrapper">
        <div className="orcamento-document-container">
          <p>Nenhum orçamento para exibir. Por favor, salve um orçamento primeiro.</p>
          <div className="orcamento-buttons-container">
            <button className="action-btn" onClick={onClose}>Voltar</button>
          </div>
        </div>
      </div>
    );
  }

  const {
    nome, telefone, veiculo, placa, data,
    tipo, valorTotal, detalhesPecas, detalhesServicos,
    formaPagamento, garantia
  } = orcamento;

  const empresa = {
    nome: "ZERO20 GARAGE",
    endereco: "R. Amador Bueno, 333 - Santo Amaro, São Paulo - SP, 04752-005",
    telefone: "(11) 99999-9999",
    email: "contato@zero20garage.com.br",
    logo: "/images/zero20-background.jpg" // Exemplo de caminho de logo (ajuste se for diferente)
    // Se o logo estiver na pasta public, o caminho é direto como '/background.jpg'
  };

  // Funções auxiliares para calcular totais (se os dados não vierem pré-calculados)
  const calculateTotalPecas = (pecas) => {
    return pecas ? pecas.reduce((sum, item) => sum + (parseFloat(item.total || 0)), 0) : 0;
  };

  const calculateTotalServicos = (servicos) => {
    return servicos ? servicos.reduce((sum, item) => sum + (parseFloat(item.total || item.valor || 0)), 0) : 0;
  };

  const totalPecas = calculateTotalPecas(detalhesPecas);
  const totalServicos = calculateTotalServicos(detalhesServicos);

  return (
    <div className="orcamento-impresso-wrapper">
      <div className="orcamento-document-container">
        <header className="header-info">
          <div className="company-info">
            <strong>{empresa.nome}</strong><br />
            {empresa.endereco}<br />
            Tel: {empresa.telefone} | Email: {empresa.email}
          </div>
          <div className="logo-placeholder">
            {empresa.logo ? (
              <img src={empresa.logo} alt="Logo da Empresa" />
            ) : (
              <p>LOGO ZERO20 GARAGE</p>
            )}
          </div>
        </header>

        <h1 className="orcamento-title">ORÇAMENTO DE {tipo ? tipo.toUpperCase() : 'SERVIÇOS'}</h1>

        <section className="client-data">
          <p><span className="label">Cliente:</span> <span className="value">{nome || 'Não Informado'}</span></p>
          <p><span className="label">Telefone:</span> <span className="value">{telefone || 'Não Informado'}</span></p>
          <p><span className="label">Veículo:</span> <span className="value">{veiculo || 'Não Informado'}</span></p>
          <p><span className="label">Placa:</span> <span className="value">{placa || 'Não Informada'}</span></p>
          <p><span className="label">Data:</span> <span className="value">{data || new Date().toLocaleDateString('pt-BR')}</span></p>
        </section>

        {detalhesPecas && detalhesPecas.length > 0 && (
          <section className="section-pecas">
            <h2>Peças</h2>
            <table className="orcamento-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qtd.</th>
                  <th>Vlr. Unit.</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {detalhesPecas.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td>
                        {/* Se o item tem checkbox, mostre um indicador de selecionado */}
                        {item.selecionado && <span className="checkbox-display">X</span>} {item.nome}
                      </td>
                      <td>{item.quantidade}</td>
                      <td>R$ {parseFloat(item.valorUnitario || 0).toFixed(2)}</td>
                      <td>R$ {parseFloat(item.total || 0).toFixed(2)}</td>
                    </tr>
                    {item.subItens && item.subItens.length > 0 && (
                      <tr>
                        <td colSpan="4">
                          <ul>
                            {item.subItens.map((sub, sIdx) => (
                              <li key={sIdx}>{sub}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {detalhesServicos && detalhesServicos.length > 0 && (
          <section className="section-servicos">
            <h2>Serviços</h2>
            <table className="orcamento-table">
              <thead>
                <tr>
                  <th>Serviço</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {detalhesServicos.map((servico, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td>
                        {/* Se o serviço tem checkbox, mostre um indicador de selecionado */}
                        {servico.selecionado && <span className="checkbox-display">X</span>} {servico.nome}
                      </td>
                      <td>R$ {parseFloat(servico.total || servico.valor || 0).toFixed(2)}</td>
                    </tr>
                    {servico.subItens && servico.subItens.length > 0 && (
                      <tr>
                        <td colSpan="2">
                          <ul>
                            {servico.subItens.map((sub, sIdx) => (
                              <li key={sIdx}>{sub}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </section>
        )}

        <div className="totals-section">
            <div className="total-line-impresso">
              <span className="label">Total Peças:</span>
              <span className="value">R$ {totalPecas.toFixed(2)}</span>
            </div>
            <div className="total-line-impresso">
              <span className="label">Total Serviços:</span>
              <span className="value">R$ {totalServicos.toFixed(2)}</span>
            </div>
            <div className="total-geral-impresso">
              <span className="label">VALOR TOTAL GERAL:</span>
              <span className="value">R$ {parseFloat(valorTotal || 0).toFixed(2)}</span>
            </div>
        </div>


        <section className="info-adicionais">
            <div className="form-pagamento">
              <p><span className="label">Forma de Pagamento:</span> <span className="value">{formaPagamento || 'A combinar'}</span></p>
            </div>
            <div className="garantia-info">
              <p><span className="label">Garantia:</span> <span className="value">{garantia || '90 dias para serviços'}</span></p>
            </div>
        </section>


        <div className="orcamento-buttons-container">
          <button className="action-btn" onClick={() => window.print()}>Imprimir Orçamento</button>
          <button className="action-btn" onClick={onClose}>Voltar ao Painel</button>
        </div>
      </div>
    </div>
  );
};

export default OrcamentoImpresso;