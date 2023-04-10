import {BiEdit, BiTrashAlt, BiAddToQueue , BiBody} from "react-icons/bi";
// import data from '../database/data.json'
import { getWorks } from '../lib/helper';
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction, updateAction, deleteAction , trackAction } from "../redux/reducer";
import show_Table from '../components/show_tracking'



export default function Table(){    
    // getWork().then(res=> console.log(res)) # return all works
    // useQuery in Redux
    const { isLoading, isError, data, error } = useQuery('works', getWorks) 
    // console.log(data)
    if(isLoading) return <div>Work is Loading...</div>;
    if(isError) return <div>Got Error {error}</div>

    return (
        <table className="table-auto">
            <thead>
                <tr className="bg-gray-600">
                    <th className="border px-4 py-2">
                        <span className="text-gray-200 ">Claim No.</span>
                    </th>
                    <th className="border px-4 py-2">
                        <span className="text-gray-200">Contract No.</span>
                    </th>
                    <th className="border px-4 py-2 text-xs">
                        <span className="text-gray-200">EGAT Serial No.</span>
                    </th>
                    <th className="border px-4 py-2 text-xs">
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
                    <th className="border px-6 py-2 text-xs">
                        <span className="text-gray-200">Edit/Update/Track/Delete</span>
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
    // call by id
    const visible = useSelector((state) => state.app.client.toggleForm)
    const dispatch = useDispatch()

    const onUpdate = ()=>{
        // try to cancel toggle
        // console.log(_id)
        dispatch(toggleChangeAction(_id))
        if(visible){
            dispatch(updateAction(_id))
        }
    }

    const onTrack = ()=>{
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

    // Solution 1
    // const myFunction= () => {
    //     dispatch(toggleChangeAction(_id))
    //     // console.log(_id)
    //     var txt;
    //     if (confirm("Press a button!")) {
    //       txt = "You pressed OK! to Tracking Claim";
    //     //   {<show_Table         
    //     //   formId = {_id}
    //     //   />}
    //       window.location.href = "/trackTable";
    //     } else {
    //       txt = "You pressed Cancel!";
    //     }
    //   }

    // solution 1
      const changePage=() =>{
        // console.log("this is _Id from table.js",_id)
        var formId = _id;
        window.location.href = `/trackPage?formId=${formId}`
      }


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
                        <button className="cursor"><span className={`${
                            status == "InActive" ? 'bg-red-500':
                            status == "InProgress" ? 'bg-yellow-500':
                            status == "InComplete" ? 'bg-green-500' : ""
                            } text-white px-5 py-1 rounded-full`}>{status}</span></button>
                    </td>
                    <td className="border px-4 py-2 border-black space-x-1">
                        <button className="cursor" onClick={onUpdate}><BiEdit size={25} color={"rgb(34,197,94"}></BiEdit></button>
                        <button className="cursor" onClick={onTrack}><BiAddToQueue size={25} color={"rgb(215,200,0)"}></BiAddToQueue></button>
                        <button className="cursor" onClick={changePage}><BiBody size={25} color={"rgb(218,112,214)"}></BiBody></button>
                        <button className="cursor" onClick={onDelete}><BiTrashAlt size={25} color={"rgb(244,63,94"}></BiTrashAlt></button>
                    </td>
                </tr>
                
    )
}

// sfsad