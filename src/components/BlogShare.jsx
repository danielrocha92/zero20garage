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

const BlogShare = ({ slug }) => {
  const [data, setData] = useState({ views: 0, likes: 0, comments: 0 });
  const currentURL = window.location.href;

  const share = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentURL)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentURL)}`
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
    alert("Link copiado!");
  };

  const handleLike = async () => {
    const ref = doc(db, "posts", slug);
    await updateDoc(ref, { likes: increment(1) });
    setData(prev => ({ ...prev, likes: prev.likes + 1 }));
  };

  return (
    <div className={styles.shareContainer}>
      <div className={styles.icons}>
        <a href={share.facebook} target="_blank" rel="noopener noreferrer">f</a>
        <a href={share.twitter} target="_blank" rel="noopener noreferrer">𝕏</a>
        <a href={share.linkedin} target="_blank" rel="noopener noreferrer">in</a>
        <button onClick={copyLink}>🔗</button>
        <button onClick={handleLike}>❤️</button>
      </div>

      <div className={styles.meta}>
        <span>{data.views.toLocaleString()} visualizações</span>
        <span>{data.comments} comentário(s)</span>
        <span>{data.likes} curtida(s)</span>
      </div>
    </div>
  );
};

export default BlogShare;
