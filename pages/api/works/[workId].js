import connectMongo from "../../../database/conn"
import { getWork, putWork, deleteWork, deleteTrackWork , updateTrackWork} from "../../../database/controller";

export default async function handler(req, res) {
    connectMongo().catch(()=> res.status(405).json({error:"Error in the Connection"}))
    
    //type of request
    const { method } = req

    switch (method){
        case "GET":
            getWork(req,res);
            break;
        case "PUT":
            putWork(req,res)
            deleteTrackWork(req,res)
            updateTrackWork(req,res);
            break;
        case "DELETE":
            deleteWork(req,res);
            break;
        default:
            res.setHeader('Allow',['GET','POST','PUT','DELETE']);
            res.status(405).end(`Method${method} Not Allowd`)
            break;
    }
}

// bug putwork แล้วมี objectId เพิ่มมา 
// bug deleteTrackWork แล้วมี objectId เพิ่มมา