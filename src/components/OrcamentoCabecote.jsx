return (
  <div className="orcamento-impresso-container">
    <div className="header-info">
      <div className="client-data">
        <p>
          Veículo:{" "}
          <input
            type="text"
            name="veiculo"
            value={dadosCliente.veiculo}
            onChange={handleDadosClienteChange}
          />
        </p>
        <p>
          OS:{" "}
          <input
            type="text"
            name="ordemServico"
            value={dadosCliente.ordemServico}
            onChange={handleDadosClienteChange}
          />
        </p>
        <p>
          Cliente:{" "}
          <input
            type="text"
            name="cliente"
            value={dadosCliente.cliente}
            onChange={handleDadosClienteChange}
          />
        </p>
        <p>
          Data:{" "}
          <input
            type="date"
            name="data"
            value={dadosCliente.data}
            onChange={handleDadosClienteChange}
          />
        </p>
      </div>
      <div className="logo-placeholder">
        <img src={logo} alt="Logo Zero Garage" />
      </div>
    </div>

    <h1 className="orcamento-impresso-title">ORÇAMENTO - CABEÇOTE</h1>

    <section className="section-pecas">
      <h2>Peças para Cabeçote</h2>
      <div className="pecas-columns">
        {[pecasCol1, pecasCol2].map((col, colIndex) => (
          <div key={colIndex} className="pecas-column">
            {col.map((item) => (
              <div key={item.nome} className="item-wrapper">
                <label>
                  <input
                    type="checkbox"
                    checked={
                      !!selecionados[item.nome] ||
                      (item.filhos &&
                        item.filhos.some((f) => subItensSelecionados[f.nome]))
                    }
                    onChange={() => handleItemToggle(item)}
                  />
                  {item.nome}
                </label>
                {selecionados[item.nome] && (
                  <input
                    type="number"
                    min="1"
                    placeholder="Qtd"
                    value={quantidades[item.nome] || 1}
                    onChange={(e) =>
                      handleQuantidadeChange(item.nome, e.target.value)
                    }
                    className="quantity-input"
                    style={{ width: 60, marginLeft: 8 }}
                  />
                )}
                {item.filhos &&
                  (!!selecionados[item.nome] ||
                    item.filhos.some((f) => subItensSelecionados[f.nome])) && (
                    <div className="sub-items-list">
                      {item.filhos.map((filho) => (
                        <label key={filho.nome} className="sub-item-label">
                          <input
                            type="checkbox"
                            checked={!!subItensSelecionados[filho.nome]}
                            onChange={() =>
                              handleSubItemToggle(filho, item)
                            }
                          />
                          {filho.nome}
                        </label>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="total-line-impresso">
        Valor total de Peças: R${" "}
        <input
          type="number"
          step="0.01"
          value={totalPecasDigitado === 0 ? "" : totalPecasDigitado}
          onChange={(e) =>
            setTotalPecasDigitado(parseFloat(e.target.value) || 0)
          }
          className="input-total-valor"
          placeholder="0.00"
        />
      </p>
    </section>

    <section className="section-servicos">
      <h2>Serviços de Retífica de Cabeçote</h2>
      <div className="servicos-grid">
        {servicosCabecote.map((item) => (
          <div key={item.nome} className="item-wrapper">
            <label>
              <input
                type="checkbox"
                checked={
                  !!servicosSelecionados[item.nome] ||
                  (item.filhos &&
                    item.filhos.some(
                      (f) => subServicosSelecionados[f.nome]
                    ))
                }
                onChange={() => handleItemToggle(item, true)}
              />
              {item.nome}
            </label>
            {servicosSelecionados[item.nome] && (
              <input
                type="number"
                min="1"
                placeholder="Qtd"
                value={quantidades[item.nome] || 1}
                onChange={(e) =>
                  handleQuantidadeChange(item.nome, e.target.value)
                }
                className="quantity-input"
                style={{ width: 60, marginLeft: 8 }}
              />
            )}
            {item.filhos &&
              (!!servicosSelecionados[item.nome] ||
                item.filhos.some((f) => subServicosSelecionados[f.nome])) && (
                <div className="sub-items-list">
                  {item.filhos.map((filho) => (
                    <label key={filho.nome} className="sub-item-label">
                      <input
                        type="checkbox"
                        checked={!!subServicosSelecionados[filho.nome]}
                        onChange={() =>
                          handleSubItemToggle(filho, item, true)
                        }
                      />
                      {filho.nome}
                    </label>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
      <p className="total-line-impresso">
        Valor total de Serviços: R${" "}
        <input
          type="number"
          step="0.01"
          value={totalServicosDigitado === 0 ? "" : totalServicosDigitado}
          onChange={(e) =>
            setTotalServicosDigitado(parseFloat(e.target.value) || 0)
          }
          className="input-total-valor"
          placeholder="0.00"
        />
      </p>
    </section>

    <p className="total-line-impresso">
      Valor total de Mão de Obra Mecânica: R${" "}
      <input
        type="number"
        step="0.01"
        value={maoDeObraMecanicaDigitado === 0 ? "" : maoDeObraMecanicaDigitado}
        onChange={(e) =>
          setMaoDeObraMecanicaDigitado(parseFloat(e.target.value) || 0)
        }
        className="input-total-valor"
        placeholder="0.00"
      />
    </p>

    <p className="total-geral-impresso">
      TOTAL GERAL: R${" "}
      <input
        type="number"
        step="0.01"
        value={totalGeralDigitado.toFixed(2)}
        onChange={(e) =>
          setTotalGeralDigitado(parseFloat(e.target.value) || 0)
        }
        className="input-total-final"
        placeholder="0.00"
      />
    </p>

    <p className="form-pagamento">
      (Forma de pagamento: Pix, Débito e Crédito em até 10x sem juros no cartão)
    </p>

    <div className="orcamento-buttons-container">
      <button onClick={salvarGoogleSheets} className="action-btn">
        Salvar no Google Sheets
      </button>
      <button onClick={exportarExcel} className="action-btn">
        Exportar Excel
      </button>
      <button onClick={exportarPDF} className="action-btn">
        Exportar PDF
      </button>
    </div>
  </div>
);
