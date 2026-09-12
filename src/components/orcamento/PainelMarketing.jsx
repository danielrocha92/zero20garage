import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, orderBy, query, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseOrcamentos';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Video, Trash2, PlusCircle, Edit, Link as LinkIcon, Save, X, PlusSquare, AlignLeft, AlignCenter, AlignRight, Type, MousePointer2, LayoutGrid } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './PainelMarketing.css';

const PainelMarketing = ({ showMessage }) => {
  const [activeTab, setActiveTab] = useState('novo'); // 'novo' ou 'gerenciar'
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false);


  // States of Form
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    url: '',
    tipo: 'imagem',
    titulo: '',
    subtitulo: '',
    textoBotao: '',
    posicaoTexto: 'esquerda', // 'esquerda', 'centro', 'direita'
    filtroEscuro: true,
    linkDestino: '',
    pagina: 'home',
    ordem: 0,
    ativo: true
  });

  const marketingCollectionRef = collection(db, "marketing_media");

  const defaultStaticBanners = [
    { id: 'static-home-desktop', url: 'https://res.cloudinary.com/dlyeywiwk/image/upload/f_auto,q_auto/v1763429487/home_k6ug8o.jpg', tipo: 'imagem', titulo: 'Especialistas em Motores', subtitulo: 'Sua oficina de confiança', textoBotao: 'Agendar', posicaoTexto: 'esquerda', filtroEscuro: true, pagina: 'home', ordem: 0, ativo: true, isDefault: true },
    { id: 'static-sobre', url: 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1765200812/IMG_3062_aldoim.jpg', tipo: 'imagem', titulo: 'Nossa História', pagina: 'sobre', ordem: 0, ativo: true, isDefault: true },
    { id: 'static-servicos', url: 'https://res.cloudinary.com/dlyeywiwk/image/upload/f_auto,q_auto/v1763429508/servicos_gblbyy.jpg', tipo: 'imagem', titulo: 'Nossos Serviços', pagina: 'servicos', ordem: 0, ativo: true, isDefault: true },
    { id: 'static-orcamento', url: 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1764870173/img-orcamento-dektop_yx6lgf.png', tipo: 'imagem', titulo: 'Faça um Orçamento', pagina: 'orcamento', ordem: 0, ativo: true, isDefault: true },
    { id: 'static-contato', url: 'https://res.cloudinary.com/dlyeywiwk/image/upload/f_auto,q_auto/v1763429463/contato_ojwrdu.jpg', tipo: 'imagem', titulo: 'Fale Conosco', pagina: 'contato', ordem: 0, ativo: true, isDefault: true },
    { id: 'static-blog', url: 'https://res.cloudinary.com/dlyeywiwk/image/upload/f_auto,q_auto/v1763429461/blog-header_vzqvrg.jpg', tipo: 'imagem', titulo: 'Dicas e Novidades', pagina: 'blog', ordem: 0, ativo: true, isDefault: true },
    { id: 'static-footer', url: 'https://res.cloudinary.com/dlyeywiwk/image/upload/f_auto,q_auto/v1763429482/footer_unphiy.jpg', tipo: 'imagem', titulo: 'Visite a Zero 20', pagina: 'footer', ordem: 0, ativo: true, isDefault: true },
    { id: 'static-of-desktop', url: 'https://res.cloudinary.com/dlyeywiwk/video/upload/v1764821682/wl0kcac1fvfhm2rgdeja.mp4', tipo: 'video', titulo: 'Óleos e Filtros', pagina: 'oleos-filtros', ordem: 0, ativo: true, isDefault: true }
  ];

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const q = query(marketingCollectionRef, orderBy("ordem", "asc"));
      const data = await getDocs(q);
      const fetchedData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMediaList([...defaultStaticBanners, ...fetchedData]);
    } catch (error) {
      console.error("Erro ao buscar mídia de marketing:", error);
      showMessage && showMessage("Erro ao carregar banners do marketing.", true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePosicaoChange = (pos) => {
    setFormData(prev => ({ ...prev, posicaoTexto: pos }));
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
        subtitulo: formData.subtitulo || '',
        textoBotao: formData.textoBotao || '',
        posicaoTexto: formData.posicaoTexto || 'esquerda',
        filtroEscuro: formData.filtroEscuro,
        linkDestino: formData.linkDestino || '',
        pagina: formData.pagina || 'home',
        ordem: Number(formData.ordem) || 0,
        ativo: formData.ativo !== undefined ? formData.ativo : true,
        updatedAt: new Date().toISOString()
      };

      if (isEditing && currentId) {
        const mediaDoc = doc(db, "marketing_media", currentId);
        await setDoc(mediaDoc, docData, { merge: true });
        showMessage && showMessage("Mídia atualizada com sucesso!");
      } else {
        docData.createdAt = new Date().toISOString();
        await addDoc(marketingCollectionRef, docData);
        showMessage && showMessage("Mídia adicionada com sucesso!");
        setActiveTab('gerenciar');
      }
      resetForm();
      fetchMedia();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      showMessage && showMessage(`Erro ao salvar mídia: ${error.message}`, true);
    } finally {
      setLoading(false);
    }
  };

  const editMedia = (media) => {
    setFormData({
      url: media.url,
      tipo: media.tipo,
      titulo: media.titulo || '',
      subtitulo: media.subtitulo || '',
      textoBotao: media.textoBotao || '',
      posicaoTexto: media.posicaoTexto || 'esquerda',
      filtroEscuro: media.filtroEscuro !== undefined ? media.filtroEscuro : true,
      linkDestino: media.linkDestino || '',
      pagina: media.pagina || 'home',
      ordem: media.ordem || 0,
      ativo: media.ativo
    });
    setCurrentId(media.id);
    setIsEditing(true);
    setActiveTab('novo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteMedia = async (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir esta mídia do site?");
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
    setFormData({
      url: '', tipo: 'imagem', titulo: '', subtitulo: '', textoBotao: '',
      posicaoTexto: 'esquerda', filtroEscuro: true, linkDestino: '',
      pagina: 'home', ordem: 0, ativo: true
    });
    setIsEditing(false);
    setCurrentId(null);
  };

  const handleAddMoreToPage = (pagina) => {
    resetForm();
    setFormData(prev => ({ ...prev, pagina: pagina }));
    setActiveTab('novo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pmkt-container">

      {/* Navegação de Abas */}
      <div className="pmkt-tabs">
        <button
          className={`pmkt-tab-btn ${activeTab === 'novo' ? 'active' : ''}`}
          onClick={() => setActiveTab('novo')}
        >
          <PlusCircle size={18} />
          {isEditing ? 'Editar Banner' : 'Adicionar Banner'}
        </button>
        <button
          className={`pmkt-tab-btn ${activeTab === 'gerenciar' ? 'active' : ''}`}
          onClick={() => { setActiveTab('gerenciar'); resetForm(); }}
        >
          <LayoutGrid size={18} />
          Gerenciar Banners
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'novo' && (
          <motion.div
            key="tab-novo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="pmkt-tab-content"
          >
            {/* Live Preview Area */}
            <div className="pmkt-preview-section">
              <h3 className="pmkt-preview-title">Preview ao Vivo</h3>
              <div className="pmkt-live-preview">
                {formData.url ? (
                  formData.tipo === 'video' ? (
                    <video src={formData.url} autoPlay loop muted playsInline className="pmkt-preview-media" />
                  ) : (
                    <img src={formData.url} alt="Preview" className="pmkt-preview-media" />
                  )
                ) : (
                  <div className="pmkt-preview-placeholder">Sua Imagem / Vídeo Aqui</div>
                )}

                {formData.filtroEscuro && <div className="pmkt-preview-overlay"></div>}

                <div className={`pmkt-preview-content align-${formData.posicaoTexto}`}>
                  {formData.titulo && <h1 className="pmkt-preview-heading">{formData.titulo}</h1>}
                  {formData.subtitulo && <p className="pmkt-preview-subheading">{formData.subtitulo}</p>}
                  {formData.textoBotao && <button className="pmkt-preview-button">{formData.textoBotao}</button>}
                </div>
              </div>
            </div>

            {/* Formulário de Edição */}
            <div className="pmkt-form-card">
              <div className="pmkt-header">
                 <h2>{isEditing ? "Configurações do Banner" : "Criar Novo Banner"}</h2>
                 {isEditing && (
                   <button type="button" onClick={resetForm} className="pmkt-btn-cancel">
                     <X size={18} /> Cancelar Edição
                   </button>
                 )}
              </div>

              <form onSubmit={handleSave} className="pmkt-form">
                <div className="pmkt-grid-2">
                  <div className="pmkt-form-group">
                    <label>Link/URL da Mídia</label>
                    <div className="pmkt-input-icon">
                      {formData.tipo === 'video' ? <Video size={18}/> : <Image size={18} />}
                      <input type="text" name="url" value={formData.url} onChange={handleInputChange} required placeholder="Ex: https://dominio.com/foto.jpg" />
                    </div>
                  </div>
                  <div className="pmkt-form-group">
                    <label>Tipo de Mídia</label>
                    <select name="tipo" value={formData.tipo} onChange={handleInputChange}>
                      <option value="imagem">Imagem Estática</option>
                      <option value="video">Vídeo</option>
                    </select>
                  </div>
                </div>

                <div className="pmkt-grid-2">
                  <div className="pmkt-form-group">
                    <label>Título Principal</label>
                    <div className="pmkt-input-icon">
                      <Type size={18} />
                      <input type="text" name="titulo" value={formData.titulo} onChange={handleInputChange} placeholder="Ex: Revisão Completa" />
                    </div>
                  </div>
                  <div className="pmkt-form-group">
                    <label>Subtítulo / Descrição</label>
                    <div className="pmkt-input-icon">
                      <Type size={18} />
                      <input type="text" name="subtitulo" value={formData.subtitulo} onChange={handleInputChange} placeholder="Ex: Deixe seu carro novo em folha" />
                    </div>
                  </div>
                </div>

                <div className="pmkt-grid-2">
                  <div className="pmkt-form-group">
                    <label>Texto do Botão (Call to Action)</label>
                    <div className="pmkt-input-icon">
                      <MousePointer2 size={18} />
                      <input type="text" name="textoBotao" value={formData.textoBotao} onChange={handleInputChange} placeholder="Ex: Agendar Agora" />
                    </div>
                  </div>
                  <div className="pmkt-form-group">
                    <label>Link de Destino do Botão</label>
                    <div className="pmkt-input-icon">
                      <LinkIcon size={18} />
                      <input type="text" name="linkDestino" value={formData.linkDestino} onChange={handleInputChange} placeholder="https://wa.me/..." />
                    </div>
                  </div>
                </div>

                <div className="pmkt-grid-3">
                  <div className="pmkt-form-group">
                    <label>Alinhamento do Texto</label>
                    <div className="pmkt-align-buttons">
                      <button type="button" className={`pmkt-align-btn ${formData.posicaoTexto === 'esquerda' ? 'active' : ''}`} onClick={() => handlePosicaoChange('esquerda')}><AlignLeft size={18} /></button>
                      <button type="button" className={`pmkt-align-btn ${formData.posicaoTexto === 'centro' ? 'active' : ''}`} onClick={() => handlePosicaoChange('centro')}><AlignCenter size={18} /></button>
                      <button type="button" className={`pmkt-align-btn ${formData.posicaoTexto === 'direita' ? 'active' : ''}`} onClick={() => handlePosicaoChange('direita')}><AlignRight size={18} /></button>
                    </div>
                  </div>

                  <div className="pmkt-form-group">
                    <label>Página de Exibição</label>
                    <select name="pagina" value={formData.pagina} onChange={handleInputChange}>
                      <option value="home">Home</option>
                      <option value="oleos-filtros">Óleos e Filtros</option>
                      <option value="sobre">Sobre</option>
                      <option value="servicos">Serviços</option>
                      <option value="orcamento">Orçamentos</option>
                      <option value="contato">Contato</option>
                      <option value="blog">Blog</option>
                    </select>
                  </div>

                  <div className="pmkt-form-group">
                    <label>Ordem (0 é o primeiro)</label>
                    <input type="number" name="ordem" value={formData.ordem} onChange={handleInputChange} min="0" />
                  </div>
                </div>

                <div className="pmkt-form-footer pmkt-mt-4">
                  <div className="pmkt-checkbox-group">
                    <label className="pmkt-checkbox-label">
                      <input type="checkbox" name="filtroEscuro" checked={formData.filtroEscuro} onChange={handleInputChange} />
                      <span className="pmkt-slider"></span>
                      Aplicar Filtro Escuro na Imagem
                    </label>
                    <label className="pmkt-checkbox-label">
                      <input type="checkbox" name="ativo" checked={formData.ativo} onChange={handleInputChange} />
                      <span className="pmkt-slider"></span>
                      Ativar Banner no Site
                    </label>
                  </div>

                  <button type="submit" className="pmkt-btn-primary" disabled={loading}>
                    {loading ? "Salvando..." : isEditing ? <><Save size={20}/> Salvar Edição</> : <><PlusCircle size={20}/> Publicar Banner</>}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {activeTab === 'gerenciar' && (
          <motion.div
            key="tab-gerenciar"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="pmkt-tab-content"
          >
            {(() => {
              const grouped = {};
              const pageOrder = ['home', 'sobre', 'servicos', 'orcamento', 'oleos-filtros', 'contato', 'blog', 'footer', 'outra'];
              mediaList.forEach(m => {
                const pg = m.pagina || 'outra';
                if (!grouped[pg]) grouped[pg] = [];
                grouped[pg].push(m);
              });

              const pageLabel = (pg) => {
                const labels = { home: 'Home', sobre: 'Sobre', servicos: 'Serviços', orcamento: 'Orçamento', 'oleos-filtros': 'Óleos e Filtros', contato: 'Contato', blog: 'Blog', footer: 'Rodapé', outra: 'Outras' };
                return labels[pg] || pg;
              };

              const sortedPages = Object.keys(grouped).sort((a, b) => {
                const ia = pageOrder.indexOf(a);
                const ib = pageOrder.indexOf(b);
                return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
              });

              if (sortedPages.length === 0) {
                return <div className="pmkt-empty-msg">Nenhuma mídia cadastrada. Volte para a aba Adicionar.</div>;
              }

              return (
                <div className="pmkt-grouped-list">
                  {sortedPages.map(pagina => {
                    const items = grouped[pagina];
                    const hasMultiple = items.length > 1;

                    return (
                      <motion.div key={pagina} className="pmkt-page-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="pmkt-page-card-header">
                          <div className="pmkt-page-card-title">
                            <span className="pmkt-page-badge">{pageLabel(pagina)}</span>
                            <span className="pmkt-page-count">{items.length} {items.length === 1 ? 'banner' : 'banners'}</span>
                            {hasMultiple && <span className="pmkt-carousel-indicator">🎠 Carrossel</span>}
                          </div>
                          <button onClick={() => handleAddMoreToPage(pagina)} className="pmkt-btn-add-page" title="Adicionar banner nesta página">
                            <PlusSquare size={16} /> Adicionar Novo
                          </button>
                        </div>

                        <div className="pmkt-page-items">
                          {items.map((media) => (
                            <div key={media.id} className="pmkt-item-row premium-card">
                              <div className="pmkt-item-preview">
                                {media.tipo === 'video' ? <div className="pmkt-ico-vid"><Video size={24} color="#fff" /></div> : <img src={media.url} alt={media.titulo} className="pmkt-table-img" />}
                              </div>
                              <div className="pmkt-item-info">
                                <strong>{media.titulo || 'Banner sem título'}</strong>
                                {media.subtitulo && <span className="pmkt-subtitle-preview">{media.subtitulo}</span>}
                              </div>
                              <div className="pmkt-item-status">
                                <span className={`pmkt-status-badge ${media.ativo ? 'ativo' : 'inativo'}`}>
                                  {media.ativo ? 'Ativo no Site' : 'Pausado'}
                                </span>
                              </div>
                              <div className="pmkt-item-actions">
                                {media.isReadOnly ? (
                                  <span className="pmkt-readonly-badge">Fixo do Sistema</span>
                                ) : (
                                  <>
                                    <button onClick={() => editMedia(media)} className="pmkt-btn-icon pmkt-edit"><Edit size={16} /></button>
                                    {!media.isDefault && <button onClick={() => deleteMedia(media.id)} className="pmkt-btn-icon pmkt-delete"><Trash2 size={16} /></button>}
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PainelMarketing;
