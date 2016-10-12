var validar = function(e){
	var tecla = e.keyCode;
	if((tecla >= 48 && tecla <= 57) || tecla == 8){
		return true;
	}
	else
		return false;
}
var comprobar = function(){
	var caracteres = $(this).val().length;
	var $sgt = $("#next");
	if (caracteres == 9){
		$sgt.attr("href", "verify.html");
	}
	else
		$sgt.removeAttr("href");
}
var cargaPag = function(){
	var $num = $("#numeros");
	$num.keydown(validar);
	$num.keyup(comprobar);
}
$(document).ready(cargaPag);
