const { Espaco, sequelize } = require("../database/database")

async function consultaEspacos() {

    try {
        const resultado = await Espaco.findAll({
            attributes: ["id_espacos", "local", "lugares", "situacao"]
        });
        const espacos = [];
        resultado.forEach(item => {
            espacos.push(item.dataValues);
        })

        return espacos
    }
    catch (error) {
        console.error("Erro na consulta", error);
        throw error
    }
    // finally {
    //     await sequelize.close();
    // }
}

async function consultaEspacosAtivos() {

    try {
        const espacosAtivos = [];
        const resultado = await Espaco.findAll({
            where: { situacao: "A" },
            attributes: ["id_espacos", "local", "lugares", "situacao"]
        });

        resultado.forEach(item => {
            espacosAtivos.push(item.dataValues);
        })
        
        return espacosAtivos
    }
    catch (error) {
        console.error("Erro na consulta", error);
        throw error
    }
}



async function consultaEspacosporID(id) {

    try {
        const espacosAtivos = [];
        const resultado = await Espaco.findAll({
            where: { id_espacos: id },
            attributes: ["id_espacos", "local", "lugares", "situacao"]
        });

        resultado.forEach(item => {
            espacosAtivos.push(item.dataValues);
        })
        
        return espacosAtivos
    }
    catch (error) {
        console.error("Erro na consulta", error);
        throw error
    }
}

async function InserirNovoEspaco(nome, lugares) {

    const novo = Espaco.build({
        local: nome,
        lugares: lugares,
        situacao: "A"
    });

    // Salvar os dados no banco de dados
    novo.save().then(() => {
        console.log('Novo Espaco inserido com sucesso!');
    }).catch(err => {
        console.error('Erro ao inserir dados:', err);
    });
}


async function AlterarEspacoExistente(nome, lugares, situacao, id) {

    Espaco.update({ local: nome, lugares: lugares, situacao: situacao }, {
        where: { id_espacos: id }
    }).then((resultado) => {
        console.log('Espaco alterado atualizados com sucesso!');
    }).catch((err) => {
        console.error('Erro ao atualizar dados:', err);
    });
}

module.exports = { consultaEspacos, consultaEspacosAtivos, InserirNovoEspaco, AlterarEspacoExistente,consultaEspacosporID };