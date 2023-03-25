const miModulo = (()=>{
    'use strict'
    let deck = [];
    const tips = ['C','D','H','S'],
          specials = ['A','J','Q','K'];
    let puntosJugadores = []; // 2 jugadores
    
    //Referencias html
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');
    
    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHtml = document.querySelectorAll('small');

    // Inicializa el juego
    const inicializarJuego = (numJugadores = 2) =>{
        deck = crearDeck();

        puntosJugadores =[];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);    
        }
        puntosHtml.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }
     
    // Esta funcion crea un nuevo deck
    const crearDeck =()=>{
        deck=[];
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
        return _.shuffle(deck);
    }

    // Pide carta
    const pedirCarta =()=>{
        if(deck.length ===0){
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }
    const valorCarta = (carta) =>{
        const valor = carta.substring(0,carta.length-1);// de esta menera extraemos solo los valores de la carta // otra manera usando una expr regular
        return (isNaN(valor)) ? //pregunta si es no es un numero TRUE|| FALSE
                (valor ==='A')? 11:10 //TRUE: si es un AS asigna 11 sino 10
                : valor *1 // FALSE: si es un string multiplica por 1
    }
    // turno 0 = 1er jugador y el ultimo sera la computadora
    const acumularPuntos = (carta,turno)=>{

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHtml[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }
    const crearCarta = (carta, turno)=>{
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }
    const determinarGanador = ()=>{
        const [puntosMinimos ,puntosComputadora] = puntosJugadores; // desestructuracion de arrays
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
        }, 100);
    }
    //--TurnoCompu-----------//
    const turnoComputadora =(puntosMinimos)=>{
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta,puntosJugadores.length-1);
            crearCarta(carta,puntosJugadores.length-1);  
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos<=21) );
        determinarGanador();
    }
    
    //Eventos
    btnPedir.addEventListener('click',()=>{
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta,0);
        crearCarta(carta,0);

        if(puntosJugadores > 21){
            console.warn('Los siento perdiste');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if(
            puntosJugadores === 21){
                console.warn('21, genial');
                btnPedir.disabled   = true;
                btnDetener.disabled = true;
                turnoComputadora(puntosJugador);
            }
    });
    btnDetener.addEventListener('click',()=>{
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    
    });
    btnNuevo.addEventListener('click',()=>{
        inicializarJuego();
    });
    return {
        nuevoJuego: inicializarJuego
    };
})();    



