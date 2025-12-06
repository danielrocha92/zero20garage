import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import '../styles/Layout.css'; // Reusing Layout styles for consistency

const PageTransition = () => {
  return (
    <div className="page-transition">
      <div className="lottie-wrapper">
        <DotLottieReact
          src="https://lottie.host/9a3cc803-f9e3-448d-8648-42066290a6e2/46Wa3QqE3a.lottie"
          autoplay
          loop
          speed={2.5}
        />
      </div>
    </div>
  );
};

export default PageTransition;