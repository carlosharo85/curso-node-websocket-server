const express = require('express');
const cors = require('cors');

const { socketController } = require('../sockets/controller');


class Server {

    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        // paths
        this.paths = {}

        // Middlewares
        this.middlewares();
        
        // Rutas de Applicacion
        this.routes();

        // Sockets
        this.sockets();
    }

    middlewares() {
        // cors
        this.app.use(cors());

        // directorio publico
        this.app.use(express.static(__dirname+'/../public'));
    }

    routes() {
        //this.app.use(this.paths.auth, require('../routes/auth'));
    }

    sockets() {
        this.io.on('connection', socketController);
    }

    listen() {
        this.server.listen(this.PORT, () => {
            console.log(`Escuchando en el puerto: ${this.PORT}`);
        });
    }
}


module.exports = Server;