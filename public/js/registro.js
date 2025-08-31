import { postEstudiantes } from "../services/servicesUser.js";

//Invocaciones-Registro
const nombreCompleto=document.getElementById("nombreReg");
const nombreUsuario=document.getElementById("userReg");
const correoRegistro=document.getElementById("correoReg");
const passwordRegistro=document.getElementById("passwordReg");
const btnRegistro=document.getElementById("btnRegistro");
const registroEspacio=document.getElementById("registroEspacio")

//Zona de registro inicio
btnRegistro.addEventListener("click", async function () {
    //Datos que subira al db.json
    const estudianteInfo={
        completeName: nombreCompleto.value,
        userName: nombreUsuario.value,
        email: correoRegistro.value,
        passwordRegister: passwordRegistro.value,
        admin: false,
        logged: false
    };
    //Esto es para identicar quienes son admins, lo cambiare si tengo tiempo
        if(nombreUsuario.value === "Nighel"||nombreUsuario.value === "Camelia"){
            estudianteInfo.admin=true;
        };
        //respuesta negativa
        if(!estudianteInfo.completeName||!estudianteInfo.userName||!estudianteInfo.email||!estudianteInfo.passwordRegister){
            registroEspacio.innerHTML=""
            const respuestaA=document.createElement("h2");
            respuestaA.textContent="Por favor, llenar todos los espacios para continuar";
            respuestaA.style.color="red";
            registroEspacio.appendChild(respuestaA);
            return;
        }
        //respuesta positiva
        else{
            const respuestaB=document.createElement("h2");
            respuestaB.textContent="Registro completo";
            respuestaB.style.color="green";
            registroEspacio.appendChild(respuestaB);
            //Esto limpia los inputs
            nombreCompleto.value=""
            nombreUsuario.value=""
            correoRegistro.value=""
            passwordRegistro.value=""
        }
    const confirmarRespuesta = await postEstudiantes(estudianteInfo);
    console.log(confirmarRespuesta);
});

//Zona de registro fin