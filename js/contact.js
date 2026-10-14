
document.addEventListener('DOMContentLoaded', function() {
    
    lucide.createIcons();

    const formulario = document.getElementById('formularioContacto');
    const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');

    if (formulario) {
    
        formulario.addEventListener('submit', function(evento) {
            
    
            evento.preventDefault(); 


            mensajeConfirmacion.style.display = 'block';

            formulario.reset();


            setTimeout(function() {
                mensajeConfirmacion.style.display = 'none';
            }, 5000);
        });
    }
});