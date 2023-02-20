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
    // console.log(data)
    if(isLoading) return <div>Work is Loading...</div>;
    if(isError) return <div>Got Error {error}</div>


    return (
        <table className="ml-0 table-auto item item-center">
            <thead>
                <tr className="bg-gray-800">
                    <th className="px-10 py-2">
                        <span className="text-gray-200">Claim No.</span>
                    </th>
                    <th className="px-8 py-2">
                        <span className="text-gray-200">Contract No.</span>
                    </th>
                    <th className="px-8 py-2">
                        <span className="text-gray-200">EGAT Serial No.</span>
                    </th>
                    <th className="px-10 py-2">
                        <span className="text-gray-200">Claim Booking No.</span>
                    </th>
                    <th className="px-8 py-2">
                        <span className="text-gray-200">Device No.</span>
                    </th>
                    <th className="px-10 py-2">
                        <span className="text-gray-200">Eq/Pos</span>
                    </th>
                    <th className="px-10 py-2">
                        <span className="text-gray-200">Date</span>
                    </th>
                    <th className="px-10 py-2">
                        <span className="text-gray-200">Who take action</span>
                    </th>
                    <th className="px-10 py-2">
                        <span className="text-gray-200">Status</span>
                    </th>
                    <th className="px-10 py-2">
                        <span className="text-gray-200">Update/Delete</span>
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

function Tr({_id, claim_no, contract_no, egat_sn, claim_booking, device_no, eqiupment, date, responsibility, status}){

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
    // console.log(date)
    return(
        <tr className="bg-gray-200 text-center">
                    <td className="px-16 py-2 flex flex-row items-center">
                        <span className="text-xs flex md:inline-flex">{claim_no}</span>
                    </td>
                    <td className="px-16 py-2">
                        <span className="text-xs">{contract_no}</span>
                    </td>
                    <td className="px-16 py-2">
                        <span className="text-xs">{egat_sn}</span>
                    </td>
                    <td className="px-16 py-2">
                        <span className="text-xs">{claim_booking}</span>
                    </td>
                    <td className="px-16 py-2">
                        <span className="text-sm">{device_no}</span>
                    </td>
                    <td className="px-16 py-2">
                        <span className="text-sm">{eqiupment}</span>
                    </td>
                    <td className="px-16 py-2">
                        <span className="text-sm">{date}</span>
                    </td>
                    <td className="px-16 py-2">
                        <span className="text-sm">{responsibility}</span>
                    </td>
                    <td className="px-16 py-2">
                        <button className="cursor"><span className={`${status == "Active" ? 'bg-green-500':'bg-rose-500'} text-white px-5 py-1 rounded-full`}>{status}</span></button>
                    </td>
                    <td className="px-16 py-2 flex justify-around item items-center gap-5">
                        <button className="cursor" onClick={onUpdate}><BiEdit size={25} color={"rgb(34,197,94"}></BiEdit></button>
                        <button className="cursor" onClick={onDelete}><BiTrashAlt size={25} color={"rgb(244,63,94"}></BiTrashAlt></button>
                    </td>
                </tr>
    )
}