import { getEstudiantes,postEstudiantes,patchEstudiantes } from "../services/servicesUser.js";
import { postConsultas } from "../services/servicesConsulta.js";
//Invocaciones
const cerrarSesion=document.getElementById("btnCerrarSesion");
const inputConsulta=document.getElementById("inputConsulta");
const inputFecha=document.getElementById("inputFecha");
const btnConsulta=document.getElementById("btnConsulta");
const btnEstadisticas=document.getElementById("btnEstadisticas")
const espacioInfo=document.getElementById("espacioInfo");
const espacioError=document.getElementById("espacioError")
//Invocaciones

//Esto es para identificar el usuario loggeado y identificar la posicion de la consulta
const usuarioLogueado=JSON.parse(localStorage.getItem("logueado"));
let consultasGuardadas=JSON.parse(localStorage.getItem("consultas")) ||[];
let consultaPosicion= consultasGuardadas.length +1;

//Esto es para que las consultas se muestren visualmente en la pagina
function mostrarConsultas(consultaData){
        const datoPosicion=document.createElement("p")
        datoPosicion.textContent=consultaData.numero+".";
        const datoUsuario=document.createElement("p");
        datoUsuario.textContent=consultaData.userName;
        const datoConsulta=document.createElement("p");
        datoConsulta.textContent=consultaData.consulta;
        const datoFecha=document.createElement("p")
        datoFecha.textContent=consultaData.fecha;;
        espacioInfo.appendChild(datoPosicion);
        espacioInfo.appendChild(datoUsuario);
        espacioInfo.appendChild(datoConsulta);
        espacioInfo.appendChild(datoFecha);
}

consultasGuardadas.forEach(mostrarConsultas);

//Esto es para que al iniciar o cerrar sesion el dato logged pasa a true/false, igual no tenia necesidad de agregarlo
cerrarSesion.addEventListener("click", async function () {
    const respuesta = await fetch("http://localhost:3001/estudiantes");
    const estudiantes= await respuesta.json();
    const usuarioOnline = estudiantes.find(usuarios => usuarios.logged===true);
//Queda como vestigio de una funcion remplazada por localStorage mas no relegada ya que la reutilize para otra cosa
    if(usuarioOnline){
        await patchEstudiantes(usuarioOnline.id,{logged: false});
    }
    localStorage.removeItem("logueado")
/*     localStorage.removeItem("consultas") */
    window.location.href="../pages/index.html";
})
//Zona de posteo de consultas Inicio
btnConsulta.addEventListener("click", async function () {
    let userName;
    if (usuarioLogueado){
        userName=usuarioLogueado.userName;
    }
        //Este else lo hize por si de alguna manera alguien entra sin iniciar sesion
    else{
        userName="Anonimo";
    }
    //Datos que se toman de la consulta
    const consultaData={
        consulta:inputConsulta.value,
        fecha:inputFecha.value,
        userName: userName,
        numero: consultaPosicion,
        resuelto: false,
        respuesta:""
    };
    //If por si uno o mas espacios estan vacios
    if(!consultaData.consulta||!consultaData.fecha){
            espacioError.innerHTML=""
            const respuestaA=document.createElement("h2");
            respuestaA.textContent="Por favor, llenar todos los espacios para continuar";
            respuestaA.style.color="red";
            espacioError.appendChild(respuestaA);
            return;
    }
    mostrarConsultas(consultaData);
    consultasGuardadas.push(consultaData);
    localStorage.setItem("consultas",JSON.stringify(consultasGuardadas));
    const confirmarRespuesta = await postConsultas(consultaData);
    console.log("Guardado",confirmarRespuesta);
    consultaPosicion++;
});
//Zona de posteo de consultas Inicio

//Zona de btn Estadistcas Inicio
btnEstadisticas.addEventListener("click", async function () {
    const usuarioLogueado=JSON.parse(localStorage.getItem("logueado"));

    if(usuarioLogueado&&usuarioLogueado.Administrador===true){
        window.location.href="../pages/xestadisticas.html";
    }
    else{
        espacioError.innerHTML="";
        const alertaPermisos=document.createElement("h2");
        alertaPermisos.textContent="No tienes los permisos necesarios para acceder";
        alertaPermisos.style.color="red";
        espacioError.appendChild(alertaPermisos);
        return;
    };
});
//Zona de btn Estadistcas Fin