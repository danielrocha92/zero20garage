import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import DynamicHeader from '../../components/ui/DynamicHeader';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ContatoCta from '../../components/ui/ContatoCta';
import '../../styles/Institucional.css';

const TesteFuncionamento = () => {
  const messages = [{ title: 'Teste de Funcionamento', subtitle: 'Rodagem e garantia de qualidade' }];
  const LAST_UPDATED = '02 de dezembro de 2025';

  return (
    <div className="institucional-page">
      <DynamicHeader messages={messages} />
      <Helmet>
        <title>Testes de Rodagem e Liberação do Veículo | Zero 20 Garage</title>
        <meta name="description" content="Testes finais de rodagem e funcionamento do motor. Garantia de qualidade e segurança na entrega do seu veículo em Mairiporã." />
        <link rel="canonical" href="https://zero20garage.com.br/Home/Teste-de-Funcionamento-e-Rodagem-do-Motor-do-Veículo" />
      </Helmet>
      <Breadcrumbs />
      <div className="institucional-container">
        <section className="institucional-section">
          <h2 className="institucional-title">9. Teste de Funcionamento e Rodagem (Rodagem e Entrega)</h2>
          <p className="institucional-paragraph">
            A fase final envolve testes indispensáveis para componentes que só podem ser verificados em operação, como os sistemas de arrefecimento e lubrificação, que são submetidos a aumento de temperatura e pressão. Os testes de funcionamento e rodagem comprovam a qualidade do serviço prestado, identificam e corrigem possíveis problemas, e garantem a liberação do veículo pronto para o uso seguro.
          </p>
        </section>
        <section className="institucional-section"><ContatoCta /></section>
        <div className="institucional-last-updated"><p className="institucional-acknowledgment">Página atualizada em: {LAST_UPDATED}</p></div>
        <div className="institucional-section"><Link to="/" className="home-button-voltar">← Voltar para Home</Link></div>
      </div>
    </div>
  );
};

export default TesteFuncionamento;
