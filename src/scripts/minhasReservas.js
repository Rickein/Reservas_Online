
$(function () {


});
new DataTable('#table', {
    info: false,
    ordering: true,
    searching: false,
    paging: false
});

function Alerta() {

    Swal.fire({
        title: "Atenção!",
        text: "Não é possivel cancelar Reservas para dias anteriores atual",
        icon: "info",
    });
}

function CancelarReserva(data, horario, idEspaco) {

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
                url: `/reservasOnline/${idEspaco}/${data}/${horario}`,
                data: {
                    "Horario": horario,
                    "IdEspaco": idEspaco,
                    "Data":data
                },
                success: function (r) {
        
                    Carregamento();
        
                    if (r.resultados) {
                        Swal.fire({
                            title: "Reserva Cancelada!",
                            text: "Confirme para recarregar a pagina",
                            icon: "success",
                            showConfirmButton: true,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href =  `/minhasreservas`;
                            }
                        });
                    }
                    else {
                        Swal.fire({
                            title: "Algo deu Errado",
                            text: r.mensagem,
                            icon: "info",
                        });
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