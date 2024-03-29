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
            // console.log("Hi insert already")
            return res.status(200).json(data)
        })
    }catch(error){
        // console.log("Found problem for API")
        return res.status(404).json({error})
    }
}

//put
export async function putWork(req,res){
    try{
        const {workId} = req.query;
        const formData = req.body;
        // console.log("this is fromData",formData)
        if(workId&&formData){
            // console.log("START PutWork GO!!!!")
            // const work = await Works.findOneAndUpdate(workId, formData)
            const work = await Works.findByIdAndUpdate(workId, formData)
            res.status(200).json(work)
            // console.log("this is putWork is working")
            return;
            
        }
        res.status(404).json({error: "Work Not Selected...!"})
        return;
    }catch(error){
        res.status(404).json({error: "Error While Updating the Data...! นะเว้ยยยยยยยย"})
        return;
    }
}

//delete
export async function deleteWork(req,res){
    try{
        const {workId} = req.query;
        if(workId){
            // console.log("START DeleteWork GO!!!!!")
            const work = await Works.findByIdAndDelete(workId)
            return res.status(200).json({ deleted: workId})
        }

        res.status(404).json({error:"Work Not Seleted...!"})

    }catch(error){
        res.status(404).json({error: "Error While Deleting the Work..!"})
    }
}

export async function deleteTrackWork(req,res){
    try{
        const {workId} = req.query;
        const trackId = req.body;
        
        if(workId&&trackId){
            // console.log("START DeleteTrackWork GO!!!!!")
            // findByIdAndDelete : ลบทั้ง workId
            // findByIdAndUpdate : pull track it's okay but hash putwork and postswork
            // updateOne : pull track it's okay but hash putwork and postswork
            // const work = await Works.findOneAndUpdate(
            const work = await Works.findByIdAndUpdate({'_id': workId} , {
                $pull: {
                    'update': {
                        '_id': trackId
                    }
                } 
            });
            // console.log("this is deletedTrackWork is working")
            return;
        } 
    }catch(error){
        res.status(404).json({error: "Error While Deleting the Work..!"})
    }
}

export async function updateTrackWork(req,res){
    try{
        const {workId} = req.query;
        const formData = req.body;
        
        if((formData.dateUpdate != undefined)&&(formData.text != undefined)&&(formData.person != undefined)){
            const work = await Works.findByIdAndUpdate({'_id': workId} , {
                $push:{
                    'update': {
                        'dateUpdate': formData.dateUpdate,
                        'text': formData.text,
                        'person': formData.person
                    }
                }
            });
            // console.log("this is updateTrackWork is working")
            return ;        
        }
    }catch(error){
        // console.log("Found problem for API")
        return res.status(404).json({error})
    }
}

