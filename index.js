let torneos = [];
let equiposPorTorneo = {};
let puntos = {
    equipo1: 0,
    equipo2: 0,
};

document.getElementById('formCrearTorneo').addEventListener('submit', function (e) {
    e.preventDefault();
    const nombreTorneo = document.getElementById('nombreTorneo').value;
    const tipoTorneo = document.getElementById('tipoTorneo').value;
    const formatoTorneo = document.getElementById('formatoTorneo').value;

    torneos.push({ nombre: nombreTorneo, tipo: tipoTorneo, formato: formatoTorneo });
    equiposPorTorneo[nombreTorneo] = [];
    document.getElementById('formCrearTorneo').reset();
    alert('Torneo registrado con éxito!');
    actualizarTorneos();
});

document.getElementById('formRegistrarEquipo').addEventListener('submit', function (e) {
    e.preventDefault();
    const torneoSeleccionado = document.getElementById('torneoParaRegistrar').value;
    const nombreEquipo = document.getElementById('nombreEquipo').value;
    const nombreCapitan = document.getElementById('nombreCapitan').value;

    if (equiposPorTorneo[torneoSeleccionado].length < obtenerLimiteJugadores(torneoSeleccionado)) {
        equiposPorTorneo[torneoSeleccionado].push({ nombre: nombreEquipo, capitan: nombreCapitan });
        alert('Equipo registrado con éxito!');
        document.getElementById('formRegistrarEquipo').reset();
        actualizarEquipos(); 
    } else {
        alert(`El torneo ya tiene el máximo de jugadores permitidos (${obtenerLimiteJugadores(torneoSeleccionado)})`);
    }
});

function obtenerLimiteJugadores(torneo) {
    const formato = torneos.find(t => t.nombre === torneo).formato;
    return formato === '4x4' ? 6 : 8;
}

function actualizarTorneos() {
    const selectTorneos = document.getElementById('torneoParaRegistrar');
    const selectVerEquipos = document.getElementById('torneoSeleccionado');
    selectTorneos.innerHTML = '';
    selectVerEquipos.innerHTML = '';

    torneos.forEach(torneo => {
        const option = document.createElement('option');
        option.value = torneo.nombre;
        option.textContent = torneo.nombre;
        selectTorneos.appendChild(option);

        const optionVerEquipos = document.createElement('option');
        optionVerEquipos.value = torneo.nombre;
        optionVerEquipos.textContent = torneo.nombre;
        selectVerEquipos.appendChild(optionVerEquipos);
    });
    actualizarEquipos(); 
}

function actualizarEquipos() {
    const tbody = document.querySelector('#listaEquipos tbody');
    tbody.innerHTML = '';

    const torneoSeleccionado = document.getElementById('torneoSeleccionado').value;
    equiposPorTorneo[torneoSeleccionado]?.forEach(equipo => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${equipo.nombre}</td><td>${equipo.capitan}</td>`;
        tbody.appendChild(row);
    });
}

function mostrarEquipos() {
    const torneoSeleccionado = document.getElementById('torneoSeleccionado').value;
    const selectEquipo1 = document.getElementById('selectEquipo1');
    const selectEquipo2 = document.getElementById('selectEquipo2');

    selectEquipo1.innerHTML = '<option value="" disabled selected>Seleccionar Equipo 1</option>';
    selectEquipo2.innerHTML = '<option value="" disabled selected>Seleccionar Equipo 2</option>';

    if (torneoSeleccionado) {
        equiposPorTorneo[torneoSeleccionado].forEach(equipo => {
            const option1 = document.createElement('option');
            option1.value = equipo.nombre;
            option1.textContent = equipo.nombre;
            selectEquipo1.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = equipo.nombre;
            option2.textContent = equipo.nombre;
            selectEquipo2.appendChild(option2);
        });
    }
}

document.getElementById('torneoSeleccionado').addEventListener('change', function() {
    mostrarEquipos(); 
    actualizarEquipos(); 
});

function mostrarSeccion(seccion) {
    const secciones = document.querySelectorAll('.section');
    secciones.forEach(sec => sec.style.display = 'none');
    document.getElementById(seccion).style.display = 'block';
}

function cambiarNombre(equipo) {
    const nombre = document.getElementById(equipo).value;
    if (equipo === 'equipo1') {
        document.getElementById('nombreEquipo1').textContent = nombre || 'Equipo 1';
    } else {
        document.getElementById('nombreEquipo2').textContent = nombre || 'Equipo 2';
    }
}

function sumarPunto(equipo) {
    const puntosLimite = 25;
    const diferenciaMinima = 2;

    const equipoPuntos = equipo === 'equipo1' ? 'puntosEquipo1' : 'puntosEquipo2';
    puntos[equipo] += 1;

    document.getElementById(equipoPuntos).textContent = puntos[equipo];

    if (puntos.equipo1 >= puntosLimite || puntos.equipo2 >= puntosLimite) {
        const diferencia = Math.abs(puntos.equipo1 - puntos.equipo2);

        if (diferencia >= diferenciaMinima) {
            document.getElementById('resultadoPartido').textContent = puntos.equipo1 > puntos.equipo2 ? '¡Equipo 1 gana el partido!' : '¡Equipo 2 gana el partido!';
            return;
        }
    }

    document.getElementById('resultadoPartido').textContent = 'El partido continúa...';
}
