import { getConsultas } from "../services/servicesConsulta.js";

//Invocaciones
const barraBusqueda = document.getElementById("barraBusqueda");
const btnFiltro = document.getElementById("btnFiltro");
const espacioConsultas = document.getElementById("espacioConsultas");

let todasLasConsultas = [];
//Listeners
document.addEventListener("DOMContentLoaded", cargarConsultas);
btnFiltro.addEventListener("click", filtrarPorUsuario);
barraBusqueda.addEventListener("input", filtrarPorUsuario);

//Zona de carga de consultas
async function cargarConsultas() {
    try {
        todasLasConsultas = await getConsultas();
        renderLista(todasLasConsultas);
    } catch (error) {
        console.error(error);
        espacioConsultas.innerHTML = "";
        const mensajeError = document.createElement("p");
        mensajeError.textContent = "No se pudieron cargar las consultas.";
        mensajeError.style.color = "red";
        espacioConsultas.appendChild(mensajeError);
    }
}
//Zona de carga de consultas fin

//Zona de renderisacion(no se si se escribe asi y que pereza corregirlo) de consultas
function renderLista(lista) {
    espacioConsultas.innerHTML = "";

    if (!lista || lista.length === 0) {
        const mensajeVacio = document.createElement("p");
        mensajeVacio.textContent = "Sin resultados.";
        espacioConsultas.appendChild(mensajeVacio);
        return;
    }

    const nodos = lista.map((consulta) => {
        const fila = document.createElement("div");
        fila.className = "fila-consulta";

        const columnaPosicion = document.createElement("p");
        columnaPosicion.textContent = consulta.numero != null ? consulta.numero + "." : ".";

        const columnaUsuario = document.createElement("p");
        columnaUsuario.textContent = consulta.userName || "Anonimo";

        const columnaConsulta = document.createElement("p");
        columnaConsulta.textContent = consulta.consulta || "";

        const columnaFecha = document.createElement("p");
        columnaFecha.textContent = consulta.fecha || "";

        fila.appendChild(columnaPosicion);
        fila.appendChild(columnaUsuario);
        fila.appendChild(columnaConsulta);
        fila.appendChild(columnaFecha);

        return fila;
    });

    nodos.forEach((nodo) => espacioConsultas.appendChild(nodo));
}
//Zona de render de consultas fin

//Zona de filtrado por usuario
function filtrarPorUsuario() {
    const textoBusqueda = barraBusqueda.value.toLowerCase();

    const filtradas = todasLasConsultas.filter((consulta) => {
        const user = (consulta.userName || "").toLowerCase();
        return user.includes(textoBusqueda);
    });

    renderLista(filtradas);
}
//Zona de filtrado por usuario fin