
$("#cep").mask("00000-000");


function search() {
    var cep = document.getElementById("cep").value;
    var url = `https://viacep.com.br/ws/${cep}/json/`;

    $.getJSON(url, function (response) {
        if ("erro" in response) {
            $("#endereco").val("");
            $("#bairro").val("");
            $("#cidade").val("");
            $("#estado").val("");
            $("#numero").prop("disabled", true);
            showError("Não encontrado");

        } else {
            $("#endereco").val(response.logradouro);
            $("#bairro").val(response.bairro);
            $("#cidade").val(response.localidade);
            $("#estado").val(response.uf);
            $("#numero").prop("disabled", false);
            clearError();
        }
    }).fail(() => {
        showError("CEP Inválido");
    });
}

function showError(msg) {
    document.getElementById("erro").innerHTML = `<span class="text-danger">${msg}</span>`
}

function clearError() {
    document.getElementById("erro").innerHTML = "";

}