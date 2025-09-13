import { useEffect, useState } from 'react';
import axios from 'axios';

function OrcamentoComImagens({ orcamentoId }) {
  const [orcamento, setOrcamento] = useState(null);
  const [imagens, setImagens] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orcamentoRes = await axios.get(`https://api-orcamentos.com/api/orcamentos/${orcamentoId}`);
        setOrcamento(orcamentoRes.data);

        const imagensRes = await axios.get(`https://api-upload.com/api/upload/${orcamentoId}`);
        setImagens(imagensRes.data);
      } catch (err) {
        console.error('Erro ao carregar orçamento e imagens', err);
      }
    };

    fetchData();
  }, [orcamentoId]);

  if (!orcamento) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Orçamento: {orcamento.cliente}</h2>
      <p>Tipo: {orcamento.tipo}</p>
      <p>OS: {orcamento.ordemServico}</p>

      <div>
        <h3>Imagens</h3>
        {imagens.length === 0 ? (
          <p>Nenhuma imagem enviada</p>
        ) : (
          imagens.map((img, index) => (
            <img key={index} src={img.url} alt={`Orçamento ${orcamentoId}`} width={200} />
          ))
        )}
      </div>
    </div>
  );
}

export default OrcamentoComImagens;
