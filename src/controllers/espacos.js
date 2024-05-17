const { consultaEspacos, InserirNovoEspaco, AlterarEspacoExistente,consultaEspacosporID } = require("../querys/espacos")

async function telaInicial(req, res) {
    const espacos = await consultaEspacos();
    res.render('gestaoEspaco', { espacos: espacos });
}



async function espacos(req, res) {
    const espacos = await consultaEspacos();
    res.status(200).send(({ espacos: espacos }));
}


async function espaco(req, res) {
    const idUsuario = req.params.id;
    const espacos = await consultaEspacosporID(idUsuario);
    
    if (espacos.length == 0) {
        res.status(404).send(({ resultado: 'sem resultados' }));
    } else {
        res.status(200).send(({ espacos: espacos }));
    }
}

async function novoEspaco(req, res) {

    const nome = req.body.Nome;
    const lugares = req.body.Lugares;

    try {
        await InserirNovoEspaco(nome, lugares);
        return res.status(201).send(({ resultado: "criado" }));
    }
    catch (e) {
        return res.status(400).send(({ resultado: "erro", mensagem: e.message }));
    }
}

async function alterarEspaco(req, res) {

    const nome = req.body.Nome;
    const lugares = req.body.Lugares;
    const situacao = req.body.Situacao;
    const id = req.body.Id;

    try {
        await AlterarEspacoExistente(nome, lugares, situacao, id);
        return res.status(200).send(({ resultado: "criado" }));
    }
    catch (e) {
        return res.status(400).send(({ resultado: "erro", mensagem: e.message }));
    }
}

module.exports = {
    telaInicial, novoEspaco, alterarEspaco,espacos,espaco
}
