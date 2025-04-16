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
        <div className="page-container">
            <DynamicHeader messages={messages} />
            <WhatsAppButton />

            <section className="content-section">
                <h2 className="section-title">Manutenção Preventiva</h2>
                <p className="section-paragraph">
                    Manutenção regular para evitar problemas futuros e prolongar a vida útil do motor.
                </p>

                <h3 className="section-subtitle">Por que fazer manutenção preventiva?</h3>
                <p className="section-paragraph">
                    A manutenção preventiva é essencial para garantir o bom funcionamento do seu veículo e evitar surpresas desagradáveis. Com a manutenção regular, você pode identificar e corrigir problemas antes que eles se tornem grandes e caros.
                </p>

                <h3 className="section-subtitle">O que inclui a manutenção preventiva?</h3>
                <ul className="section-list">
                    <li>Troca de óleo e filtros</li>
                    <li>Verificação e substituição de fluidos</li>
                    <li>Inspeção de freios</li>
                    <li>Verificação de pneus</li>
                    <li>Inspeção de suspensão</li>
                    <li>Verificação de sistema de arrefecimento</li>
                </ul>

                <h3 className="section-subtitle">Agende sua manutenção preventiva</h3>
                <p className="section-paragraph">
                    Não espere que os problemas apareçam. Agende agora mesmo a manutenção preventiva do seu veículo e garanta a sua segurança e tranquilidade.
                </p>
                <a href="/orcamento" className="cta-button">Solicite um Orçamento</a>
            </section>
        </div>
    );
}

export default Mp;