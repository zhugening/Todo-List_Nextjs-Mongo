// Controller
import Works from "../model/work" 

export async function getWorks(req,res){
    try{
        const works = await Works.find({})

        if(!Works) return res.status(404).json({error:"Data not Found"})
        res.status(200).json(works)

    }catch(error){
        res.status(404).json({error:"Error While Fetching Data"})
    }
}