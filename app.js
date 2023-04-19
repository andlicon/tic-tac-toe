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
    juego.primerJugador = juego.primerJugador ? false : true;
    juego.turno++;
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
    // isGanador();

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
    console.log(arregloCasillas);
    tablero.addEventListener('click', logicaJuego);

    const juego = {
        'primerJugador': true,
        'puntuajeJugador1': 0,
        'puntuajeJugador2': 0,
        'turno': 0
    }

    window.sessionStorage.setItem('juego', JSON.stringify(juego));
});