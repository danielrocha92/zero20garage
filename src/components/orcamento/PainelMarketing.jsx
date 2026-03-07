import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, orderBy, query } from 'firebase/firestore';
import { db } from '../../services/firebaseOrcamentos';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Video, Trash2, PlusCircle, Edit, Link as LinkIcon, Save, X, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './PainelMarketing.css';

const PainelMarketing = ({ showMessage }) => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  // States of Form
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    url: '',
    tipo: 'imagem', // 'imagem' ou 'video'
    titulo: '',
    linkDestino: '',
    pagina: 'home', // Onde o banner vai aparecer (ex: home, oleos, contato)
    ordem: 0,
    ativo: true
  });

  const marketingCollectionRef = collection(db, "marketing_media");

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const q = query(marketingCollectionRef, orderBy("ordem", "asc"));
      const data = await getDocs(q);
      setMediaList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Erro ao buscar mídia de marketing:", error);
      showMessage && showMessage("Erro ao carregar banners do marketing.", true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
    // eslint-disable-next-line
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.url) {
      showMessage && showMessage("A URL da mídia é obrigatória.", true);
      return;
    }

    setLoading(true);
    try {
      const docData = {
        url: formData.url,
        tipo: formData.tipo,
        titulo: formData.titulo || '',
        linkDestino: formData.linkDestino || '',
        pagina: formData.pagina || 'home',
        ordem: Number(formData.ordem) || 0,
        ativo: formData.ativo !== undefined ? formData.ativo : true,
        updatedAt: new Date().toISOString()
      };

      if (isEditing && currentId) {
        const mediaDoc = doc(db, "marketing_media", currentId);
        await updateDoc(mediaDoc, docData);
        showMessage && showMessage("Mídia atualizada com sucesso!");
      } else {
        docData.createdAt = new Date().toISOString();
        await addDoc(marketingCollectionRef, docData);
        showMessage && showMessage("Mídia adicionada com sucesso!");
      }
      resetForm();
      fetchMedia();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      showMessage && showMessage("Erro ao salvar mídia. Verifique permissões.", true);
    } finally {
      setLoading(false);
    }
  };

  const editMedia = (media) => {
    setFormData({
      url: media.url,
      tipo: media.tipo,
      titulo: media.titulo,
      linkDestino: media.linkDestino,
      pagina: media.pagina || 'home',
      ordem: media.ordem || 0,
      ativo: media.ativo
    });
    setCurrentId(media.id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteMedia = async (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir esta mídia do carrossel?");
    if (!confirmDelete) return;

    try {
      const mediaDoc = doc(db, "marketing_media", id);
      await deleteDoc(mediaDoc);
      showMessage && showMessage("Mídia removida com sucesso!");
      fetchMedia();
    } catch (error) {
      console.error("Erro ao deletar:", error);
      showMessage && showMessage("Erro ao excluir mídia.", true);
    }
  };

  const resetForm = () => {
    setFormData({ url: '', tipo: 'imagem', titulo: '', linkDestino: '', pagina: 'home', ordem: 0, ativo: true });
    setIsEditing(false);
    setCurrentId(null);
  };

  // Separar ativos para o carrossel
  const activeMedia = mediaList.filter(m => m.ativo);

  return (
    <div className="pmkt-container">

      {/* TUTORIAL / INSTRUÇÕES PARA USUÁRIO LEIGO */}
      <div className="pmkt-tutorial-card">
        <button
          className="pmkt-tutorial-header"
          onClick={() => setShowTutorial(!showTutorial)}
        >
          <div className="pmkt-tutorial-title">
            <HelpCircle size={22} className="pmkt-icon-pulse" />
            <span>Precisa de ajuda? Veja como usar este painel</span>
          </div>
          {showTutorial ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        <AnimatePresence>
          {showTutorial && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pmkt-tutorial-content"
            >
              <div className="pmkt-tutorial-steps">
                <div className="pmkt-step">
                  <div className="pmkt-step-number">1</div>
                  <div>
                    <h4>Adicionar Imagem ou Vídeo</h4>
                    <p>Suba sua imagem ou vídeo em um site seguro e copie o link (URL). Cole esse link no campo <strong>"Link/URL da Mídia"</strong>.</p>
                  </div>
                </div>
                <div className="pmkt-step">
                  <div className="pmkt-step-number">2</div>
                  <div>
                    <h4>Posição e Direcionamento</h4>
                    <p>O campo <strong>"Link de Destino"</strong> (opcional) serve para que o cliente seja direcionado ao clicar (ex: link para o seu WhatsApp). Use o campo <strong>"Ordem"</strong> para definir quem aparece primeiro (0, 1, 2...).</p>
                  </div>
                </div>
                <div className="pmkt-step">
                  <div className="pmkt-step-number">3</div>
                  <div>
                    <h4>Ligando e Desligando Banners</h4>
                    <p>Precisa pausar uma promoção? Não precisa excluir! Apenas <strong>Desmarque a chave "Ativar"</strong> e clique em Salvar. O banner sumirá do site, mas continuará aqui para o futuro.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SEÇÃO DO FORMULÁRIO */}
      <motion.div
        className="pmkt-form-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="pmkt-header">
           <h2>{isEditing ? "Editar Mídia" : "Adicionar Nova Mídia Marketing"}</h2>
           {isEditing && (
             <button type="button" onClick={resetForm} className="pmkt-btn-cancel">
               <X size={18} /> Cancelar Edição
             </button>
           )}
        </div>

        <form onSubmit={handleSave} className="pmkt-form">
          <div className="pmkt-grid-2">
            <div className="pmkt-form-group">
              <label>Link/URL da Mídia (Cloudinary, Imgur, etc)</label>
              <div className="pmkt-input-icon">
                {formData.tipo === 'video' ? <Video size={18}/> : <Image size={18} />}
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: https://dominio.com/foto.jpg"
                />
              </div>
            </div>

            <div className="pmkt-form-group">
              <label>Ação / Link de Destino (Opcional)</label>
              <div className="pmkt-input-icon">
                <LinkIcon size={18} />
                <input
                  type="text"
                  name="linkDestino"
                  value={formData.linkDestino}
                  onChange={handleInputChange}
                  placeholder="https://wa.me/..."
                />
              </div>
            </div>
          </div>

          <div className="pmkt-grid-2">
            <div className="pmkt-form-group">
              <label>Título (Uso Interno/Acessibilidade)</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleInputChange}
                placeholder="Ex Caminhonete Promoção"
              />
            </div>

            <div className="pmkt-form-group">
              <label>Página de Destino (Onde vai aparecer?)</label>
              <select name="pagina" value={formData.pagina} onChange={handleInputChange}>
                <option value="home">Página Inicial (Home)</option>
                <option value="oleos-filtros">Óleos e Filtros</option>
                <option value="sobre">Quem Somos / Sobre</option>
                <option value="outra">Outras Páginas</option>
              </select>
            </div>
          </div>

          <div className="pmkt-grid-2">
            <div className="pmkt-form-group">
              <label>Tipo de Mídia</label>
              <select name="tipo" value={formData.tipo} onChange={handleInputChange}>
                <option value="imagem">Imagem Estática</option>
                <option value="video">Vídeo</option>
              </select>
            </div>

            <div className="pmkt-form-group">
              <label>Ordem de Exibição (Numérico)</label>
              <input
                type="number"
                name="ordem"
                value={formData.ordem}
                onChange={handleInputChange}
                min="0"
              />
            </div>
          </div>

          <div className="pmkt-form-footer">
            <label className="pmkt-checkbox-label">
              <input
                type="checkbox"
                name="ativo"
                checked={formData.ativo}
                onChange={handleInputChange}
              />
              <span className="pmkt-slider"></span>
              Ativar exibição no site
            </label>

            <button type="submit" className="pmkt-btn-primary" disabled={loading}>
              {loading ? "Salvando..." : isEditing ? <><Save size={20}/> Salvar Edição</> : <><PlusCircle size={20}/> Adicionar Mídia</>}
            </button>
          </div>
        </form>
      </motion.div>

      {/* PRÉ-VISUALIZAÇÃO / CARROSSEL MODERNO */}
      <h3 className="pmkt-section-title">Visualização do Carrossel Ativo</h3>
      {activeMedia.length > 0 ? (
        <div className="pmkt-carousel-wrapper">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 300,
              modifier: 1,
              slideShadows: true,
            }}
            loop={activeMedia.length > 2}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="pmkt-swiper"
          >
            {activeMedia.map(media => (
              <SwiperSlide key={media.id} className="pmkt-slide">
                {media.tipo === 'video' ? (
                  <video src={media.url} autoPlay loop muted playsInline className="pmkt-media-content" />
                ) : (
                  <img src={media.url} alt={media.titulo} className="pmkt-media-content" />
                )}
                {media.titulo && <div className="pmkt-slide-caption">{media.titulo}</div>}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="pmkt-empty-msg">Nenhuma mídia ativa para exibir no carrossel no momento.</div>
      )}

      {/* GERENCIAMENTO LISTAGEM EM TABELA */}
      <h3 className="pmkt-section-title pmkt-mt-4">Gerenciar Todas as Mídias</h3>
      <div className="pmkt-table-container">
        <table className="pmkt-table">
          <thead>
            <tr>
              <th>Ordem</th>
              <th>Página</th>
              <th>Preview</th>
              <th>Detalhes</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
            {mediaList.map((media) => (
              <motion.tr
                key={media.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layout
              >
                <td className="pmkt-col-center"><strong>{media.ordem}</strong></td>
                <td className="pmkt-col-center">
                  <span className="pmkt-page-badge">{media.pagina === 'home' ? 'Home' : media.pagina === 'oleos-filtros' ? 'Óleos' : media.pagina === 'sobre' ? 'Sobre' : 'Outra'}</span>
                </td>
                <td className="pmkt-preview-td">
                  {media.tipo === 'video'
                    ? <div className="pmkt-ico-vid"><Video size={30} color="#c50404" /><span>Video</span></div>
                    : <img src={media.url} alt="preview" className="pmkt-table-img" loading="lazy" />
                  }
                </td>
                <td>
                  <div className="pmkt-details-txt">
                    <strong>{media.titulo || "Sem Título"}</strong>
                    <span className="pmkt-url-truncated" title={media.url}>{media.url}</span>
                    {media.linkDestino && <span className="pmkt-dest-link">🎯 {media.linkDestino}</span>}
                  </div>
                </td>
                <td className="pmkt-col-center">
                  <span className={`pmkt-status-badge ${media.ativo ? 'ativo' : 'inativo'}`}>
                    {media.ativo ? 'Ativo' : 'Oculto'}
                  </span>
                </td>
                <td className="pmkt-col-center">
                  <div className="pmkt-action-btns">
                    <button onClick={() => editMedia(media)} className="pmkt-btn-icon pmkt-edit" title="Editar">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => deleteMedia(media.id)} className="pmkt-btn-icon pmkt-delete" title="Excluir">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
            {mediaList.length === 0 && (
              <tr>
                <td colSpan="5" className="pmkt-empty-msg">Nenhuma mídia cadastrada. Comece adicionando acima.</td>
              </tr>
            )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PainelMarketing;
