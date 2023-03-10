const BASE_URL = "http://localhost:3000/" 


//all claims
export const getClaims = async ()=>{
    const response = await fetch(`${BASE_URL}api/claims`)
    const json = await response.json()

    return json;
}


//single work
export const getClaim = async (claimId) =>{
    const response = await fetch(`${BASE_URL}api/claims/${claimId}`);
    const json = await response.json()

    if(json) return json;
    return {}
}


//posting new work
export async function addClaim(claim_formData){
    try{
        const Options = {
            method: 'POST',
            headers: {'Content-Type':"application/json"},
            body: JSON.stringify(claim_formData)
        }

        const response = await fetch(`${BASE_URL}api/claims`, Options)
        // const http = `${BASE_URL}api/works`
        const json = await response.json()
        // console.log(json)
        return json

    }catch(error){
        return error;
    }
}

//Update work
export async function updateClaim(claimId, claim_formData){
    const Options = {
        method : 'PUT',
        headers : {'Content-Type':"application/json"},
        body : JSON.stringify(claim_formData)
    }

    const response = await fetch(`${BASE_URL}api/claims/${claimId}`, Options)
    const json = await response.json()
    // console.log(json)
    return json;
}


//Delete work

export async function deleteClaim(claimId){
    const Options = {
        method: 'DELETE',
        headers: { 'Content-Type':'application/json'},
        //Not posting data nor requirement body
        // body: JSON.stringify(formData)
    }

    const response = await fetch(`${BASE_URL}api/claims/${claimId}`, Options)
    const json = await response.json()
    return json;
}