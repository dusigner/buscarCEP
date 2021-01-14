$(document).ready(function() {
    $("#cep").inputmask("99999-999");
    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#rua, #bairro, #cidade, #uf, #cep2, #mapa").text("");
        $("#limpar").css("display", "none");
        $("#buscar").prop("disabled",false);
        $("#cep").val("").focus()
        $('.exibir__cep-content').css("display", "none");
    }
    $("#limpar").on('click', limpa_formulário_cep);
    //Quando o campo cep perde o foco.
    $("#buscar").click(function(event) {
        event.preventDefault();
        //Nova variável "cep" somente com dígitos.
        var cep = $("#cep").val().replace(/\D/g, '');
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        $(this).prop("disabled",true);
            //Verifica se campo cep possui valor informado.
            if (cep != "") {
            //Valida o formato do CEP.
            if(validacep.test(cep)) {
                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $('.exibir__cep-content').css("display", "block");
                        $("#rua").text(dados.logradouro);
                        $("#bairro").text(dados.bairro);
                        $("#cidade").text(dados.localidade);
                        $("#uf").text(dados.uf);
                        $("#cep2").text(dados.cep);
                        $("#mapa").append( '<iframe width="100%" height="250" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC1MQGnYRR3HCWe5OQfxcRO7RO8LyBUBHk&q='+dados.logradouro+'" allowfullscreen></iframe><br/>' );
                        $("#limpar").css("display", "block");
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    });
});