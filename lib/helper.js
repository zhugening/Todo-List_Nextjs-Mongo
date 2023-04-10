
const BASE_URL = "http://localhost:3000/" 


//all works
export const getWorks = async ()=>{
    const response = await fetch(`${BASE_URL}api/works`)
    const json = await response.json()

    return json;
}


//single work
export const getWork = async (workId) =>{
    const response = await fetch(`${BASE_URL}api/works/${workId}`);
    const json = await response.json()

    if(json) return json;
    return {}
}


//posting new work
export async function addWork(formData){
    try{
        const Options = {
            method: 'POST',
            headers: {'Content-Type':"application/json"},
            body: JSON.stringify(formData)
        }

        const response = await fetch(`${BASE_URL}api/works`, Options)
        // const http = `${BASE_URL}api/works`
        const json = await response.json()
        // console.log(json)
        return json

    }catch(error){
        return error;
    }
}

//Update work
export async function updateWork(workId, formData){
    const Options = {
        method : 'PUT',
        headers : {'Content-Type':"application/json"},
        body : JSON.stringify(formData)
    }

    const response = await fetch(`${BASE_URL}api/works/${workId}`, Options)
    const json = await response.json()
    // console.log(json)
    return json;
}


//Delete work

export async function deleteWork(workId){
    const Options = {
        method: 'DELETE',
        headers: { 'Content-Type':'application/json'},
        //Not posting data nor requirement body
        // body: JSON.stringify(formData)
    }

    const response = await fetch(`${BASE_URL}api/works/${workId}`, Options)
    const json = await response.json()
    return json;
}

//UpdateTrack
export async function updateTrackWork(workId, formData){
    const Options = {
        method : 'PUT',
        headers : {'Content-Type':"application/json"},
        body : JSON.stringify(formData)
    }

    const response = await fetch(`${BASE_URL}api/works/${workId}`, Options)
    const json = await response.json()
    return json;
}

export async function deleteTrackWork(workId, trackId){
    const Options = {
        method: 'PUT',
        headers: { 'Content-Type':'application/json'},
        body : JSON.stringify(trackId)
        //Not posting data nor requirement body
        // body: JSON.stringify(formData)
    }
    // const response = await fetch(`${BASE_URL}api/works/${workId}/track/${trackId}`, Options)
    const response = await fetch(`${BASE_URL}api/works/${workId}`, Options)
    const json = await response.json()
    return json;
}