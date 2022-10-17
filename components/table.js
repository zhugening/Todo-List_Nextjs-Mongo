import {BiEdit, BiTrashAlt} from "react-icons/bi"
import data from '../database/data.json'

export default function Table(){
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

function Tr({name,text,date,responsibility,status}){
    return(
        <tr className="bg-gray-50 text-center">
                    <td className="px-16 py-2 flex flex-row items-center">
                        <img src="" alt="" />
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
                        <button className="cursor"><span className="bg-green-500 text-white px-5 py-1 rounded-full">{status}</span></button>
                    </td>
                    <td className="px-16 py-2 flex justify-around gap-5">
                        <button className="cursor"><BiEdit size={25} color={"rgb(34,197,94"}></BiEdit></button>
                        <button className="cursor"><BiTrashAlt size={25} color={"rgb(244,63,94"}></BiTrashAlt></button>
                    </td>
                </tr>
    )
}