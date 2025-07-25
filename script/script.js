// Espera o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Cache de elementos
    const emailBtn = document.querySelector('#incompleteModal .modal-btn-primary');
    const incompleteModal = document.getElementById('incompleteModal');
    const videoModal = document.getElementById('videoModal');

    // Função para mostrar modal
    function showModal(modal) {
        if (!modal) return;
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Foco no primeiro elemento interativo para acessibilidade
        const focusable = modal.querySelector('button, [href], input, select, textarea');
        if (focusable) focusable.focus();
    }

    // Função para fechar modal
    function closeModal(modal) {
        if (!modal) return;
        
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        
        // Pausa vídeo se for a modal de vídeo
        if (modal.id === 'videoModal') {
            const iframe = modal.querySelector('iframe');
            if (iframe) {
                iframe.src = iframe.src; // Reinicia o vídeo
            }
        }
    }

    // Funções específicas para cada modal
    function alertModalIncomplete() {
        showModal(incompleteModal);
    }

    function watchVideo() {
        showModal(videoModal);
    }

    // Evento de clique no botão de e-mail
    if (emailBtn) {
        emailBtn.addEventListener('click', function() {
            const btn = this;
            const spinner = btn.querySelector('.loading-spinner');
            
            if (!btn || !spinner) return;
            
            btn.disabled = true;
            spinner.style.display = 'inline-block';
            btn.innerHTML = '<span class="loading-spinner"></span> Enviando...';
            
            // Simulação de envio
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

    // Fechar modal ao clicar fora
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            const modals = document.querySelectorAll('.modal.show');
            modals.forEach(modal => {
                closeModal(modal);
            });
        }
    });

    // Fechar com ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            const modals = document.querySelectorAll('.modal.show');
            if (modals.length > 0) {
                closeModal(modals[0]);
            }
        }
    });

    // Torna as funções disponíveis globalmente se necessário
    window.alertModalIncomplete = alertModalIncomplete;
    window.watchVideo = watchVideo;
});