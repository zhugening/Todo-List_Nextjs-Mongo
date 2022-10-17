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


//post
export async function postWork(req,res){
    try{
        const formData = req.body;
        if(!formData) return res.status(404).json({error: "Form Data Not Provided"})
        Works.create(formData, function(err,data){
            return res.status(200).json(data)
        })
    }catch(error){
        return res.status(404).json({error})
    }
}

//put
export async function putWork(req,res){
    try{
        const {workId} = req.query;
        const formData = req.body;
        if(workId && formData){
            const work = await Works.findByIdAndUpdate(workId, formData);
            res.status(200).json(work)
        }
        res.status(404).json({error: "Work Not Selected...!"})
    }catch(error){
        res.status(404).json({ error: "Error While Updating the Data...!"})
    }
}