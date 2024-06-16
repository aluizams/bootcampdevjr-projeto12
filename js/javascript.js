
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

var enderecos = [];

function save(info){

    var info = {
        id: enderecos.length + 1,
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
        cep: document.getElementById("cep").value,
        endereco: document.getElementById("endereco").value,
        numero: document.getElementById("numero").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
    };

    addNewRow(info);
    enderecos.push(info);

    document.getElementById("formInfo").reset();
}

function addNewRow(info) {
    var table = document.getElementById("tabela");
    var newRow = table.insertRow();

    var idNode = document.createTextNode(info.id);
    newRow.insertCell().appendChild(idNode);

    var nomeCompletoNode = document.createTextNode(info.nome + " " + info.sobrenome);
    newRow.insertCell().appendChild(nomeCompletoNode);

    var enderecoNode = document.createTextNode(info.endereco + ", " + info.numero);
    newRow.insertCell().appendChild(enderecoNode);

    var cepNode = document.createTextNode(info.cep);
    newRow.insertCell().appendChild(cepNode);

    var bairroNode = document.createTextNode(info.bairro);
    newRow.insertCell().appendChild(bairroNode);

    var cidadeNode = document.createTextNode(info.cidade);
    newRow.insertCell().appendChild(cidadeNode);

    var estadoNode = document.createTextNode(info.estado);
    newRow.insertCell().appendChild(estadoNode);
}