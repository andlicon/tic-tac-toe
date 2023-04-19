const isCasillaSeleccionable = (event) => {
    const casilla = event.target;
    const clasesArray = casilla.classList;

    for(const clase of clasesArray) {
        if(clase.includes('Jugador')) {
            return false;
        }
    }
    
    return true;
}

const seleccionarCasilla = (casilla) => {
    const juego = JSON.parse(window.sessionStorage.getItem('juego'));
    const turno = juego.primerJugador;

    if(turno) {
        casilla.classList.add('primerJugador');
    }
    else {
        casilla.classList.add('segundoJugador');
    }
}

const cambiarTurno = () => {
    const juego = JSON.parse(window.sessionStorage.getItem('juego'));
    juego.primerJugador = juego.primerJugador ? false : true;
    sessionStorage.setItem('juego', JSON.stringify(juego));
}

const isGameOver = (casillaSeleccionada) => {
    const casillasArray = document.querySelectorAll('.casilla');
    //Comprobar vertical
    
}

const logicaJuego = event => {
    if(!isCasillaSeleccionable(event)) {
        event.preventDefault();
        return;
    }

    const casilla = event.target;
    seleccionarCasilla(casilla);
    //comprobar si hay un ganador
    isGanador();

    cambiarTurno();
}

window.addEventListener('load', () => {
    const tablero = document.querySelector('.contenido');
    tablero.addEventListener('click', logicaJuego);

    const juego = {
        'primerJugador': true,
        'puntuajeJugador1': 0,
        'puntuajeJugador2': 0
    }

    window.sessionStorage.setItem('juego', JSON.stringify(juego));
});