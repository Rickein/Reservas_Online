function AutenticarLogin() {

    Carregamento();

    // let nome = $("#NewName").val();
    let email = $('#emailLogin').val();
    let senha = $('#passwordLogin').val();

    if (email == "" || senha == "") {

        Carregamento();

        Swal.fire({
            title: "Login e/ou senha não informado",
            text: "Verifique seus dados e tente novamente",
            icon: "info"
        });
        return
    }

    GetLogin(email, senha);
}

function NovoUsuario() {

    Carregamento();

    let nome = $("#NewName").val();
    let email = $('#NewEmail').val();
    let senha = $('#NewPassword').val();

    if (email == "" || senha == "" || nome == "") {

        Swal.fire({
            title: "Existem campos não preenchidos",
            text: "Verifique os dados e tente novamente",
            icon: "info"
        });
        Carregamento();

        return
    }

    PostLogin(nome, email, senha);
}


function GetLogin(email, senha) {

    $.ajax({
        type: "POST",
        url: "/login/validaLogin",
        data: {
            "Email": email,
            "Senha": senha,
        },
        success: function (r) {
            if (r.resultado == "logado") {
                window.location.href = "/reservasOnline";
            }
        },
        error: function (xhr, status, error) {
            if (xhr.status == 404) {
                Swal.fire({
                    title: "Login e/ou senha inválidos",
                    text: "Verifique seus dados e tente novamente",
                    icon: "info"
                });
                Carregamento();
            } else {
                console.error("Erro na requisição:", error);
            }
        },
        dataType: "json"
    });

}

function PostLogin(nome, email, senha) {

    $.ajax({
        type: "POST",
        url: "/login",
        data: {
            "Nome": nome,
            "Email": email,
            "Senha": senha,
        },
        success: function (r) {
            if (r.resultado == "criado") {
                Carregamento();
                $('#novo_cadastro')[0].reset();
                $('#modal-cadastro').modal('toggle');
                Swal.fire({
                    title: "Usuario criado com sucesso",
                    text: "Prossiga com o acesso a plataforma",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        },
        error: function (xhr, status, error) {
            if (xhr.status == 400) {
                Carregamento();

                var resposta = JSON.parse(xhr.responseText); 
                var mensagem = resposta.mensagem; 
                Swal.fire({
                    title: "Algo deu Errado",
                    text: mensagem,
                    icon: "info",
                });
            } else {
                console.error("Erro na requisição:", error);
            }
        },
        dataType: "json"
    });
}

function Carregamento() {
    $('.body-loader').toggle();
}