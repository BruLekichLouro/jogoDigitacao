var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(document).ready(function(){//ou $(function(){}); que espera todo conteudo ser carregado 
    atualizaTamanhoFrase();	//para executar
    inicializaContadores();
    inicializaCronometro(); 
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});


function atualizaTamanhoFrase(){
	var frase = jQuery(".frase").text();
	var numPalavras = frase.split(" ").length;
	var tamanhoFrase = $("#tamanho-frase");
	tamanhoFrase.text(numPalavras);
}
function atualizaTempoInicial(tempo) {
	tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}

function inicializaContadores(){
	campo.on("input", function(){
	var conteudo = campo.val();

	var qtdPalavras = conteudo.split(/\S+/).length - 1;//Expressao regular q considera qq caractere exceto o espaco
	$("#contador-palavras").text(qtdPalavras);

	var conteudoSemEspaco = conteudo.replace(/\s+/g,'');
	var qtdCaracteres = conteudoSemEspaco.length;
	$("#contador-caracteres").text(qtdCaracteres);
});
}

function inicializaCronometro(){
	campo.one("focus", function(){ //one escuta o evento apenas uma única vez e para
		var tempoRestante = $("#tempo-digitacao").text();
		$("#botao-reiniciar").attr("disabled",true);
		var cronometroId = setInterval(function(){
		tempoRestante--;
		$("#tempo-digitacao").text(tempoRestante);
		if(tempoRestante < 1){
			clearInterval(cronometroId);//para a função setInterval, recebe o id como parametro
			finalizaJogo();
		}
		}, 1000);
	});
}

function finalizaJogo(){
	campo.attr("disabled", true);	
	campo.addClass("campo-desativado");//ou toggleClass("campo-desativado")
	$("#botao-reiniciar").removeAttr("disabled");	
	inserePlacar();	
}


 function reiniciaJogo(){
 	campo.attr("disabled",false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
//toggleClass entra no lugar de addCLass e removeClass, deixei o addClass só para exemplo
	campo.removeClass("campo-correto");
    campo.removeClass("campo-errado"); 
 };

function inicializaMarcadores() {
	campo.on("input", function() {
		var frase = $(".frase").text();
    	var digitado = campo.val();
    	var comparavel = frase.substr(0 , digitado.length);

   		if(digitado == comparavel) {
      		campo.addClass("campo-correto");
      		campo.removeClass("campo-errado");
    		} else {
      		campo.addClass("campo-errado");
      		campo.removeClass("campo-correto");
    		}
    //Alternativa1:
    //if( frase.startsWith(digitado)) {
 	//	campo.addClass("campo-correto");
	//	} else {
 	//	campo.addClass("campo-errado");
	//	}
	
    //Alternativa2:
    //var ehCorreto = (digitado == comparavel);

	//campo.toggleClass("campo-correto", ehCorreto);
	//campo.toggleClass("campo-errado", !ehCorreto);
});
}
console.log("ECMA Script 6".startsWith("ECMA"));