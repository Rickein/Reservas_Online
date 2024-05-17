const { consultaUsuarios, consultaUsuarioID, inserirUsuario } = require("../querys/usuarios");
const { removerSenha } = require("../services/usuarios");

async function getUsuarios(req, res) {
    const usuarios = await consultaUsuarios();
    removerSenha(usuarios);
    res.status(200).send(({ usuarios: usuarios }));
}


async function getUsuario(req, res) {
    const idUsuario = req.params.id;
    const usuario = await consultaUsuarioID(idUsuario);
    
    if (usuario.length == 0) {
        res.status(404).send(({ resultado: 'sem resultados' }));
    } else {
        removerSenha(usuario);
        res.status(200).send(({ usuario: usuario }));
    }
}

module.exports = { getUsuarios, getUsuario }