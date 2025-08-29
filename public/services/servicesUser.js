// GET
async function getEstudiantes() {
    try {
        const response = await fetch('http://localhost:3001/estudiantes',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
            const estudiante = await response.json()
            return estudiante
    } catch (error) {
        console.error("ERROR, algo salio mal al obtener la informacion del estudiante",error);
        throw error
    }
}
export{getEstudiantes}
//POST
async function postEstudiantes(estudiantes) {
    try {
        const response = await fetch('http://localhost:3001/estudiantes',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(estudiantes)
        })
            const estudianteData = await response.json()
            return estudianteData
    } catch (error) {
        console.error("ERROR, no se pudo subir la informacion de estudiante",error);
        throw error
    }
}
export{postEstudiantes}

//PATCH
async function patchEstudiantes(id, data) {
    try {
        const response = await fetch('http://localhost:3001/estudiantes/'+id,{
            method:'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        })
            const estudianteActualizado = await response.json()
            return estudianteActualizado
    } catch (error) {
        console.error("ERROR, no se pudo Actualizar la informacion de estudiante",error);
        throw error
    }
}
export{patchEstudiantes}