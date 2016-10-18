var cargaPag = function(){
	$("#numeros").keydown(validar);
	$("#numeros").keyup(comprobar);
	$("#celu").text(localStorage.getItem("celular")); 
	$("#sgt2").click(compararCodigo);
	$("#dig1").focus();
	$(".cnum").keyup(saltaFocus);
	$("#sgt3").click(valDatos);
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(todoBien, hayError);
	}
	$("#contacto").click(aparecePerfil);
	$("#mitad").click(apareceMap);
}

$(document).ready(cargaPag);
var entra = true;

var validar = function(e){
	var tecla = e.keyCode;
	if((tecla >= 48 && tecla <= 57) || tecla == 8){
		return true;
	}
	else
		return false;
}
var comprobar = function(e){
	var caracteres = $(e.target).val().length;
	if (caracteres == 9){
		$("#sgt1").attr("href", "verify.html");
		$("#sgt1").click(generarCod);
	}
	else{
		$("#sgt1").removeAttr("href");
		$("#sgt1").unbind("click");
	}
}
var generarCod = function(){
	if(entra){
		var codigo = "LAB";
		for (var i = 0; i < 3; i++) {
			var nums = Math.round(Math.random()*9);
			codigo += nums;
		}
		alert(codigo);

		localStorage.setItem("guardarCod", codigo);

		var obtNum = $("#numeros").val();
		localStorage.setItem("celular", obtNum);

		entra = false;
	}
}
var compararCodigo = function(){
	var obtenCod = localStorage.getItem("guardarCod");

	var iniciales = "LAB";
	var pridig = $("#dig1").val();
	var segdig = $("#dig2").val();
	var terdig = $("#dig3").val();
	var juntar = pridig + segdig + terdig;
	var codigoRec = iniciales + juntar;

	if(pridig.length == 0 || segdig.length == 0 || terdig.length == 0){
		alert("Ingrese su código porfavor");
	}
	else if(obtenCod == codigoRec){
		$("#sgt2").attr("href","datos.html");
	}
	else
		alert("Código invalido");
}
var saltaFocus = function(e){
	if($(e.target).val().trim().length == 1){
		$(e.target).parent().next().children().focus();
	}
	if (e.keyCode == 8) {
		$(e.target).parent().prev().children().focus();
	}
}
var valDatos = function(){
	var cumple = true;
	if($("#nomb").val().trim().length == 0 || $("#apell").val().trim().length == 0 || $("#email").val().trim().length == 0) {
	 	alert("Complete todos los espacios");
	 	cumple = false;
	}
	if(($("#nomb").val().trim().length < 3 || $("#nomb").val().trim().length > 21) || ($("#apell").val().trim().length < 3 || $("#apell").val().trim().length > 21)){
		alert("Complete bien sus datos");
		cumple = false;
	}
	if(($("#email").val().trim().length < 6 || $("#email").val().trim().length > 51)){
		alert("Ingrese un correo válido");
		cumple = false;
	}
	var regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
	if (!regexEmail.test($("#email").val())){
		alert("Ingrese un correo válido");
		cumple = false;
	}
	if ($("#checkbox").is(":checked") == false){
		alert("Acepte los terminos y condiciones");
		cumple = false;
	}
	if (cumple){
		$("#sgt3").attr("href", "map.html");
	}
}
var todoBien = function(pos){
	var lat = pos.coords.latitude;
	var lon = pos.coords.longitude;
	var latlon= new google.maps.LatLng(lat, lon);
	$("#map").addClass("tamanoMapa");

	var misOpciones = {
		center:latlon, zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
		navigationControlOptions: {
			style: google.maps.NavigationControlStyle.SMALL
		}
	};

	var mapa = new google.maps.Map(document.getElementById("map"), misOpciones);

	var marcador = new google.maps.Marker({
		position: latlon,
		map: mapa,
		title: "Estas aqui"
	});
}
var hayError = function (error){
	alert("ERROR");
}
var aparecePerfil = function(){
	$("#mitad").removeClass("ocultar");
}
var apareceMap = function(){
	$("#mitad").addClass("ocultar");
}