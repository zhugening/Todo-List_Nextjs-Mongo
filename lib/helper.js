
const BASE_URL = "http://localhost:3000" 

export const getWork = async ()=>{
    const response = await fetch(`${BASE_URL}/api/works`)
    const json = await response.json()
}