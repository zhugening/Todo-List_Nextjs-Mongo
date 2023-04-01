// Controller
import Works from "../model/work" 

// get all data from MongoDB
export async function getWorks(req,res){
    try{
        const works = await Works.find({})

        if(!Works) return res.status(404).json({error:"Data not Found"})
        res.status(200).json(works)

    }catch(error){
        res.status(404).json({error:"Error While Fetching Data"})
    }
}


// get workId data from MongoDB
export async function getWork(req,res){
    try{
        const { workId } = req.query;
        if(workId){
            const work = await Works.findById(workId);
            res.status(200).json(work)
            return;
        }
        res.status(404).json({error: "Work not Selected...!"})
    }catch(error){
        res.status(404).json({ error:"Cannot get the Work...!"})
    }
}

//post
export async function postWork(req,res){
    try{
        const formData = req.body;
        if(!formData) return res.status(404).json({error: "Form Data Not Provided"})
        Works.create(formData, function(err,data){
            console.log("Hi insert already")
            return res.status(200).json(data)
        })
    }catch(error){
        console.log("Found problem for API")
        return res.status(404).json({error})
    }
}

//put
export async function putWork(req,res){
    try{
        const {workId} = req.query;
        const formData = req.body;
        // console.log("this is fromData",formData)
        if(workId && formData){
            // const work = await Works.findOneAndUpdate(workId, formData)
            const work = await Works.findByIdAndUpdate(workId, formData);
            res.status(200).json(work)
            console.log("this is work put protocal")
            return;
            
        }
        res.status(404).json({error: "Work Not Selected...!"})
        return;
    }catch(error){
        res.status(404).json({ error: "Error While Updating the Data...! นะเว้ย"})
        return;
    }
}

//delete
export async function deleteWork(req,res){
    try{
        const {workId} = req.query;

        if(workId){
            const work = await Works.findByIdAndDelete(workId)
            return res.status(200).json({ deleted: workId})
        }

        res.status(404).json({error:"Work Not Seleted...!"})

    }catch(error){
        res.status(404).json({error: "Error While Deleting the Work..!"})
    }
}

//posts for SubDoc findOneAndUpdate => more information
// export async function postsWork(req,res){
//     try{
//         const {workId} = req.query;
//         const formData = req.body;
//         console.log(formData)

//         if(workId && formData){
//             // const work = await Works.findOneAndUpdate(
//             const work = await Works.updateOne(
//                 workId,formData)
//                 res.status(200).json(work)
//             // console.log("this is work",work)
//             return;
            
//         }
//     }catch(error){
//         console.log("Found problem for API")
//         return res.status(404).json({error})
//     }
// }

export async function postsWork(req,res){
    try{
        const {workId} = req.query;
        const formData = req.body;
        // console.log(Works.update)

        if(workId && formData){
            // const work = await Works.findOneAndUpdate(
            const work = await Works.findOneAndUpdate(
                workId,formData)
                res.status(200).json(work)
            console.log("this is postswork for update tracking")
            return;
            
        }
    }catch(error){
        console.log("Found problem for API")
        return res.status(404).json({error})
    }
}
