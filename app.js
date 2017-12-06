var express= require('express');
var app= express();
var server= require('http').Server(app);
var io= require('socket.io')(server);
var NodeRSA = require('node-rsa');

var mensajes=[{
	id:1,
	text:"mensajes descifrados",
	firma:"Chat"
}];
/*
var firmas={
	firma1: "18",
	autor: "Victor",
	n1: "65"
};*/
var mensajese=[{
	id:1,
	text:"RSA",
	firma:"Chat"
}];

app.use(express.static('public'));

app.get('/',function(req, res){
	res.status(200).send("Hola mundo");
});
io.on('connection',function(socket){
	console.log('Hay un usuario :)');
	socket.emit('mensajes',mensajes);
	socket.emit('mensajese',mensajese);
	socket.on('nmensaje', function(datos){

/*		var c=parseInt(datos.firma);
		var v=Math.pow(parseInt(c), 7)%65;
		console.log(v);
		if (v.toString()===firmas.firma1.toString()) {*/
			var texto=datos.text;
			/*var cifrado=Math.pow(parseInt(texto),7)%65;
			*/
			var key = new NodeRSA();
			key.importKey({
    		n: new Buffer('0086fa9ba066685845fc03833a9699c8baefb53cfbf19052a7f10f1eaa30488cec1ceb752bdff2df9fad6c64b3498956e7dbab4035b4823c99a44cc57088a23783', 'hex'),
    		e: 65537,
    		d: new Buffer('5d2f0dd982596ef781affb1cab73a77c46985c6da2aafc252cea3f4546e80f40c0e247d7d9467750ea1321cc5aa638871b3ed96d19dcc124916b0bcb296f35e1', 'hex'),
    		p: new Buffer('00c59419db615e56b9805cc45673a32d278917534804171edcf925ab1df203927f', 'hex'),
    		q: new Buffer('00aee3f86b66087abc069b8b1736e38ad6af624f7ea80e70b95f4ff2bf77cd90fd', 'hex'),
    		dmp1: new Buffer('008112f5a969fcb56f4e3a4c51a60dcdebec157ee4a7376b843487b53844e8ac85', 'hex'),
    		dmq1: new Buffer('1a7370470e0f8a4095df40922a430fe498720e03e1f70d257c3ce34202249d21', 'hex'),
    		coeff: new Buffer('00b399675e5e81506b729a777cc03026f0b2119853dfc5eb124610c0ab82999e45', 'hex')
			}, 'components');
			var publicComponents = key.exportKey('components-public');
			console.log(publicComponents);
 
			var encrypted = key.encrypt(texto, 'base64');
			console.log('encrypted: ', encrypted);
			var decrypted = key.decrypt(encrypted, 'utf8');
			console.log('decrypted: ', decrypted);

			console.log(key.isPublic());
			var men={
			//firma: firmas.autor,
			firma: datos.firma,
			text: encrypted
			};
			var datos1={
			//firma: firmas.autor,
			firma: datos.firma,
			text: datos.text
			};
			mensajes.push(datos1);
			mensajese.push(men);
		
			console.log("mensaje enviado ");
		
			io.sockets.emit('mensajes',mensajes);
			io.sockets.emit('mensajese',mensajese);
		//}
	});
});

server.listen(8080, function(){
	console.log("Servidor corriendo");
});