const { consultaUsuarios } = require("../querys/usuarios");
const { consultaReservaUsuario } = require("../querys/reservas");
const { consultaEspacos } = require("../querys/espacos");

async function GeraMinhaReserva(idUsuario) {

    const Reservas = await consultaReservaUsuario(idUsuario);
    const usuarios = await consultaUsuarios();
    const espacos = await consultaEspacos();

    function encontrarUsuarioPorId(lista, usuario_id) {
        return lista.filter(usuario => usuario.usuario_id == usuario_id);
    }
    const usuarioDaReserva = encontrarUsuarioPorId(usuarios, idUsuario);
    const minhasReservas = [];

    function encontraLocal(lista, idLocal) {
        return lista.filter(local => local.id_espacos == idLocal);
    }

    Reservas.forEach(element => {
        const espacoSelecionado = encontraLocal(espacos, element.id_espacos);
        const reserva = {
            data_reserva: element.data_reserva,
            id_espacos: element.id_espacos,
            horario: element.horario,
            espaco: espacoSelecionado[0].local,
            lugares: espacoSelecionado[0].lugares,
            reservadoPor: usuarioDaReserva[0].nome,
            disponibilidade: 'Reservado'
        }
        minhasReservas.push(reserva);
    });

    minhasReservas.sort((a, b) => {
        const dataA = new Date(a.data_reserva);
        const dataB = new Date(b.data_reserva);
        return dataA - dataB;
    });

    return minhasReservas
}


module.exports = { GeraMinhaReserva }