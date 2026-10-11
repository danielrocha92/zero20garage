
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const LOGO_GARAGE = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429488/imagem-og_trb3ws.jpg';
const LOGO_OLEOS = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1791741485/92344bf9-f620-4e74-a498-28f06ba2a12e.png';

// Register fonts if needed, sticking to standard Helvetica for now to ensure compatibility
// Font.register({ family: 'Roboto', src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2' });

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
    height: 80,
  },
  logo: {
    width: 100,
    height: 80,
    objectFit: 'contain',
    position: 'absolute',
    right: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    padding: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    width: 100,
  },
  value: {
    flex: 1,
  },
  textBlock: {
    textAlign: 'justify',
    marginBottom: 10,
  },
  columns: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  column: {
    width: '50%',
    paddingRight: 10,
  },
  listItem: {
    marginBottom: 2,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 5,
  },
  tableCellHeader: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  tableCell: {
    fontSize: 10,
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 8,
    color: '#666',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  planoPage: {
    padding: 20,
    fontSize: 9,
    fontFamily: 'Helvetica',
  },
  planoTopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    paddingHorizontal: 4,
  },
  planoLogo: {
    width: 72,
    height: 46,
    objectFit: 'contain',
  },
  planoTitle: {
    color: '#d71920',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 6,
  },
  via: {
    borderWidth: 1,
    borderColor: '#292929',
    borderStyle: 'solid',
    padding: 8,
    marginBottom: 14,
  },
  viaHeader: {
    borderBottomWidth: 2,
    borderBottomColor: '#d71920',
    borderBottomStyle: 'solid',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 4,
    marginBottom: 6,
  },
  viaName: {
    color: '#d71920',
    fontSize: 10,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  infoItem: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    borderBottomStyle: 'solid',
    paddingBottom: 2,
    marginRight: 8,
  },
  infoLabel: {
    fontWeight: 'bold',
    fontSize: 7,
  },
  servicesBox: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderStyle: 'solid',
    padding: 5,
    marginTop: 3,
    marginBottom: 6,
  },
  servicesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 2,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
  },
  serviceText: {
    fontSize: 7.5,
  },
  servicesObs: {
    marginTop: 4,
    fontSize: 7.5,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 3,
  },
  reviews: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  review: {
    borderWidth: 1,
    borderColor: '#707070',
    borderStyle: 'solid',
    width: '32%',
    minHeight: 85,
    padding: 5,
  },
  reviewTitle: {
    backgroundColor: '#ededed',
    fontSize: 7,
    fontWeight: 'bold',
    margin: -5,
    marginBottom: 5,
    padding: 3,
  },
  reviewText: {
    fontSize: 7.5,
    marginBottom: 4,
  },
  signatureContainer: {
    marginTop: 4,
  },
  signatureLabel: {
    fontSize: 6.5,
    fontWeight: 'bold',
  },
  signatureSpace: {
    height: 25,
  },
  planoFooter: {
    marginTop: 4,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  planoFooterAviso: {
    fontSize: 6.5,
    color: '#333',
    textAlign: 'justify',
    lineHeight: 1.3,
    marginBottom: 6,
  },
  planoAssinaturaClienteWrapper: {
    alignItems: 'center',
    marginTop: 4,
  },
  planoLinhaAssinatura: {
    width: 230,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    marginBottom: 3,
  },
  planoTextoAssinatura: {
    fontSize: 7,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const TermoGarantiaPDF = ({ data }) => {
  const {
    cliente,
    veiculo,
    placa,
    ordemServico,
    dataEntrega,
    garantiaMeses,
    pecas,
    servicos,
    valores,
    planoRevisao,
  } = data;

  // Split parts into two columns
  const midPoint = Math.ceil(pecas.length / 2);
  const pecasCol1 = pecas.slice(0, midPoint);
  const pecasCol2 = pecas.slice(midPoint);

  // Calculate dynamic height
  // Base height for static content (Header, Footer, Titles, Texts, Table, etc.)
  // Increased base height to accomodate relative footer and spacing
  const A4_WIDTH = 595.28;
  const baseHeight = 1200;
  const itemHeight = 30; // Adjusted estimate per item line

  const partRows = Math.ceil(pecas.length / 2);
  const serviceRows = servicos.length;

  const contentHeight = baseHeight + (partRows * itemHeight) + (serviceRows * itemHeight) + 200;
  const revisoes = planoRevisao?.revisoes || [];
  const tipoServico = planoRevisao?.tipoServico || [];
  const veiculoTexto = typeof veiculo === 'string' ? veiculo : veiculo?.descricao || '';
  const servicoMarcado = (nome) => tipoServico.some((item) => (
    String(item).toLowerCase().includes(nome.toLowerCase())
  ));

  const renderPlanoVia = (nome) => (
    <View style={styles.via}>
      <View style={styles.viaHeader}>
        <Text style={{ fontWeight: 'bold' }}>ZER0 20 GARAGE</Text>
        <Text style={styles.viaName}>{nome}</Text>
      </View>
      <View style={styles.infoRow}>
        <View style={styles.infoItem}><Text><Text style={styles.infoLabel}>CLIENTE: </Text>{cliente || ''}</Text></View>
        <View style={styles.infoItem}><Text><Text style={styles.infoLabel}>OS Nº: </Text>{ordemServico || ''}</Text></View>
      </View>
      <View style={styles.infoRow}>
        <View style={styles.infoItem}><Text><Text style={styles.infoLabel}>VEÍCULO: </Text>{veiculoTexto || ''}</Text></View>
        <View style={styles.infoItem}><Text><Text style={styles.infoLabel}>PLACA: </Text>{placa || ''}</Text></View>
        <View style={styles.infoItem}><Text><Text style={styles.infoLabel}>KM DE ENTREGA: </Text>{planoRevisao?.kmEntrega || ''}</Text></View>
      </View>
      <View style={styles.servicesBox}>
        <Text style={styles.infoLabel}>SERVIÇO REALIZADO</Text>
        <View style={styles.servicesRow}>
          {['Motor Completo', 'Motor Parcial', 'Cabeçote', 'Serviços Diversos'].map((servico) => (
            <View key={servico} style={styles.serviceItem}>
              <Text style={styles.serviceText}>
                {servicoMarcado(servico) ? '☑' : '☐'} {servico}
              </Text>
            </View>
          ))}
        </View>
        <Text style={styles.servicesObs}>Obs: {planoRevisao?.observacoes || '____________________________________________________________________'}</Text>
      </View>
      <View style={styles.reviews}>
        {['1ª REVISÃO/TROCA DE ÓLEO', '2ª REVISÃO/TROCA DE ÓLEO', '3ª REVISÃO/TROCA DE ÓLEO'].map((titulo, index) => {
          const revisao = revisoes[index] || {};
          return (
            <View key={titulo} style={styles.review}>
              <Text style={styles.reviewTitle}>{titulo}</Text>
              <Text style={styles.reviewText}>KM Previsto: {revisao.kmPrevisto || revisao.km_alvo || ''}</Text>
              <Text style={styles.reviewText}>Valor (R$): {revisao.valor || ''}</Text>
              <View style={styles.signatureContainer}>
                <Text style={styles.signatureLabel}>ASSINATURA/CARIMBO:</Text>
                <View style={styles.signatureSpace} />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );

  return (
    <Document>
      <Page size={[A4_WIDTH, contentHeight]} style={styles.page}>

        {/* Header */}
        <View style={styles.header}>
            <Text style={styles.title}>CERTIFICADO DE GARANTIA</Text>
            <Image src="/logo-garantia.jpg" style={styles.logo} />
        </View>

        {/* Client Info */}
        <View style={styles.section}>
            <View style={styles.row}>
                <Text><Text style={{fontWeight: 'bold'}}>Cliente:</Text> {cliente}</Text>
            </View>
            <View style={styles.row}>
                <Text><Text style={{fontWeight: 'bold'}}>Data de entrega:</Text> {dataEntrega}</Text>
                <Text><Text style={{fontWeight: 'bold'}}>Ordem do Serviço:</Text> {ordemServico}</Text>
                <Text><Text style={{fontWeight: 'bold'}}>Placa:</Text> {placa}</Text>
            </View>
        </View>

        {/* 1. Description */}
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Descrição do Serviço:</Text>
            <Text style={styles.textBlock}>
                Realizamos a retífica do motor do veículo <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>{veiculo ? veiculo.trim() : ''}</Text>, conforme solicitado. Durante o processo, foram trocados os seguintes itens:
            </Text>
        </View>

        {/* Parts List */}
        <View style={styles.section}>
            <Text style={{fontWeight: 'bold', marginBottom: 5}}>Peças:</Text>
            <View style={styles.columns}>
                <View style={styles.column}>
                    {pecasCol1.map((item, i) => (
                        <Text key={i} style={styles.listItem}>• {item}</Text>
                    ))}
                </View>
                <View style={styles.column}>
                    {pecasCol2.map((item, i) => (
                        <Text key={i} style={styles.listItem}>• {item}</Text>
                    ))}
                </View>
            </View>
        </View>

        {/* Services List */}
        <View style={styles.section}>
            <Text style={{fontWeight: 'bold', marginBottom: 5}}>Serviços:</Text>
            {servicos.map((item, i) => (
                <Text key={i} style={styles.listItem}>• {item}</Text>
            ))}
        </View>

        {/* 2. Values */}
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Valores:</Text>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}><Text style={styles.tableCellHeader}>DESCRIÇÃO</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCellHeader}>VALOR</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>Peças</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{valores.totalPecas}</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>Serviço de Retífica</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{valores.totalServicos}</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>Mão de obra mecânica</Text></View>
                    <View style={styles.tableCol}><Text style={styles.tableCell}>{valores.maoDeObra}</Text></View>
                </View>
                <View style={styles.tableRow}>
                    <View style={{...styles.tableCol, backgroundColor: '#eee'}}><Text style={{...styles.tableCellHeader, fontWeight: 'bold'}}>Total Pago</Text></View>
                    <View style={{...styles.tableCol, backgroundColor: '#eee'}}><Text style={{...styles.tableCellHeader, fontWeight: 'bold'}}>{valores.totalGeral}</Text></View>
                </View>
            </View>
        </View>

         {/* 3. Conditions */}
         <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Condições de Garantia:</Text>
            <Text style={styles.textBlock}>
                Este serviço possui uma garantia de {garantiaMeses} ({
                    (() => {
                        const n = parseInt(garantiaMeses, 10);
                        const map = {
                            1: 'um', 2: 'dois', 3: 'três', 4: 'quatro', 5: 'cinco',
                            6: 'seis', 7: 'sete', 8: 'oito', 9: 'nove', 10: 'dez',
                            11: 'onze', 12: 'doze'
                        };
                        return map[n] || n;
                    })()
                }) meses, contada a partir da data da entrega. A referida garantia abrange exclusivamente as peças resultantes e os serviços realizados no âmbito da retífica, conforme descrito no item 1.
            </Text>
        </View>

         {/* 4. Exceptions */}
         <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Exceções à Garantia:</Text>
            <Text style={styles.listItem}>• Peças que não tenham sido objeto de substituição não serão cobertas.</Text>
            <Text style={styles.listItem}>• Eventuais novos defeitos ou falhas que venham a surgir no motor após a realização da retífica serão considerados como novos serviços, não incluídos na cobertura.</Text>
            <Text style={styles.listItem}>• A garantia será válida somente se o veículo for mantido e utilizado conforme as orientações fornecidas pela Zero 20 Garage, incluindo troca de óleo, utilização de combustíveis adequados e respeito ao intervalo de manutenção recomendado.</Text>
            <Text style={styles.listItem}>• Em casos excepcionais, se o veículo apresentar falhas, o cliente poderá solicitar a análise do caso.</Text>
            <Text style={styles.listItem}>• Não haverá reembolso de peças já instaladas no veículo, sob nenhuma circunstância.</Text>
            <Text style={styles.listItem}>• Clientes inadimplentes não terão direito à garantia. Todos os pagamentos pendentes devem ser regularizados antes de qualquer solicitação de garantia.</Text>
             <Text style={styles.textBlock}>
                Para acionar a garantia, o cliente deverá entrar em contato com a Zero 20 Garage dentro do período estipulado e seguir as orientações para análise do problema.
            </Text>
            <Text style={{textAlign: 'center', marginTop: 10}}>
                Agradecemos a confiança em nossos serviços! Para qualquer dúvida ou necessidade de assistência, entre em contato conosco.
            </Text>
        </View>


        {/* Footer */}
        <View style={styles.footer} wrap={false}>
            <Text>Zero 20 Garage</Text>
            <Text>(11) 94109-7471 – zero20garage@hotmail.com</Text>
            <Text>Avenida Laura Gomes Hannickel, 153 – Capoavinha, Mairiporã/SP</Text>
        </View>

      </Page>
      <Page size="A4" style={styles.planoPage}>
        <View style={styles.planoTopHeader}>
          <Image src={LOGO_GARAGE} style={styles.planoLogo} />
          <Text style={styles.planoTitle}>PLANO DE REVISÃO/TROCA DE ÓLEO</Text>
          <Image src={LOGO_OLEOS} style={styles.planoLogo} />
        </View>
        {renderPlanoVia('VIA DO CLIENTE')}
        {renderPlanoVia('VIA DA OFICINA')}
        <View style={styles.planoFooter}>
          <Text style={styles.planoFooterAviso}>
            IMPORTANTE: As revisões preventivas devem ser realizadas estritamente nos prazos e quilometragens estipulados acima para a validação contínua da garantia.
          </Text>
          <View style={styles.planoAssinaturaClienteWrapper}>
            <View style={styles.planoLinhaAssinatura} />
            <Text style={styles.planoTextoAssinatura}>ASSINATURA DO CLIENTE</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default TermoGarantiaPDF;
