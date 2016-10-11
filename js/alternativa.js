var cookieName = "tmp-utm";
var referido = document.referrer.split('/')[2];
var visitaSumada;
var tempCookieVal = new Array();
var nuevoArray = new Array();
var urlReferencia;
var iniciarCookie = new Array();
var nuevoValor = new Array();
var contenidoCookie = new Array();
var agregarConteCookie = new Array();
var nuevaCookie = new Array();
var args;
if (document.cookie.indexOf(cookieName) === -1) {
 $.cookie(cookieName, "", {
     expires: 365  //un anno
 });
}
/*
var contenido = ['google.com(3)', 'fiddle.jshell.net(4)', 'yahoo(1)', 'localhost(10)'];
$.cookie(cookieName, JSON.stringify(contenido));
*/

var tieneUtm = capanna("utm");

if (referido) {
    if (tieneUtm === true) {
      modificarCookie(cookieName, "campanaUTM");
      console.log("tiene campaña");
    }else {
      modificarCookie(cookieName, referido);
    }
}else {
  modificarCookie(cookieName, "directo");
}
function modificarCookie(cookieName, procedencia) {
  //$.cookie(cookieName, procedencia);
  contenidoCookie = $.cookie(cookieName);
  if(contenidoCookie == "") {
    //console.log("cookie vacia");
    iniciarCookie.push(procedencia+'(1)');
    $.cookie(cookieName,  JSON.stringify(iniciarCookie));
    return;
  }

  $.each(JSON.parse(contenidoCookie), function(i, valor) {
    urlReferencia = valor.split('(');
    var urlReferenciaTrim = urlReferencia[0].replace(/\s+/, "");
    var procedenciaTrim = procedencia.replace(/\s+/, "");
    if(urlReferenciaTrim  == procedenciaTrim){
      visitaSumada = sumarVisita (valor, urlReferencia[0]);
      //console.log("existe "+urlReferenciaTrim+" -- "+procedenciaTrim+' / '+valor+' / '+visitaSumada+' - '+i);
      nuevoArray = contenidoCookie.replace(valor, visitaSumada);
      //nuevoArray = actualizarJsonCookie(valor, visitaSumada);
      $.cookie(cookieName, nuevoArray);
    }else {
      agregarConteCookie = JSON.parse($.cookie(cookieName));
      agregarConteCookie.push(procedencia+'(1)'.replace(/\s+/, ""));
      $.cookie(cookieName, JSON.stringify(agregarConteCookie));
    }
    console.log(contenidoCookie);
  });

  //$.cookie(cookieName, tempCookieVal);




  //console.log(sumaVista[1]);
}
function sumarVisita (valorextraido, referencia) {
  var  str1 = valorextraido.replace ( /[^\d.]/g, '' );
  total = parseInt(str1) + 1;
  visitaSumadaConca = referencia+'('+total+')';
  return visitaSumadaConca.replace(/\s+/, "");;
}
function capanna(args) {
  var field = args;
  var url = window.location.href;
  if(url.indexOf('?' + field + '=') != -1)
      return true;
  else if(url.indexOf('&' + field + '=') != -1)
      return true;
  return false;
}
function actualizarJsonCookie(valorbuscado, visitaSumada) {
  var cookie = JSON.parse($.cookie(cookieName));
  $.each(cookie, function(i, valor) {
    if (valor == valorbuscado) {
      valor = visitaSumada;
      console.log("existe - cambia "+valor+" / "+valorbuscado);
    }
    nuevaCookie.push(valor);
  });

  return nuevaCookie;
}
