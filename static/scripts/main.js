const altura = document.body.scrollHeight - window.innerHeight;
const fondo = document.getElementById('fondo');

window.onscroll = () =>{
    const anchoFondo = (window.pageYoffset / altura) * 700;
    if(anchoFondo <= 100){
        fondo.style.width = anchoFondo + '%';
    }
}