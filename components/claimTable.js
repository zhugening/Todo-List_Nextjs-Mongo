import {BiEdit, BiTrashAlt, BiAddToQueue} from "react-icons/bi";
import { getClaims } from '../lib/claim_helper';
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { claim_toggleChangeAction, claim_updateAction, claim_deleteAction } from "../redux/claim_reducer";

export default function Table(){

    const { isLoading, isError, data, error } = useQuery('claims', getClaims) 
    // console.log(data)
    if(isLoading) return <div>Work is Loading...</div>;
    if(isError) return <div>Got Error {error}</div>


    return (
        <table className="table-auto">
            <thead>
                <tr className="bg-gray-600">
                    <th className="border px-4 py-2">
                        <span className="text-gray-200">Claim No.</span>
                    </th>
                    <th className="border px-4 py-2">
                        <span className="text-gray-200">Contract No.</span>
                    </th>
                    <th className="border px-4 py-2">
                        <span className="text-gray-200">EGAT Serial No.</span>
                    </th>
                    <th className="border px-4 py-2">
                        <span className="text-gray-200">Claim Booking No.</span>
                    </th>
                    <th className="border px-4 py-2">
                        <span className="text-gray-200">Device No.</span>
                    </th>
                    <th className="border px-4 py-2">
                        <span className="text-gray-200">Equipment</span>
                    </th>
                    <th className="border px-4 py-2">
                        <span className="text-gray-200">Date</span>
                    </th>
                    <th className="border px-4 py-2">
                        <span className="text-gray-200">Responsible</span> 
                    </th>
                    <th className="border px-4 py-2">
                        <span className="text-gray-200">Status</span>
                    </th>
                    <th className="border px-6 py-2">
                        <span className="text-gray-200">Edit/Update/Delete</span>
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

function Tr({_id, claim_no, contract_no, egat_sn, claim_booking, device_no, equipment, date, responsibility, status}){

    const visible = useSelector((state) => state.app.client.toggleForm)
    // console.log(visible)
    const dispatch = useDispatch()
    const onUpdate = ()=>{
        dispatch(claim_toggleChangeAction(_id))
        if(visible){
            dispatch(claim_updateAction(_id))
        }
    }
    const onDelete = ()=>{
        if(!visible){
            dispatch(claim_deleteAction(_id))
        }
    }
    // console.log(date)
    return(
        <tr className="bg-gray-100 text-center">
                    <td className="border px-4 py-2 border-black">
                        <span className="text-xs">{claim_no}</span>
                    </td>
                    <td className="border px-4 py-2 border-black">
                        <span className="text-xs">{contract_no}</span>
                    </td>
                    <td className="border px-4 py-2 border-black">
                        <span className="text-xs">{egat_sn}</span>
                    </td>
                    <td className="border px-4 py-2 border-black">
                        <span className="text-xs">{claim_booking}</span>
                    </td>
                    <td className="border px-4 py-2 border-black">
                        <span className="text-sm">{device_no}</span>
                    </td>
                    <td className="border px-4 py-2 border-black">
                        <span className="text-sm">{equipment}</span>
                    </td>
                    <td className="border px-4 py-2 border-black">
                        <span className="text-sm">{date}</span>
                    </td>
                    <td className="border px-4 py-2 border-black">
                        <span className="text-sm">{responsibility}</span>
                    </td>
                    <td className="border px-4 py-2 border-black">
                        <button className="cursor"><span className={`${status == "Active" ? 'bg-green-500':'bg-rose-500'} text-white px-5 py-1 rounded-full`}>{status}</span></button>
                    </td>
                    <td className="border px-4 py-2 border-black">
                        <button className="cursor" onClick={onUpdate}><BiEdit size={25} color={"rgb(34,197,94"}></BiEdit></button>
                        <button className="cursor" onClick={onUpdate}><BiAddToQueue size={25} color={"rgb(215,200,0)"}></BiAddToQueue></button>
                        <button className="cursor" onClick={onDelete}><BiTrashAlt size={25} color={"rgb(244,63,94"}></BiTrashAlt></button>
                    </td>
                </tr>
    )
}