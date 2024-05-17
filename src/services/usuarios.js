function removerSenha(usuarios) {
    for (let usuario of usuarios) {
        delete usuario.senha;
    }
}


module.exports = { removerSenha }