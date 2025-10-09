// src/components/BlogShare.jsx
import React, { useEffect, useState } from "react";
import styles from "../styles/BlogShare.module.css";
import { db } from "../services/firebaseBlog";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment
} from "firebase/firestore";

import {
  Facebook,
  Twitter,
  Instagram,
  MessageCircle,
  Send,
  Mail,
  Link,
  Heart
} from "lucide-react";

const BlogShare = ({ slug }) => {
  const [data, setData] = useState({ views: 0, likes: 0, comments: 0 });
  const [copyMessage, setCopyMessage] = useState("");
  const currentURL = window.location.href;

  // Links de compartilhamento
  const share = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentURL)}&text=${encodeURIComponent(
      "Confira este post no blog!"
    )}`,
    instagram: `https://www.instagram.com/zerovintegarage/`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
      "Confira este post: " + currentURL
    )}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(currentURL)}&text=${encodeURIComponent(
      "Confira este post: "
    )}`,
    email: `mailto:?subject=${encodeURIComponent(
      "Confira este post no blog!"
    )}&body=${encodeURIComponent("Olá! Achei este post interessante: " + currentURL)}`
  };

  // Buscar e atualizar dados no Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ref = doc(db, "posts", slug);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setData(snap.data());
          await updateDoc(ref, { views: increment(1) });
        } else {
          await setDoc(ref, { views: 1, likes: 0, comments: 0 });
          setData({ views: 1, likes: 0, comments: 0 });
        }
      } catch (err) {
        console.error("Erro ao buscar post:", err);
      }
    };

    fetchData();
  }, [slug]);

  // Copiar link
  const copyLink = () => {
    navigator.clipboard.writeText(currentURL);
    setCopyMessage("Link copiado!");
    setTimeout(() => setCopyMessage(""), 3000);
  };

  // Curtir post
  const handleLike = async () => {
    try {
      const ref = doc(db, "posts", slug);
      await updateDoc(ref, { likes: increment(1) });
      setData((prev) => ({ ...prev, likes: prev.likes + 1 }));
    } catch (err) {
      console.error("Erro ao curtir post:", err);
    }
  };

  return (
    <div className={styles.shareContainer}>
      <div className={styles.icons}>
        <a href={share.facebook} target="_blank" rel="noopener noreferrer">
          <Facebook size={24} />
        </a>
        <a href={share.twitter} target="_blank" rel="noopener noreferrer">
          <Twitter size={24} />
        </a>
        <a href={share.instagram} target="_blank" rel="noopener noreferrer">
          <Instagram size={24} />
        </a>
        <a href={share.whatsapp} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={24} />
        </a>
        <a href={share.telegram} target="_blank" rel="noopener noreferrer">
          <Send size={24} />
        </a>
        <a href={share.email} target="_blank" rel="noopener noreferrer">
          <Mail size={24} />
        </a>
        <button onClick={copyLink}>
          <Link size={24} />
        </button>
        <button onClick={handleLike}>
          <Heart size={24} />
        </button>
      </div>

      {copyMessage && (
        <div className={styles.copyFeedback}>{copyMessage}</div>
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
