import React, { useState, useEffect } from 'react';
import './OrcamentoForms.css';

// Os dados de itens e serviços completos para o motor
const itensMotorCompletoData = [
  { nome: "Anel", valor: 0, tipo: "quantidade" },
  { nome: "Anti Chamas", valor: 0, tipo: "simples" },
  { nome: "Arruela encosto", valor: 0, tipo: "quantidade" },
  { nome: "Biela", valor: 0, tipo: "simples" },
  { nome: "Bobina", valor: 0, tipo: "simples" },
  { nome: "Bomba d’água", valor: 0, tipo: "simples" },
  { nome: "Bomba de óleo", valor: 0, tipo: "simples" },
  { nome: "Bronzina de biela", valor: 0, tipo: "quantidade" },
  { nome: "Bronzina de mancal", valor: 0, tipo: "quantidade" },
  { nome: "Cabo de vela", valor: 0, tipo: "simples" },
  { nome: "Cebolinha de óleo", valor: 0, tipo: "simples" },
  {
    nome: "Comando de válvula",
    valor: 0,
    tipo: "submenu",
    filhos: [
      { nome: "Admissão" },
      { nome: "Escape" }
    ],
  },
  {
    nome: "Correias",
    valor: 0,
    tipo: "submenu",
    filhos: [
      { nome: "Acessórios kit" },
      { nome: "Capa" },
      { nome: "Corrente kit" },
      { nome: "Dent kit" }
    ],
  },
  { nome: "Desengripante e Limpa contato", valor: 0, tipo: "simples" },
  { nome: "Embreagem", valor: 0, tipo: "simples" },
  { nome: "Engrenagem virab.", valor: 0, tipo: "simples" },
  { nome: "Filtro de ar", valor: 0, tipo: "simples" },
  { nome: "Filtro de combustível", valor: 0, tipo: "simples" },
  { nome: "Filtro de óleo", valor: 0, tipo: "simples" },
  {
    nome: "Litros de aditivo",
    valor: 0,
    tipo: "quantidade"
  },
  {
    nome: "Litros de óleo",
    valor: 0,
    tipo: "quantidade"
  },
  {
    nome: "Mangueiras Radiador",
    valor: 0,
    tipo: "submenu",
    filhos: [
      { nome: "Inferior" },
      { nome: "Superior" }
    ]
  },
  { nome: "Outros", valor: 0, tipo: "simples" },
  { nome: "Parafusos cabeçote", valor: 0, tipo: "simples" },
  { nome: "Pistão", valor: 0, tipo: "quantidade" },
  { nome: "Retentor eixo comando", valor: 0, tipo: "simples" },
  { nome: "Retentor traseiro virab.", valor: 0, tipo: "simples" },
  { nome: "Retentor válvula", valor: 0, tipo: "simples" },
  { nome: "Sensor de temperatura", valor: 0, tipo: "simples" },
  { nome: "Silicone", valor: 0, tipo: "simples" },
  { nome: "Tuchos", valor: 0, tipo: "simples" },
  { nome: "Tubo d’água", valor: 0, tipo: "simples" },
  { nome: "Válvula termostática", valor: 0, tipo: "simples" },
  { nome: "Válvulas admissão", valor: 0, tipo: "simples" },
  { nome: "Válvulas escape", valor: 0, tipo: "simples" },
  { nome: "Velas", valor: 0, tipo: "simples" },
];

