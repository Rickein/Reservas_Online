const { GeraMinhaReserva } = require("../services/minhas_reservas");

async function getMinhasReservas(req, res) {

    const idUsuario = req.cookies.usuario;
    const reservas = await GeraMinhaReserva(idUsuario);
    res.render('minhasReservas', { reservas: reservas });
}

async function getReservasUsuario(req, res) {
    const usuario = req.params.idUsuario;
    const reservas = await GeraMinhaReserva(usuario);

    if (reservas.length == 0) {
        res.status(404).send(({ resultado: 'sem resultados' }));
    } else {
        res.status(200).send(({ reservas: reservas }));
    }

}

module.exports = {
    getMinhasReservas, getReservasUsuario
}
