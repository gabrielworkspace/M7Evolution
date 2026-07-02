import { useEffect, useState } from 'react';
import './FireParticles.css';

export function FireParticles() {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number; drift: number }>>([]);

  useEffect(() => {
    // Generate random spark particles
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // random start horizontal position
      delay: Math.random() * 5, // random delay before starting
      duration: 3 + Math.random() * 4, // random duration between 3s and 7s
      size: 2 + Math.random() * 4, // random size between 2px and 6px
      drift: (Math.random() - 0.5) * 40, // random horizontal drift
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="particles-container">
      {particles.map(p => (
        <div
          key={p.id}
          className="fire-particle"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            '--drift': `${p.drift}px`, // Custom property for horizontal drift
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
