import connectMongo from "../../../database/conn"
import { getWorks } from "../../../database/controller";

export default async function handler(req, res) {
  connectMongo().catch(()=> res.status(405).json({error:"Error in the Connection"}))
  //type of request
  //['GET','POST','PUT','DELETE']
  const { method } = req


  switch(method){
    case 'GET':
        getWorks(req,res)
        // res.status(200).json({method,name:'GET Request'});
        break;
    case 'POST':
        res.status(200).json({method,name:'POST Request'});
        break;
    case 'PUT':
        res.status(200).json({method,name:'PUT Request'});
        break;
    case 'DELETE':
        res.status(200).json({method,name:'DELETE Request'});
        break;
    default:
        res.setHeader('Allow',['GET','POST','PUT','DELETE']);
        res.status(405).end(`Method${method} Not Allowd`)
        break;
  }
}
