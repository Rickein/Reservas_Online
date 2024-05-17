const { consultaUsuarios } = require("../querys/usuarios");
const { consultaReservas } = require("../querys/reservas");

async function GeraReservas(local, data, espacos) {

    const reservas = await consultaReservas(local, data);
    const usuarios = await consultaUsuarios();

    function verificaID(value) {
        return value.id_espacos == local;
    }

    const espacoSelecionado = espacos.filter(verificaID);
    const nomeLocal = espacoSelecionado[0].local;
    const quantidadeLugares = espacoSelecionado[0].lugares;

    function encontrarUsuarioPorId(lista, usuario_id) {
        return lista.filter(usuario => usuario.usuario_id == usuario_id);
    }

    function encontrarHorarioReservado(lista, horario) {
        return lista.filter(h => h.horario == horario);
    }

    function verificarExistenciaHorario(listaReservas, horario) {

        for (let i = 0; i < listaReservas.length; i++) {
            if (listaReservas[i].horario == horario) {
                return true;
            }
        }
        return false;
    }

    const ReservasFormatadas = [];

    const listaHorarios = [
        '08:00~09:00',
        '09:00~10:00',
        '10:00~11:00',
        '11:00~12:00',
        '12:00~13:00',
        '13:00~14:00',
        '14:00~15:00',
        '15:00~16:00',
        '16:00~17:00',
        '17:00~18:00',
    ];

    for (let i = 0; i < listaHorarios.length; i++) {
        const horarioExiste = verificarExistenciaHorario(reservas, listaHorarios[i]);

        if (horarioExiste) {

            const reservaEncontrada = encontrarHorarioReservado(reservas, listaHorarios[i]);
            const usuarioReserva = encontrarUsuarioPorId(usuarios, reservaEncontrada[0].usuario_id);

            const reserva = {
                data_reserva: reservaEncontrada[0].data_reserva,
                id_espacos: local,
                horario: reservaEncontrada[0].horario,
                espaco: nomeLocal,
                lugares: quantidadeLugares,
                reservadoPor: usuarioReserva[0].nome,
                disponibilidade: 'Reservado'
            }
            ReservasFormatadas.push(reserva);

        } else {

            const reserva = {
                data_reserva: data,
                horario: listaHorarios[i],
                id_espacos: local,
                espaco: nomeLocal,
                lugares: quantidadeLugares,
                reservadoPor: "",
                disponibilidade: 'Disponivel'
            }
            ReservasFormatadas.push(reserva);
        }

    }
    
    
    return ReservasFormatadas
}

module.exports = { GeraReservas }