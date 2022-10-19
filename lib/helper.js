
const BASE_URL = "http://localhost:3000" 


//all works
export const getWorks = async ()=>{
    const response = await fetch(`${BASE_URL}/api/works`)
    const json = await response.json()

    return json;
}


//single work
export const getWork = async(workId) =>{
    const response = await fetch(`${BASE_URL}api/users/${workId}`);
    const json = await response.json()

    if(json) return json;
    return {}
}


//posting new work
export async function addWork(formData){
    try{
        const Options = {
            method: 'POST',
            header: {'Content-Type':"application/json"},
            body:JSON.stringify(formData)
        }

        const response = await fetch(`${BASE_URL}api/works`, Options)
        const json = await response.json()

        return json

    }catch(error){
        return error;
    }
}

//Update work
export async function updateWork(workId, formData){
    const Options = {
        method: 'PUT',
        header: {'Content-Type':"application/json"},
        body:JSON.stringify(formData)
    }

    const response = await fetch(`${BASE_URL}api/works/${workId}`, Options)
    const json = await response.json()
    return json;
}


//Delete work

export async function deleteWork(workId){
    const Options = {
        method: "DELETE",
        header: {'Content-Type':'application/json'},
        //Not posting data nor requirement body
        // body: JSON.stringify(formData)
    }

    const response = await fetch(`${BASE_URL}api/works/${workId}`, Options)
    const json = await response.json()
    return json;
}