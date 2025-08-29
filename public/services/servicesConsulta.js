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
        console.error("ERROR, algo salio mal al obtener la informacion del consultas",error);
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
        console.error("ERROR, no se pudo subir la informacion de consultas",error);
        throw error
    }
}
export{postConsultas}