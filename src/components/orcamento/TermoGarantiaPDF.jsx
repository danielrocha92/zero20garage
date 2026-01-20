
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

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
    </Document>
  );
};

export default TermoGarantiaPDF;
