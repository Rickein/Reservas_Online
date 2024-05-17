const { sequelize, Usuarios } = require("../database/database");

async function consultaUsuarios() {
    var usuarios = [];
    try {
        const resultado = await Usuarios.findAll();
        resultado.forEach(item => {
            usuarios.push(item.dataValues);
        });
        return usuarios;
    }
    catch (err) {
        console.error('Erro ao consultar dados:', err);
        throw err
    };
}


async function consultaUsuario(email, senha) {
    var usuarios = [];
    try {

        const resultado = await Usuarios.findAll({
            where: {
                email: email,
                senha: senha
            }
        });
        resultado.forEach(item => {
            usuarios.push(item.dataValues);
        });
        return usuarios;
    }
    catch (err) {
        console.error('Erro ao consultar dados:', err);
        throw err
    };
}

async function consultaUsuarioID(idUsuario) {
    var usuarios = [];
    try {

        const resultado = await Usuarios.findAll({
            where: {
                usuario_id: idUsuario,
            }
        });
        resultado.forEach(item => {
            usuarios.push(item.dataValues);
        });
        return usuarios;
    }
    catch (err) {
        console.error('Erro ao consultar dados:', err);
        throw err
    };
}

async function inserirUsuario(Nome, Email, Senha) {

    try {
        const novo = await Usuarios.create({
            nome: Nome,
            email: Email,
            senha: Senha,
        });

        console.log('Novo usuario inserido com sucesso!');
        return novo;

    } catch (err) {
        console.error('Erro ao inserir dados:', err);
        throw err;
    }
}

module.exports = { consultaUsuarios, consultaUsuario,consultaUsuarioID, inserirUsuario }