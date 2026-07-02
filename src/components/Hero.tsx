import './Hero.css';
import heroBg from '../assets/hero-bg.png';
import { FireParticles } from './FireParticles';

export function Hero() {
  return (
    <section className="hero-container">
      <div className="hero-bg" style={{ backgroundImage: `url(${heroBg})` }}></div>
      <div className="hero-blur-glow"></div>
      
      {/* Partículas de fogo animadas */}
      <FireParticles />
      
      <div className="hero-content">
        <h2 className="hero-text-consultoria animate-slide-up" style={{ animationDelay: '0.2s' }}>CONSULTORIA</h2>
        <h1 className="hero-text-online animate-slide-up" style={{ animationDelay: '0.4s' }}>ONLINE</h1>
        <p className="hero-text-desc animate-slide-up" style={{ animationDelay: '0.6s' }}>
          Treino personalizado para seus objetivos,<br />
          onde você estiver
        </p>
        <a
          href="https://wa.me/5521999269124"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-cta animate-slide-up pulse-button"
          style={{ animationDelay: '0.8s' }}
        >
          INICIAR MINHA AVALIAÇÃO AGORA
        </a>
      </div>
    </section>
  );
}
