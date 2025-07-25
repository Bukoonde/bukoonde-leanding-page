// Espera o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    const emailBtn = document.querySelector('#incompleteModal .modal-btn-primary');
    const incompleteModal = document.getElementById('incompleteModal');
    const videoModal = document.getElementById('videoModal');

    function showModal(modal) {
        if (!modal) return;
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        const focusable = modal.querySelector('button, [href], input, select, textarea');
        if (focusable) focusable.focus();
    }

    function closeModal(modal) {
        if (!modal) return;
        
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        
        if (modal.id === 'videoModal') {
            const iframe = modal.querySelector('iframe');
            if (iframe) {
                iframe.src = iframe.src;
            }
        }
    }

    function alertModalIncomplete() {
        showModal(incompleteModal);
    }

    function watchVideo() {
        showModal(videoModal);
    }

    if (emailBtn) {
        emailBtn.addEventListener('click', function() {
            const btn = this;
            const spinner = btn.querySelector('.loading-spinner');
            
            if (!btn || !spinner) return;
            
            btn.disabled = true;
            spinner.style.display = 'inline-block';
            btn.innerHTML = '<span class="loading-spinner"></span> Enviando...';
            
            setTimeout(() => {
                spinner.style.display = 'none';
                btn.innerHTML = 'Obrigado! Te avisaremos.';
                
                setTimeout(() => {
                    closeModal(incompleteModal);
                    btn.innerHTML = '<span class="loading-spinner" style="display: none;"></span> Me avise quando estiver pronto';
                    btn.disabled = false;
                }, 1500);
            }, 2000);
        });
    }

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            const modals = document.querySelectorAll('.modal.show');
            modals.forEach(modal => {
                closeModal(modal);
            });
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            const modals = document.querySelectorAll('.modal.show');
            if (modals.length > 0) {
                closeModal(modals[0]);
            }
        }
    });

    window.alertModalIncomplete = alertModalIncomplete;
    window.watchVideo = watchVideo;
});

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header-main');
    const head = document.querySelector('.head');
    const containerHero = document.querySelector('.container-hero');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) { // Quando rolar mais de 100px
            header.classList.add('fixed-header');
            head.classList.add('fixed-head');
            
            if (currentScroll > lastScroll) {
                header.classList.add('header-shadow');
            } else {
                header.classList.remove('header-shadow');
            }
        } else {
            header.classList.remove('fixed-header');
            head.classList.remove('fixed-head');
            header.classList.remove('header-shadow');
        }
        
        lastScroll = currentScroll;
    });
});