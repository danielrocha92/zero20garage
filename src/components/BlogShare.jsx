import React, { useEffect, useState } from "react";
import styles from "./BlogShare.module.css";
import db from "../services/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment
} from "firebase/firestore";

// CORRIGIDO: 'Whatsapp' não existe. Usando 'MessageCircle' para o ícone de chat.
// CORRIGIDO: 'Telegram' não existe. Usando 'Send' para o ícone do Telegram.
import { Facebook, Twitter, Instagram, MessageCircle, Send, Mail, Link, Heart } from 'lucide-react';

const BlogShare = ({ slug }) => {
  const [data, setData] = useState({ views: 0, likes: 0, comments: 0 });
  const [copyMessage, setCopyMessage] = useState(''); // Estado para a mensagem de cópia
  const currentURL = window.location.href;

  // Ajuste os links do Instagram para o perfil, pois não há API de compartilhamento direto via URL
  const share = {
    // Facebook: Compartilhador oficial. 'u' é a URL a ser compartilhada.
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`,
    // Twitter (agora X): 'url' é a URL, 'text' é o texto do tweet.
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentURL)}&text=${encodeURIComponent("Confira este post no blog!")}`, // Adicione um texto padrão
    // Instagram: Link direto para o perfil, pois compartilhamento de post via URL não é padrão.
    instagram: `https://www.instagram.com/zerovintegarage/`, // Substitua pelo seu perfil do Instagram
    // WhatsApp: 'text' é a mensagem a ser enviada.
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent("Confira este post: " + currentURL)}`,
    // Telegram: 'url' é a URL, 'text' é o texto da mensagem.
    telegram: `https://t.me/share/url?url=${encodeURIComponent(currentURL)}&text=${encodeURIComponent("Confira este post: ")}`,
    // Email: 'subject' é o assunto, 'body' é o corpo do email.
    email: `mailto:?subject=${encodeURIComponent("Confira este post no blog!")}&body=${encodeURIComponent("Olá! Achei este post interessante: " + currentURL)}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      const ref = doc(db, "posts", slug);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setData(snap.data());
        await updateDoc(ref, { views: increment(1) });
      } else {
        await setDoc(ref, { views: 1, likes: 0, comments: 0 });
        setData({ views: 1, likes: 0, comments: 0 });
      }
    };

    fetchData();
  }, [slug]);

  const copyLink = () => {
    navigator.clipboard.writeText(currentURL);
    setCopyMessage('Link copiado!'); // Define a mensagem
    setTimeout(() => {
      setCopyMessage(''); // Limpa a mensagem após 3 segundos
    }, 3000);
  };

  const handleLike = async () => {
    const ref = doc(db, "posts", slug);
    await updateDoc(ref, { likes: increment(1) });
    setData(prev => ({ ...prev, likes: prev.likes + 1 }));
  };

  return (
    <div className={styles.shareContainer}>
      <div className={styles.icons}>
        {/* Facebook Icon */}
        <a href={share.facebook} target="_blank" rel="noopener noreferrer">
          <Facebook size={24} color="currentColor" />
        </a>
        {/* Twitter (X) Icon */}
        <a href={share.twitter} target="_blank" rel="noopener noreferrer">
          <Twitter size={24} color="currentColor" />
        </a>
        {/* Instagram Icon */}
        <a href={share.instagram} target="_blank" rel="noopener noreferrer">
          <Instagram size={24} color="currentColor" />
        </a>
        {/* WhatsApp Icon - Usando MessageCircle como alternativa */}
        <a href={share.whatsapp} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={24} color="currentColor" />
        </a>
        {/* Telegram Icon - Usando Send como alternativa */}
        <a href={share.telegram} target="_blank" rel="noopener noreferrer">
          <Send size={24} color="currentColor" /> {/* Corrigido aqui */}
        </a>
        {/* Email Icon */}
        <a href={share.email} target="_blank" rel="noopener noreferrer">
          <Mail size={24} color="currentColor" />
        </a>
        {/* Copiar Link Button */}
        <button onClick={copyLink}>
          <Link size={24} color="currentColor" />
        </button>
        {/* Curtir Button */}
        <button onClick={handleLike}>
          <Heart size={24} color="currentColor" />
        </button>
      </div>

      {copyMessage && ( // Exibe a mensagem de cópia se houver
        <div className={styles.copyFeedback}>
          {copyMessage}
        </div>
      )}

      <div className={styles.meta}>
        <span>{data.views.toLocaleString()} visualizações</span>
        <span>{data.comments} comentário(s)</span>
        <span>{data.likes} curtida(s)</span>
      </div>
    </div>
  );
};

export default BlogShare;