const servicosMotorCompletoData = [
  {
    nome: "Cabeçote",
    valor: 0,
    tipo: "submenu",
    filhos: [
      { nome: "Limpeza e Revisão" },
      { nome: "Novo" },
      { nome: "Recuperação de Altura" },
      { nome: "Usinagem Completa" },
    ],
  },
  {
    nome: "Retífica de Cabeçote",
    valor: 0,
    tipo: "submenu",
    filhos: [
      { nome: "Banhos Químicos" },
      { nome: "Teste de Trinca" },
      { nome: "Planeamento" },
      { nome: "Retífica de Válvulas" },
      { nome: "Troca de Guias e Assentos" },
      { nome: "Montagem de Cabeçote" }
    ]
  },
  // Adicione outros serviços que estavam no seu orçamento completo aqui
  { nome: "Retífica do Bloco", valor: 0, tipo: "simples" },
  { nome: "Retífica do Virabrequim", valor: 0, tipo: "simples" },
  { nome: "Montagem do Motor", valor: 0, tipo: "simples" },
  { nome: "Teste Dinâmico", valor: 0, tipo: "simples" },
  { nome: "Ajuste de Injeção", valor: 0, tipo: "simples" },
  { nome: "Revisão do Sistema de Arrefecimento", valor: 0, tipo: "simples" },
  { nome: "Outros Serviços de Motor", valor: 0, tipo: "simples" },
];

