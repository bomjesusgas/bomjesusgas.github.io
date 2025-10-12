document.addEventListener('DOMContentLoaded', () => {

    // 1. Smooth Scrolling
    // Permite rolar suavemente para as seções ao clicar nos links de navegação.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            // Corrige o bug de rolagem se o elemento não for encontrado
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    // Começa a rolagem logo após o header fixo
                    block: 'start'
                });
            }
        });
    });

    // 2. Header Background and Shadow on Scroll
    // Adiciona um fundo mais sólido ao header após uma certa rolagem para melhorar a legibilidade.
    const header = document.querySelector('header');
    
    const updateHeaderStyle = () => {
        if (window.scrollY > 100) {
            // Fundo semi-transparente para o efeito 'glass' no scroll
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.4)';
        } else {
            // Fundo mais transparente no topo da página
            header.style.backgroundColor = '#000000'; 
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    };

    window.addEventListener('scroll', updateHeaderStyle);
    updateHeaderStyle(); // Executa uma vez ao carregar a página

    // 3. Animate Elements on Scroll (Intersection Observer)
    // Faz os cards (Service Card e Contact Item) aparecerem suavemente ao entrar na tela.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Para de observar depois que o elemento é animado para economizar recursos
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Inicia a animação quando o elemento estiver 10% visível
        threshold: 0.1
    });

    document.querySelectorAll('.service-card, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // 4. Click Tracking for CTA Buttons (Opcional - para Analytics)
    // Registra um evento no console sempre que um botão de ação for clicado.
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function() {
            // Isso seria substituído por um evento de Google Analytics (dataLayer.push)
            console.log('Botão de Chamada para Ação Clicado:', this.textContent.trim());
        });
    });

    /*
    * OBSERVAÇÃO: Implementação do Menu Mobile (Hambúrguer)
    *
    * Se você adicionar um botão de menu (hambúrguer) no seu HTML,
    * você pode descomentar o bloco abaixo para criar a funcionalidade mobile.
    */
    /*
    // const navToggle = document.getElementById('nav-toggle'); 
    // const navLinks = document.querySelector('.nav-links');

    // if (navToggle) {
    //     navToggle.addEventListener('click', () => {
    //         navLinks.classList.toggle('active');
    //     });
    // }
    */

});