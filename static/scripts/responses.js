function getBotResponse(input){
    input = input.toLowerCase(); // Convertir input a minúsculas

    if (input=="hola") {
        return "hola, como puedo ayudarte?";
    }else if(input=="adios"|| input=="gracias"){
        return "espero haberte ayudado!";
    }else if(input=="direccion") {
        return "5 avenida 3-37 camino a la piedad 1, San Felipe Retalhuleu";
    }  
    else if(input=="ubicacion"|| input=="donde estan ubicados") {
        return "5 avenida 3-37 camino a la piedad 1, San Felipe Retalhuleu";
    }   

    if (input=="compran plata"|| input=="compran oro"|| input=="compran oro?"|| input=="compran plata?") {
        return "Si, pero compramos por gramo";
    }else if (input=="horario de atencion"|| input=="a que hora abren"|| input=="abren todos los dias"|| input=="abren domingos"){
        return "De lunes a sabado de 9:00AM a 6:00 PM y domingos de 9:30AM a 5:00 PM";
    }else{
        return "no puedo responser eso en este momento";
    }   
   
}
