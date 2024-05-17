const { consultaEspacosAtivos } = require("../querys/espacos");
const { InserirNovaReserva, removerReserva } = require("../querys/reservas");
const { GeraReservas } = require("../services/reservas");

async function telaInicial(req, res) {
    const espacos = await consultaEspacosAtivos();
    res.render('reservasOnline', { espacos: espacos });
}

async function getReservas(req, res) {
    const local = req.params.local;
    const data = req.params.dia;
    const espacos = await consultaEspacosAtivos();
    const reservas = await GeraReservas(local, data, espacos);
    res.render('reservas', { espacos: espacos, reservas: reservas });
}

async function getOnlyReservas(req, res) {
    const local = req.params.local;
    const data = req.params.dia;
    const espacos = await consultaEspacosAtivos();
    const reservas = await GeraReservas(local, data, espacos);
    res.status(200).send(({ reservas: reservas }));
}

async function postReservas(req, res) {

    const novasReservas = req.body.novasReservas;

    try {
        for (const element of novasReservas) {
            await InserirNovaReserva(element.idLocal, element.dataFormatada, element.horario, element.idUsuario);
        }
        res.status(201).send(({ resultado: 'criado' }));
    }
    catch (e) {
        return res.status(400).send(({ resultado: "invalido", mensagem: e.message }));
    }
}


async function deleteReservas(req, res) {

    const horario = req.body.Horario;
    const idEspaco = req.body.IdEspaco;
    const data = req.body.Data;

    try {
        await removerReserva(horario, idEspaco, data);
        return res.status(200).send(({ resultado: "removido" }));
    }
    catch (e) {
        return res.send(({ resultado: "invalido", mensagem: e.message }));
    }
}

module.exports = {
    telaInicial, getReservas, postReservas, deleteReservas,getOnlyReservas
}
