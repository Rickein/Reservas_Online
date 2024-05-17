const {consultaUsuario, inserirUsuario } = require("../querys/usuarios");

async function telaLogin(req, res) {
    if (req.session.login) {
        res.redirect('reservasOnline');
    } else {
        res.render('login');
    }
}

async function validaLoginUsuario(req, res) {

    const email = req.body.Email;
    const senha = req.body.Senha;

    const usuario = await consultaUsuario(email, senha);

    if (usuario.length == 0) {
        res.status(404).send(({ resultado: 'invalido' }));
    } else {
        req.session.login = usuario[0].usuario_id;
        res.cookie('usuario', req.session.login, { maxAge: 4600000 });
        res.status(200).send(({ resultado: 'logado' }));
    }
}

async function NovoUsuario(req, res) {

    const Nome = req.body.Nome;
    const Email = req.body.Email;
    const Senha = req.body.Senha;

    try {
        await inserirUsuario(Nome, Email, Senha);
        res.status(201).send(({ resultado: 'criado' }));
    }
    catch (e) {
        res.status(400).send(({ resultado: 'erro', mensagem: e.message }));
    }
}

module.exports = {
    telaLogin, validaLoginUsuario, NovoUsuario
}
