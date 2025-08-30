
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

    const estudianteEncontrado =estudiantes.filter(student =>
        student.userName === usuarioLogin.user &&
        student.passwordRegister === usuarioLogin.password
    );
    loginEspacio.innerHTML="";
    if(!usuarioLogin.user||!usuarioLogin.password){
        loginEspacio.innerHTML="";
        const mensajeLoginA=document.createElement("h2");
        mensajeLoginA.textContent="Por favor llenar todos los campos";
        mensajeLoginA.style.color="red";
        loginEspacio.appendChild(mensajeLoginA);
        return;
    }
    if(estudianteEncontrado.length>0){
        const usuario = estudianteEncontrado[0];
        await patchEstudiantes(usuario.id,{logged:true});
        localStorage.setItem("logueado",JSON.stringify({
            identificacion: usuario.id,
            userName:usuario.userName,
            Administrador: usuario.admin
        }))
        window.location.href="../pages/paginaPrincipal.html";
    }
    else{
        loginEspacio.innerHTML="";
        const mensajeLoginB=document.createElement("h2");
        mensajeLoginB.textContent="Usuario o contraseña incorrectos";
        mensajeLoginB.style.color="red";
        loginEspacio.appendChild(mensajeLoginB);
    }
});
//Zona de login fin
