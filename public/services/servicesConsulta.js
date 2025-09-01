// GET
async function getConsultas() {
    try {
        const response = await fetch('http://localhost:3001/consultas',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
            const consultas = await response.json()
            return consultas
    } catch (error) {
        console.error("ERROR, algo salio mal al obtener la informacion de la consultas",error);
        throw error
    }
}
export{getConsultas}
//POST
async function postConsultas(Consultas) {
    try {
        const response = await fetch('http://localhost:3001/consultas',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(Consultas)
        })
            const consultasData = await response.json()
            return consultasData
    } catch (error) {
        console.error("ERROR, no se pudo subir la informacion de la consultas",error);
        throw error
    }
}
export{postConsultas}

//PATCH
async function patchConsultas(id, data) {
    try {
        const response = await fetch('http://localhost:3001/consultas/'+id,{
            method:'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        })
            const consultaActualizado = await response.json()
            return consultaActualizado
    } catch (error) {
        console.error("ERROR, no se pudo Actualizar la informacion de la consulta",error);
        throw error
    }
}
export{patchConsultas}