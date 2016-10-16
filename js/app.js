// var digCod = function(e){
// 	var dig1 = $(e.target);
// 	var dig2 = dig1.parent().next().children();
// 	var dig3 = dig2.parent().next().children();

// 	var long = dig1.val().length;
// 	if (long == 1){
// 		dig2.focus();
// 		var long2 = dig2.val().length;
// 		if(long2 == 1){
// 			dig3.focus();
// 		}
// 	}
// }
// var compararCodigo = function(){
// 	var obtenCod = localStorage.getItem("guardarCod");
// 	for (var i = 3; i < 6; i++) {
// 		for (var j = 0; j < 3; j++) {
// 			if (obtenCod[i] != ($("input").get(j).val())){
// 				alert("Ingrese su código por favor");
// 			}
// 		}
// 	}
// }
var copNum = function(){
	$("#celu").text(localStorage.getItem("celular")); 
}
var generarCod = function(){
	var codigo = "LAB";
	for (var i = 0; i < 3; i++) {
		var nums = Math.round(Math.random()*9);
		codigo += nums;
	}
	alert(codigo);

	localStorage.setItem("guardarCod", codigo);

	var obtNum = $("#numeros").val();
	localStorage.setItem("celular", obtNum);
}
var comprobar = function(e){
	var caracteres = $(e.target).val().length;
	if (caracteres == 9){
		$("#next").attr("href", "verify.html");
		$("#next").click(generarCod);
	}
	else{
		$("#next").removeAttr("href");
		$("#next").unbind("click");
	}
}
var validar = function(e){
	var tecla = e.keyCode;
	if((tecla >= 48 && tecla <= 57) || tecla == 8){
		return true;
	}
	else
		return false;
}
var cargaPag = function(){
	$("#numeros").keydown(validar);
	// $num.keyup(comprobar);
	$("#numeros").on("input", function(e){
		validar(e);
		comprobar(e);
	});
	copNum();
	// $("#dig").focus();
	// $("#dig").keyup(digCod);
	// $("#sgt2").click(compararCodigo);
	

}
$(document).ready(cargaPag);
