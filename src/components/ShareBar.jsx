// src/components/BlogShare/BlogShare.jsx
import React from "react";
import styles from "./BlogShare.module.css";

const BlogShare = ({ views = 0, comments = 0, likes = 0 }) => {
  const currentURL = window.location.href;

  const share = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentURL)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentURL)}`
  };

  const copyLink = () => {
    navigator.clipboard.writeText(currentURL);
    alert("Link copiado!");
  };

  return (
    <div className={styles.shareContainer}>
      <div className={styles.icons}>
        <a href={share.facebook} target="_blank" rel="noopener noreferrer">f</a>
        <a href={share.twitter} target="_blank" rel="noopener noreferrer">𝕏</a>
        <a href={share.linkedin} target="_blank" rel="noopener noreferrer">in</a>
        <button onClick={copyLink}>🔗</button>
      </div>

      <div className={styles.meta}>
        <span>{views.toLocaleString()} visualizações</span>
        <span>{comments} comentário</span>
        <span>{likes} <span className={styles.heart}>❤️</span></span>
      </div>
    </div>
  );
};

export default BlogShare;
