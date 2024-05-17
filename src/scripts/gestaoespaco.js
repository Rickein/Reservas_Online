new DataTable('#table', {
    info: false,
    ordering: true,
    searching: false,
    paging: false
});

function editarEspaco(ID, espaco, lugares, situacao) {
    $('#situacao').fadeIn("slow");
    $(`.modal-title`)[0].innerHTML = 'Editar Local';
    $(`#editar-reserva`).show();
    $(`#salvar-reserva`).hide();

    var situacaoSelecionada = "";
    if (situacao == "A") {
        situacaoSelecionada = "Ativo";
    } else {
        situacaoSelecionada = "Inativo";
    }

    $('#editar-reserva').attr("data-id", ID);

    $(`#espaco-local`).val(espaco);
    $(`#espaco-lugares`).val(lugares);
    $(`#espaco-situacao`).val(situacaoSelecionada);
    $('#modal-gestao').modal('show');
}

function NovoEspaco() {
    $(`#situacao`).fadeOut("fast");
    $(`.modal-title`)[0].innerHTML = 'Novo Local';
    $(`#espaco-local`).val("")
    $(`#espaco-lugares`).val("")
    $(`#editar-reserva`).hide();
    $(`#salvar-reserva`).show();
    $(`#espaco-situacao`).val('Ativo');
    $('#modal-gestao').modal('show');
}

function SalvarMudanca() {
    Carregamento();

    var espaco = $("#espaco-local").val();
    var lugares = $("#espaco-lugares").val();
    var situacao = "";
    var id = $('#editar-reserva').attr("data-id");

    if ($('#espaco-situacao').val() == "Ativo") {
        situacao = "A";
    } else {
        situacao = "I";
    }

    $.ajax({
        type: "PATCH",
        url: "/gestaoEspaco",
        data: {
            "Nome": espaco,
            "Lugares": lugares,
            "Situacao": situacao,
            "Id": id
        },
        success: function (r) {
            Carregamento();
            if (r.resultado == "criado") {
                Swal.fire({
                    title: "Local Alterado",
                    text: "Confirme para recarregar a pagina",
                    icon: "success",
                    showConfirmButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
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

function SalvarNovoEspaco() {
    var nome = $("#espaco-local").val();
    var lugares = $("#espaco-lugares").val();
    Carregamento();

    $.ajax({
        type: "POST",
        url: "/gestaoEspaco",
        data: {
            "Nome": nome,
            "Lugares": lugares
        },
        success: function (r) {
            Carregamento();

            if (r.resultado == "criado") {
                Swal.fire({
                    title: "Novo Local Adicionado",
                    text: "Confirme para recarregar a pagina",
                    icon: "success",
                    showConfirmButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
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
