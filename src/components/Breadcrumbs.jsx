import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.css';

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // ✅ Se for a Home, não renderiza nada
  if (location.pathname === '/') {
    return null;
  }

  const labelMap = {
    home: 'Home',
    sobre: 'Sobre',
    servicos: 'Serviços',
    orcamento: 'Orçamento',
    contato: 'Contato',
    blog: 'Blog',
    footer: 'Rodapé',
    'tp': 'Troca de Peças',
    'td': 'Troca de Discos',
    'mp': 'Manutenção Preventiva',
    'dp': 'Diagnóstico Preciso',
    'cp': 'Cuidados com Pistão',
    usinagem: 'Usinagem',
    'montagem-teste': 'Montagem e Teste',
    diagnostico: 'Diagnóstico',
    desmontagem: 'Desmontagem',
    trocas: 'Trocas e Devoluções',
    'trabalhe-conosco': 'Trabalhe Conosco',
    termos: 'Termos de Uso',
    politica: 'Política de Privacidade',
    notfound: 'Página Não Encontrada',
    faq: 'Perguntas Frequentes',
    'vale-a-pena-retificar': 'Vale a Pena Retificar?',
    'trocar-motor': 'Trocar o Motor',
    'sinais-retifica': 'Sinais de que o Motor Precisa de Retífica',
    'retifica-parcial-ou-completa': 'Retífica Parcial ou Completa?',
    'manutencao-de-motores': 'Manutenção de Motores',
    'custo-retifica': 'Custo de uma Retífica',
    '404': 'Página Não Encontrada',
  };

  const formatLabel = (slug) => {
    const lowerSlug = slug.toLowerCase();
    if (labelMap[lowerSlug]) return labelMap[lowerSlug];

    return slug
      .split('-')
      .map(word => word.charAt(0).toLocaleUpperCase('pt-BR') + word.slice(1))
      .join(' ');
  };

  return (
    <nav className="breadcrumbs" aria-label="breadcrumb">
      <ul>
        <li>
          <Link translate="no" to="/">Home</Link>
        </li>

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const label = formatLabel(value);

          return isLast ? (
            <li translate="no" key={to} aria-current="page">
              {label}
            </li>
          ) : (
            <li key={to}>
              <Link translate="no" to={to}>{label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Breadcrumbs;
