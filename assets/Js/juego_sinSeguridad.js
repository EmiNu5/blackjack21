/*
 *2C  = two of Clubs 
 *2D  = two of Diamons
 *2H  = two of Harts
 *2S  = two of Spades
*/
let deck = [];
const tips = ['C','D','H','S'];
const specials = ['A','J','Q','K'];

//---------------Puntos jugados--------------------//
let puntosJugador = 0,
puntosComputadora = 0,
puntos = 0;
//--------------Referencias html---------------------
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugador     = document.querySelector('#Jugador-cartas');
const divCartasComputadora = document.querySelector('#Computadora-cartas');

const puntosHtml = document.querySelectorAll('small');
//---------------------------------------------------

// Esta funcion crea un nuevo deck
const crearDeck =()=>{
    for(let i=2;i<=10;i++){
       for (let tip of tips) {
          deck.push(i+tip); 
       }
    }
    for(let tip of tips){
        for(let special of specials){
            deck.push(special+tip);
        }
    }
    deck = _.shuffle(deck);
    return deck;
}
crearDeck();
console.log(deck);
// Pide carta
const pedirCarta =()=>{
    if(deck.length ===0){
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
}
//Devuelve valor de la carta;
const valorCarta = (carta) =>{
    const valor = carta.substring(0,carta.length-1);// de esta menera extraemos solo los valores de la carta // otra manera usando una expr regular
    return (isNaN(valor)) ? //pregunta si es no es un numero TRUE|| FALSE
            (valor ==='A')? 11:10 //TRUE: si es un AS asigna 11 sino 10
            : valor *1 // FALSE: si es un string multiplica por 1
}

const tirarCarta =(i)=>{
    const carta = pedirCarta();
    if (i===0){
        puntosJugador = puntosJugador + valorCarta(carta);
        puntos = puntosJugador;
    } else if (i===1){
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntos = puntosComputadora;
    }
    puntosHtml[i].innerText = puntos;
   
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    if (i===0){
        divCartasJugador.append(imgCarta);
    }else{
        divCartasComputadora.append(imgCarta);
    }
    return puntos;
}

//----------------TurnoCompu-------------------------//
const turnoComputadora =(puntosMinimos)=>{
    do {
        puntosComputadora = tirarCarta(i=1);
        if(puntosMinimos > 21){
            break;
        }
    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos<=21) );
    setTimeout(() => {
        if(puntosComputadora===puntosMinimos){
            alert('Nadie gana');
        }else if(puntosMinimos > 21){
            alert('Computadora gana');
        }else if (puntosComputadora>21){
            alert('Jugador gana');
        }else{
            alert('Computadora gana');
        }
    }, 30);

}

//--------------Eventos------------------------------//
btnPedir.addEventListener('click',()=>{
    puntosJugador = tirarCarta(i=0);
    if(puntosJugador > 21){
        //console.log('Perdiste papa!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if(
        puntosJugador === 21){
            //console.log('21, genial');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
});
btnDetener.addEventListener('click',()=>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);

});
btnNuevo.addEventListener('click',()=>{
    console.clear();
    deck=[];
    deck = crearDeck();
    puntosJugador = 0,
    puntosComputadora = 0,
    puntos = 0;
    puntosHtml[0].innerText = 0;
    puntosHtml[1].innerText = 0;
    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML     = '';
    btnPedir.disabled = false;
    btnDetener.disabled = false;
});

