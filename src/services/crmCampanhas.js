import { arrayUnion, collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { authenticateUser, db } from './firebaseOrcamentos';

const OS_COLLECTION = 'ordens_servico';
const TEMPLATE_COLLECTION = 'crm_templates';

export async function listarDadosCRM() {
  await authenticateUser();
  const snapshot = await getDocs(collection(db, OS_COLLECTION));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function listarTemplatesCRM() {
  await authenticateUser();
  const snapshot = await getDocs(collection(db, TEMPLATE_COLLECTION));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function salvarTemplateCRM(nome, mensagem) {
  await authenticateUser();
  const templateRef = doc(collection(db, TEMPLATE_COLLECTION));
  await setDoc(templateRef, { nome, mensagem, criado_em: new Date().toISOString() });
  return { id: templateRef.id, nome, mensagem };
}

export async function registrarContatosCRM(clientes, tipoCampanha) {
  await authenticateUser();
  const timestamp = new Date().toISOString();
  await Promise.all(clientes.map((cliente) => updateDoc(doc(db, OS_COLLECTION, cliente.id), {
    logs_contato: arrayUnion({ data_disparo: timestamp, tipo_campanha: tipoCampanha, status: 'enviado' }),
  })));
  return timestamp;
}

export function normalizarClienteCRM(ordem) {
  const veiculo = typeof ordem.veiculo === 'string' ? ordem.veiculo : ordem.veiculo?.descricao || '';
  const revisoes = ordem.plano_revisoes || [];
  const revisao = revisoes.find((item) => item?.status !== 'realizada') || revisoes[0] || {};
  const limite = revisao.data_limite_estimada ? new Date(revisao.data_limite_estimada) : null;
  const atrasada = limite && limite < new Date() && revisao.status !== 'realizada';
  const index = Math.max(0, revisoes.indexOf(revisao));
  const logs = ordem.logs_contato || [];
  const ultimoLog = logs.length ? logs[logs.length - 1] : null;
  return {
    id: ordem.id,
    cliente: ordem.cliente || '',
    veiculo,
    telefone: ordem.telefone || '',
    placa: ordem.placa || ordem.veiculo?.placa || '',
    perfilUso: ordem.veiculo?.perfil_uso || ordem.perfil_uso || 'padrao',
    tipoServico: ordem.servicosSelecionados || [],
    dataConclusao: ordem.data || ordem.dataConclusao || '',
    statusRevisao: `${atrasada ? 'Atrasada' : 'Pendente'} (${index + 1}ª)`,
    revisaoIndex: index,
    dataLimite: revisao.data_limite_estimada || '',
    ultimoContato: ultimoLog?.data_disparo ? new Date(ultimoLog.data_disparo).toLocaleDateString('pt-BR') : '',
  };
}
