const isCasillaSeleccionable = (event) => {
    const casilla = event.target;
    const clasesArray = casilla.classList;

    if (event.currentTarget == event.target) {
        return false;
    }

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
    //modificaciones
    juego.primerJugador = juego.primerJugador ? false : true;
    juego.turno++;

    sessionStorage.setItem('juego', JSON.stringify(juego));
}

const isHorizontalWinner = (arregloCasillas) => {
    if(arregloCasillas==undefined || arregloCasillas==null || arregloCasillas.length==0) {
        return false;
    }

    for(let i=0; i<arregloCasillas.length; i++) {
        let casillaAux = arregloCasillas[i][0];
        if (casillaAux.classList.value=='casilla') {
            continue;
        }

        let coincidencia = 0;

        for(let j=0; j<arregloCasillas.length; j++) {
            
            if ( casillaAux.classList.value != arregloCasillas[i][j].classList.value) {
                break;
            }

            coincidencia++;
        }

        if(coincidencia==arregloCasillas.length) {
            return true;
        }

    }

    return false;
}

const isVerticalWinner = (arregloCasillas) => {
    if(arregloCasillas==undefined || arregloCasillas==null || arregloCasillas.length==0) {
        return false;
    }

    for(let i=0; i<arregloCasillas.length; i++) {
        let casillaAux = arregloCasillas[0][i];
        if (casillaAux.classList.value=='casilla') {
            continue;
        }

        let coincidencia = 0;

        for(let j=0; j<arregloCasillas.length; j++) {
            
            if ( casillaAux.classList.value != arregloCasillas[j][i].classList.value) {
                break;
            }

            coincidencia++;
        }

        if(coincidencia==arregloCasillas.length) {
            return true;
        }

    }

    return false;
};

const isMaximoMovimientos = (cantidadCasillas) => {
    const juego = JSON.parse(window.sessionStorage.getItem('juego'));
    const turnoContador = juego.turno;

    return turnoContador == Math.pow(cantidadCasillas, 2);
}

const isGameOver = (arregloCasillas) => {
    //ESTO DESPUES DEVOLVERA UN OBJETO

    if( isHorizontalWinner(arregloCasillas) ) {
        return true;
    }
    if( isVerticalWinner(arregloCasillas) ) {
        return true;
    }
    if( isMaximoMovimientos(arregloCasillas.length) ) {
        return true;
    }
    
}

function logicaJuego (event, arregloCasillas) {
    if(!isCasillaSeleccionable(event)) {
        event.preventDefault();
        return;
    }

    const casilla = event.target;
    seleccionarCasilla(casilla);

    if(isGameOver(arregloCasillas)) {
        console.log('TERMINO');
    }

    cambiarTurno();
}

const reiniciarTablero = (longitud) => {
    //borrar contenido
    const tablero = document.querySelector('.contenido');
    const contenidoTablero = tablero.querySelectorAll('*');
    
    for(const elemento of contenidoTablero) {
        tablero.removeChild(elemento);
    }

    const matrizCuadricula = [];    //Matriz a retornar
    //Crear la nueva cuadricula
    for(let i=0; i<longitud; i++) {
        const row = [];

        for(let j=0; j<longitud; j++) {
            const casilla = document.createElement('div');
            casilla.classList.add('casilla');

            row.push(casilla);
            tablero.appendChild(casilla);
        }

        matrizCuadricula.push(row);
    }

    return matrizCuadricula;
}

window.addEventListener('load', () => {
    const tablero = document.querySelector('.contenido');
    const arregloCasillas = reiniciarTablero(3);
    tablero.addEventListener('click', (event) => logicaJuego(event, arregloCasillas));

    const juego = {
        'primerJugador': true,
        'puntuajeJugador1': 0,
        'puntuajeJugador2': 0,
        'turno': 1
    }

    window.sessionStorage.setItem('juego', JSON.stringify(juego));
});