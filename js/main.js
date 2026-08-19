/**
 * ALTO NÍVEL · CONSTRUTORA E SERVIÇOS GERAIS
 * Scripts e interações
 */

(function() {
    'use strict';

    // ============================================
    // SCROLL SUAVE
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = document.querySelector('.navbar-alto').offsetHeight + 12;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({ top: targetPosition, behavior: 'smooth' });

                const navbarCollapse = document.getElementById('navMenu');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    new bootstrap.Collapse(navbarCollapse).hide();
                }
            }
        });
    });

    // ============================================
    // LINK ATIVO NO SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function updateActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 160;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('load', updateActiveLink);

    // ============================================
    // FORMULÁRIO DE ORÇAMENTO
    // ============================================
    const form = document.getElementById('formOrcamento');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            const nome = this.querySelector('input[placeholder="Seu nome"]');
            const telefone = this.querySelector('input[placeholder="(61) 9 9999-9999"]');
            const descricao = this.querySelector('textarea');

            if (!nome.value.trim() || !telefone.value.trim() || !descricao.value.trim()) {
                btn.innerHTML = '<i class="bi bi-exclamation-triangle me-2"></i>Preencha os campos obrigatórios';
                btn.style.background = '#dc3545';
                btn.style.color = '#fff';
                btn.style.border = 'none';

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                }, 3000);
                return;
            }

            btn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Enviado com sucesso!';
            btn.style.background = '#28a745';
            btn.style.color = '#fff';
            btn.style.border = 'none';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.color = '';
                btn.disabled = false;
                form.reset();

                const footNote = form.querySelector('.form-footnote');
                if (footNote) {
                    footNote.innerHTML = '<i class="bi bi-check-circle-fill text-success me-1"></i>Obrigado! Entraremos em contato em breve.';
                    setTimeout(() => {
                        footNote.innerHTML = '<i class="bi bi-shield-check me-1"></i>Respondemos em até 2 horas.';
                    }, 5000);
                }
            }, 3000);
        });
    }

    // ============================================
    // MÁSCARA DE TELEFONE
    // ============================================
    document.querySelectorAll('input[type="tel"]').forEach(input => {
        input.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 2) value = '(' + value;
                else if (value.length <= 7) value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
                else value = '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7, 11);
            }
            this.value = value;
        });
    });

    // ============================================
    // ANIMAÇÃO DE ENTRADA
    // ============================================
    if ('IntersectionObserver' in window) {
        const cards = document.querySelectorAll('.service-card, .mvv-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    console.log('🏗️ ALTO NÍVEL - Site carregado com sucesso!');
})();