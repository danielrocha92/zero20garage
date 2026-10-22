
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const LOGO_GARAGE = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429488/imagem-og_trb3ws.jpg';
const LOGO_OLEOS = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1791741485/92344bf9-f620-4e74-a498-28f06ba2a12e.png';
// Register fonts if needed, sticking to standard Helvetica for now to ensure compatibility
// Font.register({ family: 'Roboto', src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2' });

const styles = StyleSheet.create({
  page: {
    padding: 22,
    fontSize: 7.5,
    fontFamily: 'Helvetica',
    lineHeight: 1.15,
  },
  certificateContent: {
    width: '100%',
    transformOriginX: 0,
    transformOriginY: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
    height: 52,
  },
  logo: {
    width: 68,
    height: 52,
    objectFit: 'contain',
    position: 'absolute',
    right: 0,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 3,
    marginTop: 5,
    backgroundColor: '#f0f0f0',
    padding: 3,
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
    marginBottom: 4,
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
    marginBottom: 1,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 3,
  },
  tableCellHeader: {
    fontWeight: 'bold',
    fontSize: 7.5,
  },
  tableCell: {
    fontSize: 7.5,
  },
  contactFooter: {
    marginTop: 8,
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  contactName: {
    fontSize: 7,
    lineHeight: 1.25,
    color: '#444',
    marginBottom: 4,
  },
  contactDetails: {
    fontSize: 6.5,
    lineHeight: 1.35,
    color: '#777',
  },
  planoPage: {
    padding: 23,
    fontSize: 9,
    fontFamily: 'Helvetica',
    flexDirection: 'column',
  },
  planoContent: {
    width: '100%',
    flexGrow: 1,
    flexDirection: 'column',
    transformOriginX: 0,
    transformOriginY: 0,
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
    height: 39,
    objectFit: 'contain',
  },
  planoTitle: {
    color: '#d71920',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 6,
  },
  planoDataEntrega: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    borderBottomStyle: 'solid',
    paddingBottom: 2,
    marginRight: 8,
  },
  via: {
    borderWidth: 1,
    borderColor: '#292929',
    borderStyle: 'solid',
    padding: 14,
    marginBottom: 42.5,
  },
  viaLast: { marginBottom: 0 },
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
  viaGarageName: { fontWeight: 'bold' },
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
  serviceCheckbox: {
    width: 9,
    height: 9,
    borderWidth: 1,
    borderColor: '#222',
    borderStyle: 'solid',
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceCheckboxMark: {
    fontSize: 8,
    lineHeight: 1,
    fontWeight: 'bold',
  },
  serviceText: {
    fontSize: 9.6,
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
    minHeight: 75,
    padding: 5,
  },
  reviewTitle: {
    backgroundColor: '#ededed',
    fontSize: 8.4,
    fontWeight: 'bold',
    margin: -5,
    marginBottom: 5,
    padding: 3,
  },
  reviewText: {
    fontSize: 9,
    marginBottom: 4,
  },
  signatureContainer: {
    marginTop: 4,
  },
  signatureLabel: {
    fontSize: 7.8,
    fontWeight: 'bold',
  },
  signatureSpace: {
    height: 38,
  },
  planoFooter: {
    marginTop: 'auto',
    paddingTop: 4,
  },
  planoFooterAviso: {
    fontSize: 7,
    color: '#333',
    textAlign: 'justify',
    lineHeight: 1.15,
    marginBottom: 6,
  },
  planoFooterAvisoDestaque: { fontWeight: 'bold' },
  planoAssinaturaClienteWrapper: {
    alignItems: 'center',
    marginTop: 3.5,
  },
  planoLinhaAssinatura: {
    width: 191.25,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    marginBottom: 3,
  },
  planoTextoAssinatura: {
    fontSize: 7,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  planoPageSignatureSpacer: { height: 28 },
});

const RodapeContato = () => (
  <View style={styles.contactFooter}>
    <Text style={styles.contactName}>Zero 20 Garage</Text>
    <Text style={styles.contactDetails}>(11) 94109-7471 – zero20garage@hotmail.com</Text>
    <Text style={styles.contactDetails}>Avenida Laura Gomes Hannickel, 153 – Capoavinha, Mairiporã/SP</Text>
  </View>
);

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

  const revisoes = planoRevisao?.revisoes || [];
  const tipoServico = planoRevisao?.tipoServico || [];
  const veiculoTexto = typeof veiculo === 'string' ? veiculo : veiculo?.descricao || '';
  const countLines = (value, charsPerLine) => Math.max(1, Math.ceil(String(value || '').length / charsPerLine));
  const pecasLinhas = pecasCol1.concat(pecasCol2).reduce((total, item) => total + countLines(item, 76), 0);
  const servicosLinhas = servicos.reduce((total, item) => total + countLines(item, 130), 0);
  const certificateEstimatedHeight = 620 + (pecasLinhas + servicosLinhas) * 8;
  const certificateScale = Math.min(1, 796 / certificateEstimatedHeight);
  const observacoes = planoRevisao?.observacoes || '';
  const revisoesChars = revisoes.reduce((total, revisao) => total + String(revisao.kmPrevisto || revisao.km_alvo || '').length + String(revisao.valor || '').length, 0);
  const planEstimatedHeight = 660 + countLines(observacoes, 105) * 20 + Math.ceil(revisoesChars / 110) * 9;
  const planScale = Math.min(1, 796 / planEstimatedHeight);
  const servicoMarcado = (nome) => tipoServico.some((item) => (
    String(item).toLowerCase().includes(nome.toLowerCase())
  ));

  const renderPlanoVia = (nome, isLast = false) => (
    <View style={[styles.via, isLast && styles.viaLast]}>
      <View style={styles.viaHeader}>
          <Text style={styles.viaGarageName}>ZERO 20 GARAGE</Text>
        <Text style={styles.viaName}>{nome}</Text>
      </View>
      <View style={styles.infoRow}>
        <View style={styles.infoItem}><Text><Text style={styles.infoLabel}>CLIENTE: </Text>{cliente || ''}</Text></View>
        <View style={styles.infoItem}><Text><Text style={styles.infoLabel}>OS Nº: </Text>{ordemServico || ''}</Text></View>
        <View style={styles.planoDataEntrega}><Text><Text style={styles.infoLabel}>DATA DE ENTREGA: </Text>{planoRevisao?.dataEntrega || dataEntrega || ''}</Text></View>
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
              <View style={styles.serviceCheckbox}>
                {servicoMarcado(servico) && <Text style={styles.serviceCheckboxMark}>X</Text>}
              </View>
              <Text style={styles.serviceText}>{servico}</Text>
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
      <Page size="A4" style={styles.page} wrap={false}>
       <View style={[styles.certificateContent, { transform: [{ scale: certificateScale }] }]}>

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
            <Text style={styles.listItem}>• A validade da garantia estipulada neste certificado está condicionada ao cumprimento, por parte do cliente, de todas as orientações e recomendações de uso, manutenção e cuidados preventivos fornecidas pelo mecânico responsável. É de responsabilidade do cliente acompanhar regularmente os indicadores do painel do veículo, observar luzes de advertência e sinais de anormalidade, especialmente alertas de superaquecimento, baixa pressão do óleo, elevação da temperatura do motor, ruídos incomuns ou perda de desempenho, interrompendo o uso do veículo quando necessário para evitar danos maiores.</Text>
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
        <RodapeContato />
       </View>
      </Page>
      <Page size="A4" style={styles.planoPage} wrap={false}>
       <View style={[styles.planoContent, { transform: [{ scale: planScale }] }]}>
        <View style={styles.planoTopHeader}>
          <Image src={LOGO_GARAGE} style={styles.planoLogo} />
          <Text style={styles.planoTitle}>PLANO DE REVISÃO/TROCA DE ÓLEO</Text>
          <Image src={LOGO_OLEOS} style={styles.planoLogo} />
        </View>
        {renderPlanoVia('VIA DO CLIENTE')}
        {renderPlanoVia('VIA DA OFICINA', true)}
        <View style={styles.planoFooter}>
          <Text style={styles.planoFooterAviso}>
            <Text style={styles.planoFooterAvisoDestaque}>É obrigatória a troca do óleo do motor e do filtro de óleo a cada 10.000 km, ou conforme o intervalo previsto no plano de troca de óleo fornecido ao cliente, respeitando sempre o prazo ou a quilometragem estabelecidos nesse plano.</Text> A realização das manutenções dentro dos intervalos recomendados é condição essencial para a preservação da garantia. O descumprimento dessa exigência, especialmente a não realização da troca de óleo e filtro no intervalo estipulado, poderá acarretar a perda da cobertura da garantia, observadas as condições do certificado e a legislação aplicável. O cliente deverá guardar os comprovantes das manutenções realizadas para eventual verificação.
          </Text>
          <View style={styles.planoAssinaturaClienteWrapper}>
            <View style={styles.planoPageSignatureSpacer} />
            <View style={styles.planoLinhaAssinatura} />
            <Text style={styles.planoTextoAssinatura}>ASSINATURA DO CLIENTE</Text>
          </View>
          <RodapeContato />
        </View>
       </View>
      </Page>
    </Document>
  );
};

export default TermoGarantiaPDF;
