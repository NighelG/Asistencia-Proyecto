import { getConsultas,patchConsultas, postConsultas } from "../services/servicesConsulta.js";

//Invocaciones
const barraBusqueda = document.getElementById("barraBusqueda");
const btnFiltro = document.getElementById("btnFiltro");
const espacioConsultas = document.getElementById("espacioConsultas");

let todasLasConsultas = [];
//Listeners
document.addEventListener("DOMContentLoaded", cargarConsultas);
btnFiltro.addEventListener("click", filtrarPorUsuario);
barraBusqueda.addEventListener("input", filtrarPorUsuario);

//Zona de carga de consultas inicio
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

//Zona de renderizacion(no se si se escribe asi y que pereza corregirlo) de consultas inicio
function renderLista(lista) {
    espacioConsultas.innerHTML = "";

    if (!lista || lista.length === 0) {
        const mensajeVacio = document.createElement("p");
        mensajeVacio.textContent = "Sin resultados.";
        espacioConsultas.appendChild(mensajeVacio);
        return;
    }
    const nodos = lista.map((consulta) => {
        //Todo esto es para lo visual de la consulta
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
        const inputRespuesta=document.createElement("input");
        inputRespuesta.style.height="50px";
        inputRespuesta.style.width="600px";
        const btnRespuesta=document.createElement("button");
        btnRespuesta.textContent="Responder";
        btnRespuesta.style.height="50px";
        btnRespuesta.style.width="200px";
        const espacioAlerta=document.createElement("div");
        fila.appendChild(columnaPosicion);
        fila.appendChild(columnaUsuario);
        fila.appendChild(columnaConsulta);
        fila.appendChild(columnaFecha);
        fila.appendChild(inputRespuesta)
        fila.appendChild(btnRespuesta);
        fila.appendChild(espacioAlerta);

    //Funcionalidad del boton responder, (lo ultimo que hize) Inicio
        btnRespuesta.addEventListener("click", async function (){
            await patchConsultas(consulta.id,{resuelto:true,respuesta:inputRespuesta.value})
            const espacioRespuesta={
                answer:inputRespuesta.value
            };
        //Por si no se pone nadita en el input
            if(!inputRespuesta.value){
            espacioAlerta.innerHTML="";
            const mensajeAlerta=document.createElement("h3");
            mensajeAlerta.textContent="Por favor, escribe una respuesta";
            mensajeAlerta.style.color="red";
            espacioAlerta.appendChild(mensajeAlerta);
            return;
            }
            else{
                espacioAlerta.innerHTML="";
                const respuestaPositiva=document.createElement("h3");
                respuestaPositiva.textContent="Respuesta enviada";
                respuestaPositiva.style.color="green";
                espacioAlerta.appendChild(respuestaPositiva);
                /* fila.remove(); */
            };
        const confirmarRespuesta = await patchConsultas(espacioRespuesta);
        console.log(confirmarRespuesta);
        });
    return fila;
    });
    nodos.forEach((nodo) => espacioConsultas.appendChild(nodo));
};
//Zona de render de consultas fin

//Zona de filtrado por usuario inicio
function filtrarPorUsuario() {
    const textoBusqueda = barraBusqueda.value.toLowerCase();

    const filtradas = todasLasConsultas.filter((consulta) => {
        const user = (consulta.userName || "").toLowerCase();
        return user.includes(textoBusqueda);
    });

    renderLista(filtradas);
}
//Zona de filtrado por usuario fin