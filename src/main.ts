import './style.css';

declare global {
  interface Window {
    openTestimonialModal: (id: string) => void;
    closeTestimonialModal: (id: string) => void;
  }
}

// Ensure lucide is available
declare const lucide: { createIcons: () => void };

document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Lucide Icons
    lucide.createIcons();

    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            if (window.scrollY === 0) {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // 2. Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // Lógica para o Modal dos Cartões (Indicado Para)
    const displayCards = document.querySelectorAll('.display-card');
    const cardModal = document.getElementById('cardModal');
    const cardModalClose = document.getElementById('cardModalClose');
    const cardModalBody = document.getElementById('cardModalBody');

    if (displayCards.length > 0 && cardModal && cardModalBody) {
        displayCards.forEach(card => {
            card.addEventListener('click', () => {
                // Copiar o conteúdo do card para o modal
                cardModalBody.innerHTML = card.innerHTML;
                
                // Mostrar o modal
                cardModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Evita rolagem da página
                
                // Reinicializar os ícones do Lucide dentro do modal recém criado
                if ((window as any).lucide) {
                    (window as any).lucide.createIcons({
                        root: cardModalBody
                    });
                }
            });
        });

        const closeModal = () => {
            cardModal.classList.remove('active');
            document.body.style.overflow = '';
            // Limpar o conteúdo após fechar para evitar IDs duplicados
            setTimeout(() => {
                if(!cardModal.classList.contains('active')) {
                    cardModalBody.innerHTML = '';
                }
            }, 400);
        };

        if (cardModalClose) {
            cardModalClose.addEventListener('click', closeModal);
        }

        cardModal.addEventListener('click', (e) => {
            if (e.target === cardModal) {
                closeModal();
            }
        });

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && cardModal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // 3. Magnetic Button Effect
    const magneticElements = document.querySelectorAll<HTMLElement>('.magnetic');
    
    magneticElements.forEach((elem) => {
        const parentWrapper = elem.parentElement;
        if (!parentWrapper) return;

        parentWrapper.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = elem.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;
            
            elem.style.transform = `translate(${distanceX * 0.3}px, ${distanceY * 0.3}px)`;
            elem.style.transition = 'transform 0.1s linear';
        });

        parentWrapper.addEventListener('mouseleave', () => {
            elem.style.transform = 'translate(0px, 0px)';
            elem.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });

    // 3.5 Bento Grid Infinite Carousel (Desktop Only)
    const bentoGrid = document.querySelector('.bento-grid');
    if (bentoGrid && window.innerWidth > 768) {
        // Primeiro, remover a classe 'reveal' de todos os cards
        const currentCards = Array.from(bentoGrid.children);
        currentCards.forEach(card => {
            card.classList.remove('reveal');
            card.classList.remove('active');
        });

        // Criar a primeira trilha (track) e mover os cards originais para ela
        const track1 = document.createElement('div');
        track1.className = 'carousel-track';
        currentCards.forEach(card => {
            track1.appendChild(card);
        });

        // Criar a segunda trilha clonando a primeira
        const track2 = track1.cloneNode(true) as HTMLElement;

        // Limpar o grid e adicionar as duas trilhas
        bentoGrid.innerHTML = '';
        bentoGrid.appendChild(track1);
        bentoGrid.appendChild(track2);

        bentoGrid.classList.add('carousel-active');
        
        // Reinicializar os ícones do Lucide dentro da grid
        if ((window as any).lucide) {
            (window as any).lucide.createIcons({
                root: bentoGrid
            });
        }
    }

    // 4. FAQ Accordion Logic
    const faqCards = document.querySelectorAll('.faq-card');
    faqCards.forEach(card => {
        const header = card.querySelector('.faq-header');
        if (header) {
            header.addEventListener('click', () => {
                const isOpen = card.classList.contains('open');
                
                // Close all cards
                faqCards.forEach(otherCard => {
                    otherCard.classList.remove('open');
                });

                // Toggle current card
                if (!isOpen) {
                    card.classList.add('open');
                }
            });
        }
    });

    // 4.6 Testimonial Modals
    window.openTestimonialModal = function(id: string) {
        const modal = document.getElementById(id);
        if(modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }
    };

    window.closeTestimonialModal = function(id: string) {
        const modal = document.getElementById(id);
        if(modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Pause any playing videos
            const videos = modal.querySelectorAll('video');
            videos.forEach(v => v.pause());
        }
    };

    // Close modal when clicking outside of the modal content
    const modals = document.querySelectorAll('.testimonial-modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (e: Event) => {
            if(e.target === modal) {
                window.closeTestimonialModal(modal.id);
            }
        });
    });

    // 5. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('open');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }
    // 6. Feedbacks Carousel Logic
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevReview');
    const nextBtn = document.getElementById('nextReview');
    let currentSlide = 0;

    const showSlide = (index: number) => {
        carouselSlides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    };

    if (prevBtn && nextBtn && carouselSlides.length > 0) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide > 0) ? currentSlide - 1 : carouselSlides.length - 1;
            showSlide(currentSlide);
        });

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide < carouselSlides.length - 1) ? currentSlide + 1 : 0;
            showSlide(currentSlide);
        });
    }
});
