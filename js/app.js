var cargaPag = function(){
	$("#numeros").keydown(validar);
	$("#numeros").keyup(comprobar);
	$("#celu").text(localStorage.getItem("celular")); 
	$("#sgt2").click(compararCodigo);
	$("#dig1").focus();
	$(".cnum").keyup(saltaFocus);
	$("#sgt3").click(valDatos);
	var esRuta = location.href.indexOf("map.html");
	if (esRuta > 0){
		if (navigator.geolocation){
			navigator.geolocation.getCurrentPosition(todoBien, hayError);
		}
	}
	$("#contacto").click(aparecePerfil);
	$("#mitad").click(apareceMap);
	$(".nombreUs").text(localStorage.getItem("nombre") +" "+localStorage.getItem("apellido"));
	$("#resend").click(generarCod);
	$("#pick").click(generarDirec);
	$("#dire").dblclick(limparInput);
	// $(".input").keyup(validarDatos);
}
var entra = true;
var conta = 0; 
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
	var tecla = e.keyCode;
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

		var rutaVeri = local.href.indexOf("verify.html");
		if (rutaVeri < 0) {
			entra = false;
		}
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
		swal("Ingrese su código porfavor");
	}
	else if(obtenCod == codigoRec){
		$("#sgt2").attr("href","datos.html");
	}
	else
		swal("Código invalido");
}
var saltaFocus = function(e){
	if($(e.target).val().trim().length == 1){
		$(e.target).parent().next().children().focus();
	}
	if (e.keyCode == 8) {
		$(e.target).parent().prev().children().focus();
	}
}
// var validarDatos = function(e){
// 	var key = e.keyCode;
// 	var cumple = true;
// 	conta++;

// 	if (conta < 3 || key == 8){
// 		$(this).addClass("ipt-error"); 
// 	}
// 	else{
// 		$(this).removeClass("ipt-error");
// 	}
// }
var valDatos = function(){
	var cumple = true;
	if($("#nomb").val().trim().length == 0 || $("#apell").val().trim().length == 0 || $("#email").val().trim().length == 0) {
	 	alert("Complete todos los espacios");
	 	cumple = false;
	}
	if(($("#nomb").val().trim().length < 3 || $("#nomb").val().trim().length > 21) || ($("#apell").val().trim().length < 3 || $("#apell").val().trim().length > 21)){
		alert("Cantidad de caracteres invalidos de nombre o apellido");
		cumple = false;
	}
	if(($("#email").val().trim().length < 6 || $("#email").val().trim().length > 51)){
		alert("Cantidad de caracteres invalidos de email");
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
		var obtNomb = $("#nomb").val();
		localStorage.setItem("nombre",obtNomb);

		var obtApel = $("#apell").val();
		localStorage.setItem("apellido",obtApel);

		$("#sgt3").attr("href", "map.html");
	}
}
var todoBien = function(pos){
	var lat = pos.coords.latitude;
	var lon = pos.coords.longitude; 
	var latlon = new google.maps.LatLng(lat, lon);
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

	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({"latLng":latlon},direcActual);
}
var direcActual = function(resultado, estado){
	if (estado == google.maps.GeocoderStatus.OK){
		if (resultado[0]){
			$("#dire").val(resultado[0].formatted_address);
		}
	}
}
var hayError = function (error){
	swal("ERROR");
}
var aparecePerfil = function(){
	$("#mitad").removeClass("ocultar");
}
var apareceMap = function(){
	$("#mitad").addClass("ocultar");
}
var generarDirec = function(){
	var direccion = $("#dire").val();
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({ "address": direccion} , dirResultado);
}
var dirResultado = function(resultado, estado){
	if (estado){
		var opMap = {
			center: resultado[0].geometry.location,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
		};

		var mapa = new google.maps.Map(document.getElementById("map"), opMap);
		mapa.fitBounds(resultado[0].geometry.viewport);

		var markerOptions = { position: resultado[0].geometry.location }
        var marker = new google.maps.Marker(markerOptions);
        marker.setMap(mapa);
	}
}
var limparInput = function(){
	$("#dire").val("");
}