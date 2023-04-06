const socket = io();

// Referencias de HTML
const statusOnline = document.querySelector('#statusOnline');
const statusOffline = document.querySelector('#statusOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');


socket.on('connect', () => {
    statusOnline.style.display = '';
    statusOffline.style.display = 'none';
});

socket.on('disconnect', () => {
    statusOnline.style.display = 'none';
    statusOffline.style.display = '';
});

socket.on('enviar-mensaje', (payload) => {
    console.log('Recibido desde el server', payload);
});

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;

    if (mensaje.length > 0) {
        const payload = {
            id: '12345',
            msg: mensaje,
            fecha: new Date().getTime()
        };

        socket.emit('enviar-mensaje', payload, ( id ) => {
            console.log('Enviado desde el cliente', id);
        });
    }
});