import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, orderBy, query } from 'firebase/firestore';
import { db } from '../../services/firebaseOrcamentos';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Video, Trash2, PlusCircle, Edit, Link as LinkIcon, Save, X, HelpCircle, ChevronDown, ChevronUp, PlusSquare } from 'lucide-react';
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

  // Banners do sistema. Apenas HOME é fixo (isReadOnly).
  // Demais são padrões que podem ser substituídos via Firebase.
  const defaultStaticBanners = [
    {
      id: 'static-home-desktop',
      url: 'https://res.cloudinary.com/dlyeywiwk/image/upload/f_auto,q_auto/v1763429487/home_k6ug8o.jpg',
      tipo: 'imagem',
      titulo: 'Header Dinâmico - Home',
      pagina: 'home',
      ordem: 0,
      ativo: true,
      isReadOnly: true  // Único fixo de sistema
    },
    {
      id: 'static-sobre',
      url: 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1765200812/IMG_3062_aldoim.jpg',
      tipo: 'imagem',
      titulo: 'Header Atual - Sobre (Padrão)',
      pagina: 'sobre',
      ordem: 0,
      ativo: true,
      isDefault: true  // Substituível via Firebase
    },
    {
      id: 'static-servicos',
      url: 'https://res.cloudinary.com/dlyeywiwk/image/upload/f_auto,q_auto/v1763429508/servicos_gblbyy.jpg',
      tipo: 'imagem',
      titulo: 'Header Atual - Serviços (Padrão)',
      pagina: 'servicos',
      ordem: 0,
      ativo: true,
      isDefault: true
    },
    {
      id: 'static-orcamento',
      url: 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1764870173/img-orcamento-dektop_yx6lgf.png',
      tipo: 'imagem',
      titulo: 'Header Atual - Orçamento (Padrão)',
      pagina: 'orcamento',
      ordem: 0,
      ativo: true,
      isDefault: true
    },
    {
      id: 'static-contato',
      url: 'https://res.cloudinary.com/dlyeywiwk/image/upload/f_auto,q_auto/v1763429463/contato_ojwrdu.jpg',
      tipo: 'imagem',
      titulo: 'Header Atual - Contato (Padrão)',
      pagina: 'contato',
      ordem: 0,
      ativo: true,
      isDefault: true
    },
    {
      id: 'static-blog',
      url: 'https://res.cloudinary.com/dlyeywiwk/image/upload/f_auto,q_auto/v1763429461/blog-header_vzqvrg.jpg',
      tipo: 'imagem',
      titulo: 'Header Atual - Blog (Padrão)',
      pagina: 'blog',
      ordem: 0,
      ativo: true,
      isDefault: true
    },
    {
      id: 'static-footer',
      url: 'https://res.cloudinary.com/dlyeywiwk/image/upload/f_auto,q_auto/v1763429482/footer_unphiy.jpg',
      tipo: 'imagem',
      titulo: 'Header Atual - Rodapé (Padrão)',
      pagina: 'footer',
      ordem: 0,
      ativo: true,
      isDefault: true
    },
    {
      id: 'static-of-desktop',
      url: 'https://res.cloudinary.com/dlyeywiwk/video/upload/v1764821682/wl0kcac1fvfhm2rgdeja.mp4',
      tipo: 'video',
      titulo: 'Banner Atual - Óleos (Padrão)',
      pagina: 'oleos-filtros',
      ordem: 0,
      ativo: true,
      isDefault: true
    }
  ];

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const q = query(marketingCollectionRef, orderBy("ordem", "asc"));
      const data = await getDocs(q);
      const fetchedData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      // Combinar dados do banco com dados estáticos para que todos listem na tabela.
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

  const handleAddMoreToPage = (pagina) => {
    resetForm();
    setFormData(prev => ({ ...prev, pagina: pagina }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showMessage && showMessage(`Preencha a URL para adicionar no banner: ${pagina}`);
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
                <option value="servicos">Serviços</option>
                <option value="orcamento">Orçamentos (Pública)</option>
                <option value="contato">Contato</option>
                <option value="blog">Blog</option>
                <option value="footer">Rodapé Geral</option>
                <option value="outra">Outras Páginas (Padrão)</option>
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

      {/* GERENCIAMENTO — CARDS AGRUPADOS POR PÁGINA */}
      <h3 className="pmkt-section-title pmkt-mt-4">Gerenciar Todas as Mídias</h3>

      {(() => {
        // Agrupar mídias por página
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
          return <div className="pmkt-empty-msg">Nenhuma mídia cadastrada. Comece adicionando acima.</div>;
        }

        return (
          <div className="pmkt-grouped-list">
            {sortedPages.map(pagina => {
              const items = grouped[pagina];
              const hasMultiple = items.length > 1;

              return (
                <motion.div
                  key={pagina}
                  className="pmkt-page-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Cabeçalho do card agrupado */}
                  <div className="pmkt-page-card-header">
                    <div className="pmkt-page-card-title">
                      <span className="pmkt-page-badge">{pageLabel(pagina)}</span>
                      <span className="pmkt-page-count">{items.length} {items.length === 1 ? 'banner' : 'banners'}</span>
                      {hasMultiple && <span className="pmkt-carousel-indicator">🎠 Carrossel Ativo</span>}
                    </div>
                    <button
                      onClick={() => handleAddMoreToPage(pagina)}
                      className="pmkt-btn-add-page"
                      title={`Adicionar mídia em "${pageLabel(pagina)}"`}
                    >
                      <PlusSquare size={16} /> Adicionar
                    </button>
                  </div>

                  {/* Mini carrossel se houver múltiplos banners */}
                  {hasMultiple ? (
                    <div className="pmkt-mini-carousel">
                      <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                          rotate: 10,
                          stretch: 0,
                          depth: 150,
                          modifier: 1,
                          slideShadows: false,
                        }}
                        loop={items.length > 2}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        modules={[EffectCoverflow, Pagination, Autoplay]}
                        className="pmkt-mini-swiper"
                      >
                        {items.filter(m => m.ativo).map(m => (
                          <SwiperSlide key={m.id} className="pmkt-mini-slide">
                            {m.tipo === 'video' ? (
                              <video src={m.url} autoPlay loop muted playsInline className="pmkt-mini-media" />
                            ) : (
                              <img src={m.url} alt={m.titulo} className="pmkt-mini-media" />
                            )}
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  ) : (
                    <div className="pmkt-single-preview">
                      {items[0].tipo === 'video' ? (
                        <video src={items[0].url} autoPlay loop muted playsInline className="pmkt-mini-media" />
                      ) : (
                        <img src={items[0].url} alt={items[0].titulo} className="pmkt-mini-media" />
                      )}
                    </div>
                  )}

                  {/* Lista de itens individuais dentro do card */}
                  <div className="pmkt-page-items">
                    {items.map((media) => (
                      <div key={media.id} className="pmkt-item-row">
                        <div className="pmkt-item-preview">
                          {media.tipo === 'video'
                            ? <div className="pmkt-ico-vid"><Video size={24} color="#c50404" /><span>Vídeo</span></div>
                            : <img src={media.url} alt={media.titulo} className="pmkt-table-img" />
                          }
                        </div>
                        <div className="pmkt-item-info">
                          <strong>{media.titulo || 'Sem Título'}</strong>
                          <code title={media.url}>{media.url}</code>
                        </div>
                        <div className="pmkt-item-status">
                          <span className={`pmkt-status-badge ${media.ativo ? 'ativo' : 'inativo'}`}>
                            {media.ativo ? 'ATIVO' : 'INATIVO'}
                          </span>
                        </div>
                        <div className="pmkt-item-actions">
                          {media.isReadOnly ? (
                            <span className="pmkt-readonly-badge" title="Imagem fixa do sistema">⚙️ Sistema</span>
                          ) : media.isDefault ? (
                            <span className="pmkt-default-badge" title="Imagem padrão — substituível">📌 Padrão</span>
                          ) : (
                            <>
                              <button onClick={() => editMedia(media)} className="pmkt-btn-icon pmkt-edit" title="Editar">
                                <Edit size={16} />
                              </button>
                              <button onClick={() => deleteMedia(media.id)} className="pmkt-btn-icon pmkt-delete" title="Excluir">
                                <Trash2 size={16} />
                              </button>
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
    </div>
  );
};

export default PainelMarketing;
