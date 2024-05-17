const { Reservas, sequelize } = require("../database/database");


async function consultaReservas(idEspaco, Horario) {

    try {

        var reservas = [];
        const resultado = await Reservas.findAll({
            where: {
                id_espacos: idEspaco,
                data_reserva: Horario
            }
        });

        resultado.forEach(item => {
            reservas.push(item.dataValues);
        });

        return reservas;

    } catch (err) {
        console.error('Erro ao consultar dados:', err);
        throw err;
    }
}

async function consultaReservaUsuario(idUsuario) {

    try {
        var reservas = [];
        const resultado = await Reservas.findAll({
            where: {
                usuario_id: idUsuario,
            }
        });

        resultado.forEach(item => {
            reservas.push(item.dataValues);
        });

        return reservas;

    } catch (err) {
        console.error('Erro ao consultar dados:', err);
        throw err;
    }
}

async function InserirNovaReserva(idLocal, data, horario, idUsuario) {

    try {
        const novo = await Reservas.create({
            data_reserva: data,
            horario: horario,
            id_espacos: idLocal,
            usuario_id: idUsuario
        });

        console.log('Nova Reserva inserida com sucesso!');
        return novo;

    } catch (err) {
        console.error('Erro ao inserir dados:', err);
        throw err;
    }
}


async function removerReserva(horario, idEspaco, data) {
    try {
        return await Reservas.destroy({
            where: {
                data_reserva: data,
                horario: horario,
                id_espacos: idEspaco
            }
        });
    } catch (err) {
        console.error('Erro ao excluir registros:', err);
        throw err;
    }
}

module.exports = { consultaReservas, InserirNovaReserva, removerReserva,consultaReservaUsuario }
