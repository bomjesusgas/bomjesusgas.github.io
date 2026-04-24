/**
 * Testimonials Carousel - Efeito Premium de Deslizamento
 * Adaptado para William F. Betioli
 */

const testimonials = [
    { id: 1, name: "", initials: "ML", text: "Compro deles a dois anos, sempre muito bem atendida, sempre entregando com agilidade, e instalando o gás para nós. Uma grande parceria pode-se confiar, e além de tudo preço muito justo... obg por poder contar sempre com a excelência de vocês 🙏🏻" },
    { id: 2, name: "Jonas Roberto Tobias", initials: "JT", text: "Atendimento rápido assim como a entrega. Super recomendo 🙂" },
    { id: 3, name: "João Tonhati", initials: "JT", text: "Chegou muito rápido. Eu estava cozinhando quando acabou o gás, chegaram pra trocar antes da panela perder a pressão." },
    { id: 4, name: "Tállita Rodrigues", initials: "TR", text: "Sempre muito rápido e com um atendimento ótimo, não compro em outro lugar de jeito nenhum" },
    { id: 5, name: "Edson Bacarolo", initials: "EB", text: "Ligeiro e prestativo, até a borrachinha de vedação o cara troca. Nunca tinha visto isso. Estão de parabéns 👏👏👏" },
    { id: 6, name: "Samuel Pugliano", initials: "SP", text: "Entrega muito rápida, na minha casa chegou em menos de 10 minutos. Atendimento muito bom" },
    { id: 7, name: "Jane Feitosa", initials: "JF", text: "Só compro gás com eles não troco 👏" },
    { id: 8, name: "Realidade Impressionante", initials: "RI", text: "Atendimento rápido e atencioso, e o melhor pelo whatsapp, agora não fico mais sem gás a qualquer hora e dia!" },
    { id: 9, name: "Elizete Vitta", initials: "EV", text: "Ótima em tudo, valor, precisão total na entrega, muito bom atendimento tanto na recepção como no pessoal nota 10" },
    { id: 10, name: "Antonio Rabac", initials: "AR", text: "Precisei de um gás após o horário comercial e vocês me atenderam muito rápido obrigado, recomendo, atendimento nota 10" },
    { id: 11, name: "Mélzinha Costa", initials: "MC", text: "Ótimo atendimento, Gás de qualidade, atendimento sempre na hora, e ótimas pessoas... 😉" }
];

class TestimonialsCarousel {
    constructor() {
        this.wrapper = document.querySelector('.testimonials-wrapper');
        // Seleciona os botões pelas classes do seu style.css
        const buttons = document.querySelectorAll('.carousel-btn');
        this.prevBtn = buttons[0];
        this.nextBtn = buttons[1];
        
        this.cardElements = [];
        this.cardSize = 365;
        
        this.init();
    }

    init() {
        if (!this.wrapper) return;
        
        this.updateCardSize();
        this.createInitialCards(); // Cria apenas uma vez
        this.updateCardsLayout();  // Posiciona
        this.attachEvents();
        
        window.addEventListener('resize', () => {
            this.updateCardSize();
            this.updateCardsLayout();
        });
    }

    updateCardSize() {
        if (window.matchMedia('(max-width: 480px)').matches) {
            this.cardSize = 260;
        } else if (window.matchMedia('(max-width: 768px)').matches) {
            this.cardSize = 290;
        } else {
            this.cardSize = 365;
        }
    }

    createInitialCards() {
        this.wrapper.innerHTML = ''; 
        // Criamos os elementos físicos no DOM
        this.cardElements = testimonials.map((t) => {
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            card.innerHTML = `
                <div class="testimonial-avatar">${t.initials}</div>
                <h3 class="testimonial-text">"${t.text}"</h3>
                <p class="testimonial-author">- ${t.name}</p>
            `;
            this.wrapper.appendChild(card);
            return card;
        });
    }

    updateCardsLayout() {
        this.cardElements.forEach((card, index) => {
            // Lógica matemática do React para definir quem é o centro
            const position = this.cardElements.length % 2
                ? index - (this.cardElements.length + 1) / 2
                : index - this.cardElements.length / 2;
            
            const isCenter = position === 0;

            // Atualiza as classes do seu CSS
            if (isCenter) {
                card.classList.add('center');
            } else {
                card.classList.remove('center');
            }
            
            // Aplica os estilos de movimento que o CSS irá animar
            card.style.width = `${this.cardSize}px`;
            card.style.height = `${this.cardSize}px`;

            const translateX = (this.cardSize / 1.5) * position;
            const translateY = isCenter ? -65 : position % 2 ? 15 : -15;
            const rotate = isCenter ? 0 : position % 2 ? 2.5 : -2.5;

            // Aqui acontece a mágica do deslizamento:
            card.style.transform = `
                translate(-50%, -50%) 
                translateX(${translateX}px)
                translateY(${translateY}px)
                rotate(${rotate}deg)
            `;

            // Controle de profundidade e visibilidade
            card.style.zIndex = isCenter ? "10" : "0";
            // Esconde cards que estão muito longe nas laterais para não quebrar o layout
            card.style.opacity = Math.abs(position) > 2 ? "0" : "1"; 
            card.style.pointerEvents = Math.abs(position) > 1 ? "none" : "auto";

            // Permite clicar no card lateral para trazê-lo ao centro
            card.onclick = () => this.handleMove(position);
        });
    }

    handleMove(steps) {
        if (steps === 0) return;

        // Reorganiza o array de elementos sem apagar nada do HTML
        if (steps > 0) {
            for (let i = 0; i < steps; i++) {
                this.cardElements.push(this.cardElements.shift());
            }
        } else {
            for (let i = 0; i > steps; i--) {
                this.cardElements.unshift(this.cardElements.pop());
            }
        }
        
        this.updateCardsLayout();
    }

    attachEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleMove(-1);
            });
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleMove(1);
            });
        }
    }
}

// Inicia o carrossel e as funções de scroll do site
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialsCarousel();

    // Header fixo ao rolar
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});