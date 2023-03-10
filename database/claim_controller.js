// Controller
import Claims from "../model/claim" 

// get all data from MongoDB
export async function getClaims(req,res){
    try{
        const claims = await Claims.find({})

        if(!Claims) return res.status(404).json({error:"Data not Found"})
        res.status(200).json(claims)

    }catch(error){
        res.status(404).json({error:"Error While Fetching Data"})
    }
}


// get workId data from MongoDB
export async function getClaim(req,res){
    try{
        const { claimId } = req.query;
        if(claimId){
            const claim = await Claims.findById(claimId);
            res.status(200).json(claim)
            return;
        }
        res.status(404).json({error: "Claim not Selected...!"})
    }catch(error){
        res.status(404).json({ error:"Cannot get the Claim...!"})
    }
}

//post
export async function postClaim(req,res){
    try{
        const claim_formData = req.body;
        console.log(claim_formData)
        if(!claim_formData) return res.status(404).json({error: "Form Data Not Provided"})
        Claims.create(claim_formData, function(err,data){
            console.log("Hi insert already")
            return res.status(200).json(data)
        })
    }catch(error){
        console.log("Found problem for API")
        return res.status(404).json({error})
    }
}

//put
export async function putClaim(req,res){
    try{
        const {claimId} = req.query;
        const claim_formData = req.body;
        if(claimId && claim_formData){
            const claim = await Claims.findByIdAndUpdate(claimId, claim_formData);
            res.status(200).json(claim)
            return;
        }
        res.status(404).json({error: "Claim Not Selected...!"})
    }catch(error){
        res.status(404).json({ error: "Error While Updating the Data...!"})
    }
}

//delete
export async function deleteClaim(req,res){
    try{
        const {claimId} = req.query;

        if(claimId){
            const claim = await Claims.findByIdAndDelete(claimId)
            return res.status(200).json({ deleted: claimId})
        }

        res.status(404).json({error:"Claim Not Seleted...!"})

    }catch(error){
        res.status(404).json({error: "Error While Deleting the Claim..!"})
    }
}