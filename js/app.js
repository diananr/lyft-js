var valDatos = function(){
	if ($("#nomb").val().trim().length == 0 || $("#apell").val().trim().length == 0 || $("#email").val().trim().length == 0) {
		alert("Complete todos los espacios");
	}
	if ($("#nomb").val().trim().length > 3 && $("#nomb").val().trim().length < 21) {
		return true;
	}
	else
		alert("Ingrese bien su nombre");

	if ($("#apell").val().trim().length > 3 && $("#apell").val().trim().length < 21) {
		return true;
	}
	else
		alert("Ingrese bien su apellido");

	var regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!regexEmail.test($("#email").val())){
        alert("Ingresa bien su email");
    }
    if ($("#email").val().trim().length > 6 && $("#email").val().trim().length < 51) {
		return true;
	}
	else
		alert("Ingrese bien su email");
}
var cargaPag = function(){
	$("#numeros").keydown(validar);
	// $num.keyup(comprobar);
	$("#numeros").on("input", function(e){
		validar(e);
		comprobar(e);
	});
	$("#celu").text(localStorage.getItem("celular")); 
	$("#sgt2").click(compararCodigo);
	$("#dig1").focus();
	$(".cnum").keyup(saltaFocus);
	$("#sgt3").click(valDatos);
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(todoBien, hayError);
	}
}

$(document).ready(cargaPag);

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
		$("#next").attr("href", "verify.html");
		$("#next").click(generarCod);
	}
	else{
		$("#next").removeAttr("href");
		$("#next").unbind("click");
	}
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
		pos: latlon,
		mapa: mapa,
		title: "Estas aqui"
	});
}
var hayError = function (error){
	alert("ERROR");
}