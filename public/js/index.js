
import { getEstudiantes, patchEstudiantes } from "../services/servicesUser.js";

//Invocaciones-Login
const inputUsuario=document.getElementById("user");
const inputPassword=document.getElementById("password");
const btnLogin=document.getElementById("btnLogin");
const loginEspacio=document.getElementById("loginEspacio")

//Zona de login inicio
btnLogin.addEventListener("click", async function () {
    const usuarioLogin={
        user:inputUsuario.value,
        password:inputPassword.value
    };
    const estudiantes=await getEstudiantes();
//Esto es para que solo deje pasar si es exactamente igual, y un and para asegurar de que se necesiten ambos datos correctos para acceder
    const estudianteEncontrado =estudiantes.filter(student =>
        student.userName === usuarioLogin.user &&
        student.passwordRegister === usuarioLogin.password
    );
    //Esto lo uso para limpiar los inputs
    loginEspacio.innerHTML="";
    //Por si un espacio queda en blanco
    if(!usuarioLogin.user||!usuarioLogin.password){
        loginEspacio.innerHTML="";
        const mensajeLoginA=document.createElement("h2");
        mensajeLoginA.textContent="Por favor llenar todos los campos";
        mensajeLoginA.style.color="red";
        loginEspacio.appendChild(mensajeLoginA);
        return;
    }
    //Este hace que el valor logged sea verdadero y manda el id,userName, y identifica si es admin o no
    if(estudianteEncontrado.length>0){
        const usuario = estudianteEncontrado[0];
        await patchEstudiantes(usuario.id,{logged:true});
        localStorage.setItem("logueado",JSON.stringify({
            identificacion: usuario.id,
            userName:usuario.userName,
            Administrador: usuario.admin
        }));
        //esto tambien limpia pero no me acuerdo como funcionaba junto al anterior
        inputUsuario.value="";
        inputPassword.value="";
        window.location.href="../pages/paginaPrincipal.html";
    }
    //Y por ultimo por si el usuario o la contraseña estan incorrectas
    else{
        loginEspacio.innerHTML="";
        const mensajeLoginB=document.createElement("h2");
        mensajeLoginB.textContent="Usuario o contraseña incorrectos";
        mensajeLoginB.style.color="red";
        loginEspacio.appendChild(mensajeLoginB);
        //Este sirve solo para limpiar la contraseña mas no el usuario
        inputPassword.value="";
    }
});
//Zona de login fin
