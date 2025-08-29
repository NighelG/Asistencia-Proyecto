import { getEstudiantes,postEstudiantes,patchEstudiantes } from "../services/servicesUser.js";
import { postConsultas } from "../services/servicesConsulta.js";

const cerrarSesion=document.getElementById("btnCerrarSesion");
const inputConsulta=document.getElementById("inputConsulta");
const inputFecha=document.getElementById("inputFecha");
const btnConsulta=document.getElementById("btnConsulta");
const espacioInfo=document.getElementById("espacioInfo");
const espacioError=document.getElementById("espacioError")

cerrarSesion.addEventListener("click", async function () {
    const respuesta = await fetch("http://localhost:3001/estudiantes");
    const estudiantes= await respuesta.json();
    const usuarioOnline = estudiantes.find(usuarios => usuarios.logged===true);

    if(usuarioOnline){
        await patchEstudiantes(usuarioOnline.id,{logged: false});
    }
    window.location.href="../pages/index.html";
})

btnConsulta.addEventListener("click", async function () {
    const consultaData={
        consulta:inputConsulta.value,
        fecha:inputFecha.value,
    };
    if(!consultaData.consulta||!consultaData.fecha){
            espacioError.innerHTML=""
            const respuestaA=document.createElement("h2");
            respuestaA.textContent="Por favor, llenar todos los espacios para continuar";
            respuestaA.style.color="red";
            espacioError.appendChild(respuestaA);
            return;
    }
    else{
        const datoConsulta=document.createElement("p")
        datoConsulta.textContent=inputConsulta.value;
        const datoFecha=document.createElement("p");
        datoFecha.textContent=inputFecha.value;
        espacioInfo.appendChild(datoConsulta);
        espacioInfo.appendChild(datoFecha);
    }
    const confirmarRespuesta = await postConsultas(consultaData);
    console.log(confirmarRespuesta);
})