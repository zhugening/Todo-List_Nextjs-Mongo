import {BiEdit, BiTrashAlt} from "react-icons/bi";
// import data from '../database/data.json'
import { getWorks } from '../lib/helper';
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction, updateAction, deleteAction } from "../redux/reducer";

export default function Table(){

    // const state2 = useSelector((state) => state.app.client.toggleForm)
    // console.log("this is state",state2)
    // state.app.client.toggleForm

    
    // getWork().then(res=> console.log(res)) # return all works

    const { isLoading, isError, data, error } = useQuery('works', getWorks) 
    
    if(isLoading) return <div>Work is Loading...</div>;
    if(isError) return <div>Got Error {error}</div>


    return (
        <table className="min-w-full table-auto">
            <thead>
                <tr className="bg-gray-800">
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Device Number</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Text</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Date Update</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Who responsibility</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Status</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Notes</span>
                    </th>
                </tr>
            </thead>
            <tbody className="bg-gray-200">
                {
                    data.map((obj,i)=> <Tr{...obj}key={i}/>)
                }
            </tbody>
        </table>
    )
}

function Tr({_id,name,text,date,responsibility,status}){

    const visible = useSelector((state) => state.app.client.toggleForm)
    // console.log(visible)
    const dispatch = useDispatch()

    const onUpdate = ()=>{
        dispatch(toggleChangeAction(_id))
        // console.log(visible)
        if(visible){
            dispatch(updateAction(_id))
        }
    }
    const onDelete = ()=>{
        if(!visible){
            dispatch(deleteAction(_id))
        }
    }


    return(
        <tr className="bg-gray-50 text-center">
                    <td className="px-16 py-2 flex flex-row items-center">
                        <img src="" alt="" />
                        {/* <img src="" alt="" className="h-8 w-8 rounded-full object-cover"/> */}
                        <span className="text-center ml-2 font-semibold">{name}</span>
                    </td>
                    <td className="px-16 py-2">
                        <span>{text}</span>
                    </td>
                    <td className="px-16 py-2">
                        <span>{date}</span>
                    </td>
                    <td className="px-16 py-2">
                        <span>{responsibility}</span>
                    </td>
                    <td className="px-16 py-2">
                        <button className="cursor"><span className={`${status == "Active" ? 'bg-green-500':'bg-rose-500'} text-white px-5 py-1 rounded-full`}>{status}</span></button>
                    </td>
                    <td className="px-16 py-2 flex justify-around gap-5">
                        <button className="cursor" onClick={onUpdate}><BiEdit size={25} color={"rgb(34,197,94"}></BiEdit></button>
                        <button className="cursor" onClick={onDelete}><BiTrashAlt size={25} color={"rgb(244,63,94"}></BiTrashAlt></button>
                    </td>
                </tr>
    )
}