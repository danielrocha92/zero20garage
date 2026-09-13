// src/hooks/useMarketingMedia.js
// Hook reutilizável para buscar mídias de marketing do Firebase, filtradas por página.
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebaseOrcamentos';

/**
 * Busca todas as mídias ativas de marketing para uma determinada página.
 * @param {string} pagina - Nome da página (home, sobre, servicos, oleos-filtros, etc.)
 * @returns {{ media: Array, loading: boolean }}
 */
const useMarketingMedia = (pagina, defaultMedia = []) => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pagina) {
      setLoading(false);
      return;
    }

    const fetchMedia = async () => {
      try {
        const marketingRef = collection(db, 'marketing_media');
        const q = query(marketingRef, orderBy('ordem', 'asc'));
        const snapshot = await getDocs(q);
        const allMedia = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        const persistedById = new Map(allMedia.map((item) => [item.id, item]));
        const mergedDefaults = defaultMedia.map((item) => ({
          ...item,
          ...persistedById.get(item.id),
        }));
        const customMedia = allMedia.filter(
          (item) => !defaultMedia.some((defaultItem) => defaultItem.id === item.id)
        );

        // Filtrar: apenas banners ativos, da página solicitada e não excluídos
        const filtered = [...mergedDefaults, ...customMedia].filter(
          (item) => item.deleted !== true && item.ativo === true && item.pagina === pagina
        );

        setMedia(filtered);
      } catch (error) {
        console.error(`[useMarketingMedia] Erro ao buscar mídia para "${pagina}":`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [pagina]);

  return { media, loading };
};

export default useMarketingMedia;
