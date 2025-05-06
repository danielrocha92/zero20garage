// ManutencaoPreventiva.jsx
import React from 'react';
import DynamicHeader from '../components/DynamicHeader';
import WhatsAppButton from '../components/WhatsAppButton';
import './Mp.css'; // Importe o CSS atualizado

function Mp() {
    const messages = [
        {
            title: 'Manutenção Preventiva',
            subtitle: 'Mantenha seu motor em ótimas condições',
        },
        {
            title: 'Dicas e Truques',
            subtitle: 'Aprenda a evitar problemas futuros',
        },
    ];

    return (
        <div className="page-claro">
            <DynamicHeader messages={messages} />
            <WhatsAppButton />

            <div className="container-claro">
                <h2 className="title">
                    Manutenção Preventiva
                </h2>
                <p className="paragraph">
                    Manutenção regular para evitar problemas futuros e prolongar a vida útil do motor.
                </p>
                <section className="section">
                <h3 className="subtitle">
                    Por que fazer manutenção preventiva?
                </h3>
                <p className="paragraph">
                    A manutenção preventiva é essencial para garantir o bom funcionamento do seu veículo e evitar surpresas desagradáveis. Com a manutenção regular, você pode identificar e corrigir problemas antes que eles se tornem grandes e caros.
                </p>

                <h3 className="subtitle">
                    O que inclui a manutenção preventiva?
                </h3>
                <ul className="section-list">
                    <li>Troca de óleo e filtros</li>
                    <li>Verificação e substituição de fluidos</li>
                    <li>Inspeção de freios</li>
                    <li>Verificação de pneus</li>
                    <li>Inspeção de suspensão</li>
                    <li>Verificação de sistema de arrefecimento</li>
                </ul>

                <h3 className="subtitle">
                    Agende sua manutenção preventiva
                </h3>
                <p className="paragraph">
                    Não espere que os problemas apareçam. Agende agora mesmo a manutenção preventiva do seu veículo e garanta a sua segurança e tranquilidade.
                </p>
                <a href="/orcamento"
                className="button">
                    Solicite um Orçamento
                </a>
                </section>
            </div>
        </div>
    );
}

export default Mp;
