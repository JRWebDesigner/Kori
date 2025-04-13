export const registerAnimations = () => {
  if (typeof window !== 'undefined') {
    const animateOnScroll = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animationType = element.getAttribute('data-animate') || 'fadeInUp';
          const duration = element.getAttribute('data-duration') || '0.8';
          const delay = element.getAttribute('data-delay') || '0';

          element.style.animation = `${animationType} ${duration}s ease-out ${delay}s forwards`;
          observer.unobserve(element);
        }
      });
    };

    const observer = new IntersectionObserver(animateOnScroll, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('[data-scroll]').forEach(el => observer.observe(el));
  }
};

// Animaciones CSS globales
export const injectAnimationStyles = () => {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeInLeft {
        from { opacity: 0; transform: translateX(-30px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes fadeInRight {
        from { opacity: 0; transform: translateX(30px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
      }
      @keyframes rotateIn {
        from { opacity: 0; transform: rotate(-5deg) scale(0.95); }
        to { opacity: 1; transform: rotate(0) scale(1); }
      }
      [data-scroll] {
        opacity: 0;
      }
    `;
    document.head.appendChild(style);
  }
};
