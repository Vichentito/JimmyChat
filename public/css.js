var socket= io.connect('http://localhost:8080',{'hola': true});
socket.on('mensajes', function(datos){
	console.log(datos);
	recargar(datos);
})
socket.on('mensajese', function(datose){
	console.log(datose);
	recargare(datose);
})
function recargar(datos){
	var html=datos.map(function(elem,index){
		return("<br><button type='button' class='btn btn-secondary'><strong>"+elem.firma+" </strong> <em>"+elem.text+"</em></button><br>");
	}).join(" ");
	document.getElementById('mensajes').innerHTML= html;

	document.querySelector("#mensajes").scrollTop=document.querySelector("#mensajes").scrollHeight;
}

function recargare(datose){
	var html=datose.map(function(elem,index){
		return("<br><button type='button' class='btn btn-secondary'><strong>"+elem.firma+" </strong> <em>"+elem.text+"</em></button><br>");
	}).join(" ");
	document.getElementById('mensajese').innerHTML= html;

	document.querySelector("#mensajese").scrollTop=document.querySelector("#mensajese").scrollHeight;
}

function addMensaje(e){
	var men={
		firma: document.getElementById('firma').value,
		text: document.getElementById('texto').value,
	};
	socket.emit('nmensaje',men);
	return false;
}
