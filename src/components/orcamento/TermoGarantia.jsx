
import React, { useState } from 'react';
import axios from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TermoGarantiaPDF from './TermoGarantiaPDF';
import styles from '../../styles/TermoGarantia.module.css';

const API_BASE_URL = 'https://api-orcamento-n49u.onrender.com';

const TermoGarantia = () => {
  // Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);

  // Selected Data State
  const [selectedOS, setSelectedOS] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    cliente: '',
    veiculo: '',
    placa: '',
    ordemServico: '',
    dataEntrega: new Date().toLocaleDateString('pt-BR'),
    garantiaMeses: '3',
    totalPecas: '',
    totalServicos: '',
    maoDeObra: '',
    totalGeral: '',
  });

  const [partList, setPartList] = useState([]);
  const [serviceList, setServiceList] = useState([]);

  // Extras Inputs
  const [newPart, setNewPart] = useState('');
  const [newService, setNewService] = useState('');

  const authToken = localStorage.getItem('authToken');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    setLoading(true);
    setSearchResults([]);
    setSelectedOS(null);

    try {
        // Fetching recent items and filtering locally as a fallback
        // Ideally the API would support ?search=...
        const res = await axios.get(`${API_BASE_URL}/api/orcamentos?limit=100`, {
            headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
        });

        const allOrcamentos = res.data.orcamentos || [];
        const term = searchTerm.toLowerCase();

        const filtered = allOrcamentos.filter(orc =>
            (orc.cliente && orc.cliente.toLowerCase().includes(term)) ||
            (orc.placa && orc.placa.toLowerCase().includes(term)) ||
            (orc.ordemServico && String(orc.ordemServico).includes(term)) ||
            (orc.veiculo && orc.veiculo.toLowerCase().includes(term))
        );

        setSearchResults(filtered);
        setIsSearching(true);
    } catch (error) {
        console.error("Error searching:", error);
        alert("Erro ao buscar orçamentos. Verifique sua conexão ou login.");
    } finally {
        setLoading(false);
    }
  };

  const selectOS = (os) => {
    setSelectedOS(os);
    setIsSearching(false);

    // Populate Form
    setFormData({
        cliente: os.cliente || '',
        veiculo: os.veiculo || '',
        placa: os.placa || '',
        ordemServico: os.ordemServico || os.id || '', // Fallback to ID if OS number specific field is missing
        dataEntrega: new Date().toLocaleDateString('pt-BR'),
        garantiaMeses: '3',
        totalPecas: formatCurrency(os.valorTotalPecas),
        totalServicos: formatCurrency(os.valorTotalServicos),
        maoDeObra: formatCurrency(os.totalMaoDeObra),
        totalGeral: formatCurrency(os.valorTotal),
    });

    // Populate Lists (Assuming they are arrays of strings)
    setPartList((os.pecasSelecionadas || []).map((p, i) => ({ id: i, text: p })));
    setServiceList((os.servicosSelecionados || os.servicosSelecionadas || []).map((s, i) => ({ id: i, text: s })));
  };

  const formatCurrency = (val) => {
    if (val === undefined || val === null) return 'R$ 0,00';
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addItem = (type) => {
    if (type === 'part' && newPart.trim()) {
        setPartList(prev => [...prev, { id: Date.now(), text: newPart }]);
        setNewPart('');
    } else if (type === 'service' && newService.trim()) {
        setServiceList(prev => [...prev, { id: Date.now(), text: newService }]);
        setNewService('');
    }
  };

  const removeItem = (type, id) => {
    if (type === 'part') {
        setPartList(prev => prev.filter(item => item.id !== id));
    } else {
        setServiceList(prev => prev.filter(item => item.id !== id));
    }
  };

  // Prepare data for PDF
  const pdfData = {
    ...formData,
    pecas: partList.map(p => p.text),
    servicos: serviceList.map(s => s.text),
    valores: {
        totalPecas: formData.totalPecas,
        totalServicos: formData.totalServicos,
        maoDeObra: formData.maoDeObra,
        totalGeral: formData.totalGeral
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Módulo de Termo de Garantia</h1>
        <p className={styles.subtitle}>Gerador de Certificados de Garantia PDF</p>
      </header>

      {/* Search Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Selecionar Ordem de Serviço</h2>
        <form onSubmit={handleSearch} className={styles.searchBox}>
            <div className={styles.formGroup} style={{marginBottom: 0}}>
                <label>Buscar por Cliente, Placa ou Nº OS:</label>
                <input
                    type="text"
                    className={styles.input}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Ex: João, ABC-1234, 105"
                />
            </div>
            <button type="submit" className={styles.button} disabled={loading}>
                {loading ? 'Buscando...' : 'Buscar'}
            </button>
        </form>

        {isSearching && searchResults.length === 0 && (
            <p>Nenhum orçamento encontrado.</p>
        )}

        {isSearching && searchResults.length > 0 && (
            <ul className={styles.itemList} style={{marginTop: '20px'}}>
                {searchResults.map(os => (
                    <li key={os.id || os._id} className={styles.itemListItem}>
                        <span>
                            <strong>OS: {os.ordemServico}</strong> - {os.cliente} ({os.veiculo} - {os.placa})
                        </span>
                        <button className={styles.button} onClick={() => selectOS(os)}>
                            Selecionar
                        </button>
                    </li>
                ))}
            </ul>
        )}
      </section>

      {selectedOS && (
        <>
            {/* Form Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>2. Editar Detalhes da Garantia</h2>

                <div className={styles.grid}>
                    <div className={styles.formGroup}>
                        <label>Cliente:</label>
                        <input name="cliente" value={formData.cliente} onChange={handleInputChange} className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Ordem Serviço:</label>
                        <input name="ordemServico" value={formData.ordemServico} onChange={handleInputChange} className={styles.input} readOnly />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Veículo:</label>
                        <input name="veiculo" value={formData.veiculo} onChange={handleInputChange} className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Placa:</label>
                        <input name="placa" value={formData.placa} onChange={handleInputChange} className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Data de Entrega:</label>
                        <input name="dataEntrega" value={formData.dataEntrega} onChange={handleInputChange} className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Garantia (Meses):</label>
                        <input type="number" name="garantiaMeses" value={formData.garantiaMeses} onChange={handleInputChange} className={styles.input} />
                    </div>
                </div>
            </section>

            {/* Lists Section */}
            <div className={styles.grid}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Peças ({partList.length})</h2>
                    <ul className={styles.itemList}>
                        {partList.map(item => (
                            <li key={item.id} className={styles.itemListItem}>
                                {item.text}
                                <button className={styles.removeBtn} onClick={() => removeItem('part', item.id)}>&times;</button>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.formGroup} style={{marginTop: '15px'}}>
                        <input
                            placeholder="Adicionar peça extra..."
                            className={styles.input}
                            value={newPart}
                            onChange={(e) => setNewPart(e.target.value)}
                        />
                        <button className={`${styles.button} ${styles.buttonAdd}`} onClick={() => addItem('part')}>Adicionar Item</button>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Serviços ({serviceList.length})</h2>
                    <ul className={styles.itemList}>
                        {serviceList.map(item => (
                            <li key={item.id} className={styles.itemListItem}>
                                {item.text}
                                <button className={styles.removeBtn} onClick={() => removeItem('service', item.id)}>&times;</button>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.formGroup} style={{marginTop: '15px'}}>
                        <input
                            placeholder="Adicionar serviço extra..."
                            className={styles.input}
                            value={newService}
                            onChange={(e) => setNewService(e.target.value)}
                        />
                        <button className={`${styles.button} ${styles.buttonAdd}`} onClick={() => addItem('service')}>Adicionar Item</button>
                    </div>
                </section>
            </div>

            {/* Values Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Valores Finais</h2>
                <div className={styles.grid}>
                     <div className={styles.formGroup}>
                        <label>Total Peças:</label>
                        <input name="totalPecas" value={formData.totalPecas} onChange={handleInputChange} className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Total Serviços:</label>
                        <input name="totalServicos" value={formData.totalServicos} onChange={handleInputChange} className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Mão de Obra:</label>
                        <input name="maoDeObra" value={formData.maoDeObra} onChange={handleInputChange} className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Total Geral:</label>
                        <input name="totalGeral" value={formData.totalGeral} onChange={handleInputChange} className={styles.input} />
                    </div>
                </div>
            </section>

            {/* Actions */}
            <div className={styles.actions}>
                <PDFDownloadLink document={<TermoGarantiaPDF data={pdfData} />} fileName={`Garantia_${formData.cliente}_${formData.ordemServico}.pdf`}>
                    {({ blob, url, loading, error }) =>
                        loading ? 'Gerando PDF...' : <button className={styles.button}>Baixar Certificado de Garantia (PDF)</button>
                    }
                </PDFDownloadLink>
            </div>
        </>
      )}
    </div>
  );
};

export default TermoGarantia;
