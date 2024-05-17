
$(function () {
    $("#datepicker").datepicker({
        dateFormat: "dd-mm-yy",
        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
        showAnim: "fadeIn",
        minDate: new Date(Date.now()),
        autoSize: true
    });

});

new DataTable('#table', {
    info: false,
    ordering: false,
    searching: false,
    paging: false,
});

///funcionamento da tela 
$('#table tbody tr').click(function () {
    var situacao = this.className;
    if (situacao == "reservado") {
        return
    }
    if (situacao == "livre") {
        this.className = "selecionado";

    }
    if (situacao == "selecionado") {
        this.className = "livre";
    }

    var linha = $("#table tbody tr");
    var selecionados = 0;

    for (var i = 0; i < linha.length; i++) {
        if (linha[i].className == "selecionado") {
            selecionados++;
        }
    }

    var texto = `<span>Reservar ${selecionados} Horario(s)</span> <img src="/public/img/adicionar.png">`;
    var botao = $('#btn-reservar')
    botao[0].innerHTML = texto;

    if (selecionados == 0) {
        $('#btn-reservar').fadeOut("slow");

    }
    else {
        $('#btn-reservar').fadeIn("slow");

    }
});

$('#btn-reservar').click(function () {

    $('#horarios-selecionados tbody')[0].innerHTML = "";

    var selecionados = $("#table tbody tr.selecionado");
    var lista = [];
    var local = selecionados[0].cells[0].innerHTML;
    var lugares = selecionados[0].cells[1].innerHTML;
    var dia = selecionados[0].cells[2].innerHTML;
    var horario = "";
    var inserirReservas = "";
    var idLocal = selecionados[0].children[0].attributes[0].value;
    for (var i = 0; i < selecionados.length; i++) {
        horario = selecionados[i].cells[3].innerHTML;
        inserirReservas = inserirReservas + `
                                            <tr id-horario="${horario}" id-dia="${dia}" id-local="${idLocal}">
                                                <td>${local}</td>
                                                <td>${lugares}</td>
                                                <td>${dia}</td>
                                                <td>${horario}</td>
                                            </tr>`
    }

    $('#horarios-selecionados tbody')[0].innerHTML = inserirReservas;
    $('#modal-reservas').modal('show');
});

$('#salvar-reserva').click(function () {

    var horarios = [];

    const idUsuario = getCookie('usuario');

    $('#tbody-horarios-selecionados tr').each(function () {
        const horario = $(this).attr('id-horario').trim();
        const dia = $(this).attr('id-dia').trim();
        const idLocal = $(this).attr('id-local').trim();
        const dataParts = dia.split('/');
        dataFormatada = `${dataParts[2]}-${dataParts[1]}-${dataParts[0]}`;
        horarios.push({ idLocal, horario, dataFormatada, idUsuario });
    });

    $.ajax({
        type: "POST",
        url: `/reservasOnline`,
        contentType: 'application/json',
        data: JSON.stringify({ novasReservas: horarios }),
        success: function (r) {

            Carregamento();

            if (r.resultado == "criado") {
                Swal.fire({
                    title: "Horarios Reservados!",
                    text: "Confirme para recarregar a pagina",
                    icon: "success",
                    showConfirmButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = `/reservasOnline/${horarios[0].idLocal}/${horarios[0].dataFormatada}`
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
});

function CancelarReserva(horario, idEspaco, data) {

    Swal.fire({
        title: "Atenção!",
        text: "Quer mesmo remover a reserva?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "3085d6",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",

    }).then((result) => {
        if (result.isConfirmed) {

            Carregamento();

            $.ajax({

                type: "DELETE",
                // url: `/reservasOnline/${idEspaco}/${data}/${horario}`,
                url: `/reservasOnline`,
                data: {
                    "Horario": horario,
                    "IdEspaco": idEspaco,
                    "Data": data
                },
                success: function (r) {

                    Carregamento();

                    if (r.resultado = "removido") {
                        Swal.fire({
                            title: "Reserva Cancelada!",
                            text: "Confirme para recarregar a pagina",
                            icon: "success",
                            showConfirmButton: true,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = `/reservasOnline/${idEspaco}/${data}`;
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
    });
}


function Carregamento() {
    $('.body-loader').toggle();
}

function PesquisarReserva() {

    var local = $(`#locais`).val();
    var data = $(`#datepicker`).val();

    var partesData = data.split("-");
    var dataFormatada = partesData[2] + "-" + partesData[1] + "-" + partesData[0];

    if (local == "" || data == "") {
        Swal.fire({
            title: "Atenção!",
            text: "Existem campos não informados, favor verificar",
            icon: "info",
        });
    } else {
        window.location.href = `/reservasOnline/${local}/${dataFormatada}`;
    }
}



function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}
