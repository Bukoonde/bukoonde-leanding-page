// Inicializa AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // Menu mobile toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Fecha o menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Fechar menu ao clicar fora dele
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-menu') && !event.target.closest('.mobile-menu-btn') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Modal functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focar no primeiro elemento interativo do modal para acessibilidade
        const focusableElement = modal.querySelector('button, input, textarea, select, a');
        if (focusableElement) {
            focusableElement.focus();
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        
        if (modalId === 'videoModal') {
            const iframe = modal.querySelector('iframe');
            if (iframe) {
                iframe.src = iframe.src; // Reset video
            }
        }
    }
}

function alertModalIncomplete() {
    showModal('incompleteModal');
}

function watchVideo() {
    showModal('videoModal');
}

function submitNotification() {
    const emailInput = document.getElementById('notificationEmail');
    const submitBtn = document.querySelector('#incompleteModal .modal-btn-primary');
    const spinner = submitBtn.querySelector('.loading-spinner');
    
    // Validação de email
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || !emailRegex.test(email)) {
        emailInput.focus();
        emailInput.style.borderColor = 'var(--error)';
        return;
    }
    
    // Simula envio
    submitBtn.disabled = true;
    spinner.style.display = 'inline-block';
    submitBtn.innerHTML = '<span class="loading-spinner"></span> Enviando...';
    
    setTimeout(() => {
        spinner.style.display = 'none';
        submitBtn.innerHTML = 'Obrigado! Te avisaremos.';
        submitBtn.style.backgroundColor = 'var(--success)';
        
        // Salvar email no localStorage (simulação)
        let notifications = JSON.parse(localStorage.getItem('notificationEmails') || '[]');
        notifications.push({ email, date: new Date().toISOString() });
        localStorage.setItem('notificationEmails', JSON.stringify(notifications));
        
        setTimeout(() => {
            closeModal('incompleteModal');
            submitBtn.innerHTML = '<span class="loading-spinner" style="display: none;"></span> Me avise quando estiver pronto';
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '';
            emailInput.value = '';
            emailInput.style.borderColor = '';
        }, 1500);
    }, 2000);
}

// Fecha modal ao clicar fora
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            closeModal(modal.id);
        });
    }
});

// Fecha modal com ESC
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        const modals = document.querySelectorAll('.modal.show');
        if (modals.length > 0) {
            closeModal(modals[0].id);
        }
    }
});

// Adicionar teclado navigation para acessibilidade
document.addEventListener('keydown', function(event) {
    // Trap tab dentro do modal aberto
    if (document.querySelector('.modal.show')) {
        const modal = document.querySelector('.modal.show');
        const focusableElements = modal.querySelectorAll('button, input, textarea, select, a');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (event.key === 'Tab') {
            if (event.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    event.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    event.preventDefault();
                }
            }
        }
    }
});

// Service Worker para cache e funcionamento offline (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}