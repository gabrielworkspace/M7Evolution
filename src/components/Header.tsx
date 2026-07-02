import './Header.css';

export function Header() {
  return (
    <header className="header-container">
      <div className="logo">
        <strong>M7</strong>Evolution
      </div>
      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">services</a>
      </nav>
      <a
        href="https://wa.me/5521999269124"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-btn"
      >
        Contato
      </a>
    </header>
  );
}
