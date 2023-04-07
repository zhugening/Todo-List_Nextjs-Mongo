import {BiEdit, BiTrashAlt, BiAddToQueue , BiBody} from "react-icons/bi";
import { getWorks , getWork} from '../lib/helper';
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction, updateAction, deleteAction , trackAction } from "../redux/reducer";


export default function ShowTable( {formId} ){    
    const { isLoading, isError, data, error } = useQuery(['works', formId],()=> getWork(formId))
    // console.log(data)

    return (
        <div className="sticky top-0 ml-5">
            <title>Tracking Claim</title>
            {/* <Link className='bg-violet-900 hover:bg-violet-500 text-white font-bold py-3 px-5 rounded-full'
            href ='/'
            >Back Home</Link> */}
        <table className="table-auto">
            <thead>
                <tr className="bg-gray-600">
                <th className="border px-10 py-2">
                        <span className="text-gray-200">Date Action</span>
                    </th>

                    <th className="border px-60 py-2">
                        <span className="text-gray-200">Text update</span>
                    </th>
                    
                    <th className="border px-20 py-2">
                        <span className="text-gray-200">Responsible Person</span> 
                    </th>
                    {/* <th className="border px-4 py-2">
                        <span className="text-gray-200">Status</span>
                    </th> */}
                    <th className="border px-6 py-2 text-xs">
                        <span className="text-gray-200">Edit/Update/Track/Delete</span>
                    </th>
                </tr>
            </thead>
            <tbody className="bg-gray-200">
                {
                    data?.update?.map((obj,i)=> <Tr{...obj}key={i}/>)
                }
            </tbody>
        </table>
        </div>
    )
}

function Tr({_id, dateUpdate,text, person}){
    // console.log(_id)
    const visible = useSelector((state) => state.app.client.toggleForm)
    const dispatch = useDispatch()

    const onTrack = ()=>{
        console.log("Click here")
        dispatch(toggleChangeAction(_id))
        if(visible){
            dispatch(trackAction(_id))
        }
    }
    const onDelete = ()=>{
        if(!visible){
            dispatch(deleteAction(_id))
        }
    }

    return(
        <tr className="bg-gray-100 text-center">
                    <td className="border px-10 py-2 border-black">
                        <span className="text-sm">{dateUpdate}</span>
                    </td>
                    
                    <td className="border px-60 py-2 border-black">
                        <span className="text-sm">{text}</span>
                    </td>

                    <td className="border px-20 py-2 border-black">
                        <span className="text-sm">{person}</span>
                    </td>
                    {/* <td className="border px-4 py-2 border-black">
                        <button className="cursor"><span className={`${
                            status == "InActive" ? 'bg-red-500':
                            status == "InProgress" ? 'bg-yellow-500':
                            status == "InComplete" ? 'bg-green-500' : ""
                            } text-white px-5 py-1 rounded-full`}>{status}</span></button>
                    </td> */}
                    <td className="border px-4 py-2 border-black space-x-3">
                        <button className="cursor" onClick={onTrack}><BiEdit size={25} color={"rgb(34,197,94"}></BiEdit></button>
                        <button className="cursor" onClick={onDelete}><BiTrashAlt size={25} color={"rgb(244,63,94"}></BiTrashAlt></button>
                    </td>
                </tr>
                
    )
}