// O componente OrcamentoMotorCompleto AGORA recebe `onSubmit` como prop do `PainelOrcamentos`
const OrcamentoMotorCompleto = ({ onSubmit }) => {
  // Estado para os dados do cliente
  const [cliente, setCliente] = useState({
    nome: "",
    telefone: "",
    veiculo: "",
    placa: "",
    data: new Date().toISOString().split("T")[0], // Data atual
  });

  // Estado para os itens de orçamento (peças), inicializando com os dados e valores zerados
  const [itensOrcamento, setItensOrcamento] = useState(
    itensMotorCompletoData.map(item => ({
      ...item,
      valorUnitario: 0, // Adiciona valor unitário para cálculos
      quantidade: 1,    // Adiciona quantidade
      total: 0,         // Adiciona total para cada item
      subItensSelecionados: item.tipo === "submenu" ? item.filhos.map(() => false) : [] // Para submenus
    }))
  );

  // Estado para os serviços de orçamento
  const [servicosOrcamento, setServicosOrcamento] = useState(
    servicosMotorCompletoData.map(servico => ({
      ...servico,
      valorUnitario: 0,
      total: 0,
      subItensSelecionados: servico.tipo === "submenu" ? servico.filhos.map(() => false) : []
    }))
  );

  const [totalPecas, setTotalPecas] = useState(0);
  const [totalServicos, setTotalServicos] = useState(0);
  const [valorTotalGeral, setValorTotalGeral] = useState(0);

  // Efeito para recalcular totais sempre que itens ou serviços mudam
  useEffect(() => {
    let newTotalPecas = 0;
    itensOrcamento.forEach(item => {
      newTotalPecas += item.total;
    });
    setTotalPecas(newTotalPecas);
  }, [itensOrcamento]);

  useEffect(() => {
    let newTotalServicos = 0;
    servicosOrcamento.forEach(servico => {
      newTotalServicos += servico.total;
    });
    setTotalServicos(newTotalServicos);
  }, [servicosOrcamento]);

  useEffect(() => {
    setValorTotalGeral(totalPecas + totalServicos);
  }, [totalPecas, totalServicos]);


  // Função para lidar com a mudança dos dados do cliente
  const handleClienteChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  // Função para lidar com a mudança de valor ou quantidade de um item/serviço
  const handleItemChange = (index, field, value, type) => {
    const updatedArray = type === 'peca' ? [...itensOrcamento] : [...servicosOrcamento];
    const item = updatedArray[index];

    let numericValue = parseFloat(value);
    if (isNaN(numericValue) || numericValue < 0) numericValue = 0;

    if (field === 'quantidade') {
      item.quantidade = numericValue;
      item.total = item.valorUnitario * item.quantidade;
    } else if (field === 'valorUnitario') {
      item.valorUnitario = numericValue;
      item.total = item.valorUnitario * item.quantidade;
    } else if (field === 'subItem') {
      // Para submenus: valorUnitario do item pai representa o total dos filhos selecionados ou um valor único
      item.valorUnitario = numericValue;
      item.total = numericValue; // Se for um valor total para o submenu
    }


    if (type === 'peca') {
      setItensOrcamento(updatedArray);
    } else {
      setServicosOrcamento(updatedArray);
    }
  };

  // Função para lidar com a seleção/desseleção de sub-itens (checkboxes)
  const handleSubItemToggle = (parentIndex, childIndex, type) => {
    const updatedArray = type === 'peca' ? [...itensOrcamento] : [...servicosOrcamento];
    const parentItem = updatedArray[parentIndex];

    parentItem.subItensSelecionados[childIndex] = !parentItem.subItensSelecionados[childIndex];
    // Aqui você pode adicionar lógica para como o valor do item pai é afetado
    // por exemplo, se cada sub-item selecionado adiciona um valor fixo ao total do pai.
    // Por simplicidade, neste exemplo, a lógica de valor para submenus ainda é baseada em valorUnitario.

    if (type === 'peca') {
      setItensOrcamento(updatedArray);
    } else {
      setServicosOrcamento(updatedArray);
    }
  };


  // Função que será chamada quando o formulário for submetido
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validações básicas antes de submeter
    if (!cliente.nome || !cliente.veiculo || !cliente.placa || !valorTotalGeral) {
      alert('Por favor, preencha Nome, Veículo, Placa e certifique-se de que o Valor Total não é zero.');
      return;
    }

    // Prepara os dados para enviar ao componente pai (PainelOrcamentos)
    const dadosParaSalvar = {
      nome: cliente.nome,
      email: cliente.email || 'N/A', // Adicione email se tiver no formData cliente
      telefone: cliente.telefone,
      veiculo: cliente.veiculo,
      placa: cliente.placa,
      data: cliente.data,
      tipo: 'Motor Completo', // Informa o tipo de orçamento
      valorTotal: valorTotalGeral.toFixed(2), // Garante duas casas decimais
      detalhesPecas: itensOrcamento
        .filter(item => item.total > 0) // Inclui apenas itens com valor
        .map(item => ({
          nome: item.nome,
          quantidade: item.quantidade,
          valorUnitario: item.valorUnitario,
          total: item.total,
          // Se for um submenu e tiver sub-itens selecionados, você pode incluí-los aqui
          subItens: item.tipo === 'submenu' ? item.filhos.filter((_, idx) => item.subItensSelecionados[idx]).map(f => f.nome) : undefined
        })),
      detalhesServicos: servicosOrcamento
        .filter(servico => servico.total > 0)
        .map(servico => ({
          nome: servico.nome,
          valor: servico.valorUnitario, // Valor do serviço
          total: servico.total,
          subItens: servico.tipo === 'submenu' ? servico.filhos.filter((_, idx) => servico.subItensSelecionados[idx]).map(f => f.nome) : undefined
        })),
    };

    onSubmit(dadosParaSalvar); // Chama a função onSubmit do componente pai
  };

  return (
    <div className="orcamento-container"> {/* Use uma classe genérica ou específica */}
      <h2>Orçamento de Motor Completo</h2>

      <form onSubmit={handleSubmit} className="orcamento-form">
        {/* Seção de Dados do Cliente */}
        <fieldset className="form-section">
          <legend>Dados do Cliente</legend>
          <div className="form-group">
            <label htmlFor="nomeCliente">Nome:</label>
            <input
              type="text"
              id="nomeCliente"
              name="nome"
              value={cliente.nome}
              onChange={handleClienteChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefoneCliente">Telefone:</label>
            <input
              type="text"
              id="telefoneCliente"
              name="telefone"
              value={cliente.telefone}
              onChange={handleClienteChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="veiculoCliente">Veículo:</label>
            <input
              type="text"
              id="veiculoCliente"
              name="veiculo"
              value={cliente.veiculo}
              onChange={handleClienteChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="placaCliente">Placa:</label>
            <input
              type="text"
              id="placaCliente"
              name="placa"
              value={cliente.placa}
              onChange={handleClienteChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dataOrcamento">Data:</label>
            <input
              type="date"
              id="dataOrcamento"
              name="data"
              value={cliente.data}
              readOnly
              className="read-only-input"
            />
          </div>
        </fieldset>

        {/* Seção de Peças */}
        <fieldset className="form-section">
          <legend>Peças</legend>
          {itensOrcamento.map((item, index) => (
            <div key={index} className="item-group">
              <label>{item.nome}:</label>
              {item.tipo === "quantidade" ? (
                <>
                  <input
                    type="number"
                    placeholder="Qtd."
                    value={item.quantidade}
                    onChange={(e) => handleItemChange(index, 'quantidade', e.target.value, 'peca')}
                    min="0"
                  />
                  <input
                    type="number"
                    placeholder="Valor Unit."
                    value={item.valorUnitario}
                    onChange={(e) => handleItemChange(index, 'valorUnitario', e.target.value, 'peca')}
                    min="0"
                    step="0.01"
                  />
                  <span>Total: R$ {item.total.toFixed(2)}</span>
                </>
              ) : item.tipo === "submenu" ? (
                <div className="submenu-container">
                  <input
                    type="number"
                    placeholder="Valor Total"
                    value={item.valorUnitario} // Usado como valor total para o submenu
                    onChange={(e) => handleItemChange(index, 'subItem', e.target.value, 'peca')}
                    min="0"
                    step="0.01"
                  />
                  <span>Total: R$ {item.total.toFixed(2)}</span>
                  <div className="sub-itens">
                    {item.filhos.map((filho, childIndex) => (
                      <label key={childIndex} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={item.subItensSelecionados[childIndex]}
                          onChange={() => handleSubItemToggle(index, childIndex, 'peca')}
                        />
                        {filho.nome}
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <input
                    type="number"
                    placeholder="Valor"
                    value={item.valorUnitario}
                    onChange={(e) => handleItemChange(index, 'valorUnitario', e.target.value, 'peca')}
                    min="0"
                    step="0.01"
                  />
                  <span>Total: R$ {item.total.toFixed(2)}</span>
                </>
              )}
            </div>
          ))}
          <div className="total-pecas">
            <strong>Total Peças: R$ {totalPecas.toFixed(2)}</strong>
          </div>
        </fieldset>

        {/* Seção de Serviços */}
        <fieldset className="form-section">
          <legend>Serviços</legend>
          {servicosOrcamento.map((servico, index) => (
            <div key={index} className="item-group">
              <label>{servico.nome}:</label>
              {servico.tipo === "submenu" ? (
                <div className="submenu-container">
                  <input
                    type="number"
                    placeholder="Valor Total"
                    value={servico.valorUnitario}
                    onChange={(e) => handleItemChange(index, 'subItem', e.target.value, 'servico')}
                    min="0"
                    step="0.01"
                  />
                  <span>Total: R$ {servico.total.toFixed(2)}</span>
                  <div className="sub-itens">
                    {servico.filhos.map((filho, childIndex) => (
                      <label key={childIndex} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={servico.subItensSelecionados[childIndex]}
                          onChange={() => handleSubItemToggle(index, childIndex, 'servico')}
                        />
                        {filho.nome}
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <input
                    type="number"
                    placeholder="Valor"
                    value={servico.valorUnitario}
                    onChange={(e) => handleItemChange(index, 'valorUnitario', e.target.value, 'servico')}
                    min="0"
                    step="0.01"
                  />
                  <span>Total: R$ {servico.total.toFixed(2)}</span>
                </>
              )}
            </div>
          ))}
          <div className="total-servicos">
            <strong>Total Serviços: R$ {totalServicos.toFixed(2)}</strong>
          </div>
        </fieldset>

        {/* Total Geral e Botão de Salvar */}
        <div className="total-geral">
          <strong>Valor Total Geral: R$ {valorTotalGeral.toFixed(2)}</strong>
        </div>

        <button type="submit" className="btn-submit">
          Salvar Orçamento Motor Completo
        </button>
      </form>
    </div>
  );
};

export default OrcamentoMotorCompleto;