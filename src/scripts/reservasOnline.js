
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

function MinhasReservas() {
    window.location.href = "http://localhost:8000/minhasreservas";
}

function GestaoDeEspacos() {
    window.location.href = "http://localhost:8000/gestaoEspaco";
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