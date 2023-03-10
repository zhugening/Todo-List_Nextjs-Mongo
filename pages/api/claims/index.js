import connectMongo from "../../../database/conn"
import { getClaims, postClaim, putClaim, deleteClaim } from "../../../database/claim_controller";

export default async function handler(req, res) {
  connectMongo().catch(()=> res.status(405).json({error:"Error in the Connection"}))
  //type of request
  //['GET','POST','PUT','DELETE']
  const { method } = req


  switch(method){
    case 'GET':
        getClaims(req,res)
        // res.status(200).json({method,name:'GET Request'});
        break;
    case 'POST':
        // res.status(200).json({method,name:'POST Request'});
        postClaim(req,res)
        break;
    case 'PUT':
        // res.status(200).json({method,name:'PUT Request'});
        putClaim(req,res)
        break;
    case 'DELETE':
        // res.status(200).json({method,name:'DELETE Request'});
        deleteClaim(req,res)
        break;
    default:
        res.setHeader('Allow',['GET','POST','PUT','DELETE']);
        res.status(405).end(`Method${method} Not Allowd`)
        break;
  }
}