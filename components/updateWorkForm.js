import {useReducer} from "react"
import { BiBrush } from "react-icons/bi"
import Success from "./success"
import Bug from "./bug"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { getWork, updateWork, getWorks } from "../lib/helper"


// const formReducer = (state, event)=>{
//     return {
//         ...state,
//         [event.target.name]:event.target.value
//         }
//     }

export default function UpdateWorkForm({ formId,formData,setFormData }){

    const queryClient = useQueryClient()
    const { isLoading, isError, data, error } = useQuery(['works', formId],()=> getWork(formId))
    // console.log(data)
    const UpdateMutation = useMutation((newData)=> updateWork(formId,newData), {
        onSuccess: async(data)=>{
            // queryClient.setQueryData("works",(old)=>[data])
            queryClient.prefetchQuery('works',getWorks)
        }
    })

    if(isLoading) return <div>Loading.....!</div>
    if(isError) return <div>Error</div>

    const { claim_no, contract_no , egat_sn , claim_booking , device_no , equipment , date , responsibility , status } = data;
    
    // const [formData,setFormData] = useReducer(formReducer,{})

    const handleSubmit = async (e) =>{
        e.preventDefault();
        // if(Object.keys(formData).length == 0)return console.log("Don't have Form Data")
        // console.log(formData)
        
        let updated = Object.assign({}, data, formData)
        // console.log(updated)
        await UpdateMutation.mutate(updated)
    }

    // if(Object.keys(formData).length > 0)return<Bug message={"Error"}></Bug>

    return  (
        <form className="grid lg:grid-cols-4 w-4/6 gap-4" onSubmit={handleSubmit}>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={claim_no} name="claim_no" className="border w-full px-5 py-3 focus:outline-none" placeholder="Claim No." />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={contract_no} name="contract_no" className="border w-full px-5 py-3 focus:outline-none" placeholder="Contract No." />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={egat_sn} name="egat_sn" className="border w-full px-5 py-3 focus:outline-none" placeholder="EGAT Serial No." />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={claim_booking} name="claim_booking" className="border w-full px-5 py-3 focus:outline-none" placeholder="Claim Booking No." />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={device_no} name="device_no" className="border w-full px-5 py-3 focus:outline-none" placeholder="Device No." />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={equipment} name="equipment" className="border w-full px-5 py-3 focus:outline-none" placeholder="ระบุตำแหน่งที่ Claim" />
            </div>
            {/* <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={status} name="status" className="border w-full px-5 py-3 focus:outline-none" placeholder="Status" />
            </div> */}
            <div className="input-type">
                <input type='date' onChange={setFormData} defaultValue={date} name="date" className="border px-5 py-3 focus:outline-none rounded-md" placeholder="Date Update"/>
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={responsibility} name="responsibility" className="border w-full px-5 py-3 focus:outline-none" placeholder="Responsibility" />
            </div>


            <div className="flex gap-10 items-center">
                <div className="form-check">
                    <input type="radio" defaultChecked={status=="Active"} onChange={setFormData} value="Active" id="radioDefault1" name="status" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-gray-500 focus:outlin-none transition duration-200 mt-1 align-top bg-no-repeat bg-contain float-left mr-2 cursor-pointer"/>
                    <label htmlFor="radioDefault1" className="inline-block tet-gray-800">
                        Active
                    </label>
                </div>

                <div className="form-check">
                    <input type="radio" defaultChecked={status!=="Active"} onChange={setFormData} value="Inactive" id="radioDefault2" name="status" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-gray-500 focus:outlin-none transition duration-200 mt-1 align-top bg-no-repeat bg-contain float-left mr-2 cursor-pointer"/>
                    <label htmlFor="radioDefault2" className="inline-block tet-gray-800">
                        Inactive
                    </label>
                </div>
            </div>

            <button className="flex justify-center text-md w-3/6 bg-yellow-400 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
            Update<span className="px-1"><BiBrush size={24}></BiBrush></span>
            </button>
        </form>
    )
}