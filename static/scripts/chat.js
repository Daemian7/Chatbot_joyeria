var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i< coll.length; i++){
    coll[i].addEventListener("click", function(){
        this.classList.toggle("active");

        var content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        }else{
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

function getTime(){
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();

    if(hours < 10){
        hours = "0" + hours; 
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
}

function firstBotMsg(){
    let firstMsg = "¡Hola! ¿Tienes alguna duda respecto a nosotros o nuestros productos? ¿En qué puedo ayudarte hoy?";
    document.getElementById("botstartermessage").innerHTML = '<p class="botext"><span>' + firstMsg + '</span></p>';

    let time = getTime();
    $("#chat-timestamp").append(time);
    document.getElementById("userinput").scrollIntoView(false);
}

firstBotMsg();

function getHardResponse(userText) {
    let botResponse = getBotResponse(userText);
    let botHtml = '<p class="botext"><span>' + botResponse + '</span></p>';
    $("#chatbox").append(botHtml);

    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

function getResponse() {
    let userText = $("#textinput").val();

    if (userText == "") {
        userText = "¡Me encanta Code Palace!";
    }

    let userHtml = '<p class="usertext"><span>' + userText + '</span></p>';

    $("#textinput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    setTimeout(() => {
        getHardResponse(userText);
    }, 1000)
}

function buttonSendText(sampleText) {
    let userHtml = '<p class="usertext"><span>' + sampleText + '</span></p>';

    $("#textinput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

function sendBtn(){
    getResponse();
}

function heartBtn(){
    buttonSendText("¡Gracias!");
}

$("#textinput").keypress(function (e) {
    if (e.which == 13) {
        getResponse();
    }
});

function getBotResponse(input) {
    const splitMessage = input.toLowerCase().split(/\s|[,:;.?!-_]\s*/);
    const response = checkAllMessages(splitMessage);
    return response;
}

function messageProbability(userMessage, recognizedWords, singleResponse = false, requiredWords = []) {
    let messageCertainty = 0;
    let hasRequiredWords = true;

    for (const word of userMessage) {
        if (recognizedWords.includes(word)) {
            messageCertainty += 1;
        }
    }

    const percentage = messageCertainty / recognizedWords.length;

    for (const word of requiredWords) {
        if (!userMessage.includes(word)) {
            hasRequiredWords = false;
            break;
        }
    }

    if (hasRequiredWords || singleResponse) {
        return Math.round(percentage * 100);
    } else {
        return 0;
    }
}

function checkAllMessages(message) {
    const highestProb = {};

    function response(botResponse, listOfWords, singleResponse = false, requiredWords = []) {
        highestProb[botResponse] = messageProbability(message, listOfWords, singleResponse, requiredWords);
    }

    response('Hola', ['hola', 'klk', 'saludos', 'buenas'], true);
    response('Puedes comunicarte con nosotros al numero 5556-5166', ['telefono', 'numero', 'celular','contacto'], true);
    response('Nos ponemos a la orden con todo tipo de accesorios de plata y oro italiano y accesorios personalizados', ['productos', 'servicios', 'ofrecen'], true);
    response('Unicamente aceptamos efectivo', ['metodo', 'pago', 'tarjeta','credito','debito','acepta','transferencia'], true);
    response('Solo contamos con descuentos en articulos de plata', ['promociones', 'actuales', 'descuentos', 'oferta'], true);
    response('Visitamos en nuestras instalaciones para mas información, será un gusto atenderte!', ['envio','mas','hacer','pedido', 'info', 'quiero','saber','interesa'], true);
    response('Contamos con todo tipo de accesorios en plata y oro: Pulseras, Cadenas, Dijes, Tobilleras, Aretes', ['que', 'tipo', 'piezas'], true);
    response('Manejamos anillos de graduacion para niños desde Q275 hasta Q1700', ['prepa', 'primaria', 'anillos'], true);
    response('Manejamos anillos de graduacion para dama en plata u oro desde Q650 a Q2700 dependiendo del diseño y el material y los de caballero de Q750 a Q3500', ['precio', 'graduacion', 'anillos', 'bachillerato'], true);
    response('De lunes a sabado de 9:00AM a 6:00 PM y domingos de 9:30AM a 5:00 PM', ['horario', 'atencion', 'abren', 'hora','dia','cual'], true);
    response('Estoy bien y tú?', ['como', 'estas', 'va', 'vas', 'sientes'], false, ['como']);
    response('Estamos ubicados en 5 avenida 3-37 camino a la piedad 1, San Felipe Retalhuleu', ['ubicados', 'direccion', 'donde', 'ubicacion'], true);
    response('Espero haberte ayudado! Ten un buen dia!', ['gracias', 'te lo agradezco', 'thanks', 'adios'], true);

    const bestMatch = Object.keys(highestProb).reduce((a, b) => highestProb[a] > highestProb[b] ? a : b);

    return highestProb[bestMatch] < 1 ? unknown() : bestMatch;
}

function unknown() {
    const responses = ['¿Puedes decirlo de nuevo?', 'No estoy seguro de lo que quieres', 'No puedo responder eso en este momento'];
    return responses[Math.floor(Math.random() * responses.length)];
}