import {useReducer} from "react"
import { BiPlus } from "react-icons/bi"
import Success from "./success"
import Bug from "./bug"
import { useQueryClient, useMutation } from "react-query"
import { addWork, getWorks } from "../lib/helper"


// const formReducer = (state, event)=>{
//     return {
//         ...state,
//         [event.target.name]:event.target.value
//         }
//     }

export default function AddWorkForm({formData, setFormData}){

    const queryClient = useQueryClient()

    // const [formData, setFormData] = useReducer(formReducer,{})
    
    // we use mutation for send post function
    const addMutation = useMutation(addWork,{
        onSuccess:()=>{
            queryClient.prefetchQuery('works',getWorks)
            console.log("Data Inserted")
        }
    })

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(Object.keys(formData).length == 0)return console.log("Don't have Form Data");
        // console.log(formData)
        let { claim_no, contract_no, egat_sn, claim_booking, device_no, equipment, date, responsibility, status } = formData;

        const model = {
            claim_no, contract_no, egat_sn, claim_booking, device_no, equipment,date, responsibility, status:status ??"Active"
        }

        addMutation.mutate(model)

    }

    // if(Object.keys(formData).length > 0)return<Bug message={"Error"}></Bug>
    if(addMutation.isLoading) return <div>Loading...!</div>
    if(addMutation.isError) return <Bug message={addMutation.error.message}></Bug>
    if(addMutation.isSuccess) return<Success message={"Added Successfully"}></Success>

    return  (
        <form className="grid lg:grid-cols-4 w-4/6 gap-4" onSubmit={handleSubmit}>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="claim_no" className="border w-full px-5 py-3 focus:outline-none" placeholder="Claim Number" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="contract_no" className="border w-full px-5 py-3 focus:outline-none" placeholder="Contract Number" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="egat_sn" className="border w-full px-5 py-3 focus:outline-none" placeholder="EGAT Serial Number" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="claim_booking" className="border w-full px-5 py-3 focus:outline-none" placeholder="Claim Booking No." />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="device_no" className="border w-full px-5 py-3 focus:outline-none" placeholder="Device Number" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="eqiupment" className="border w-full px-5 py-3 focus:outline-none" placeholder="ระบุตำแหน่งที่ Claim" />
            </div>
            {/* <div className="input-type">
                <input type="text" onChange={setFormData} name="status" className="border w-full px-5 py-3 focus:outline-none" placeholder="Satus" />
            </div> */}
            <div className="input-type">
                <input type='date' onChange={setFormData} name="date" className="border px-5 py-3 focus:outline-none rounded-md" placeholder="Date Update"/>
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="responsibility" className="border w-full px-5 py-3 focus:outline-none" placeholder="ผู้รับผิดชอบ" />
            </div>


            <div className="flex gap-10 items-center">
                <div className="form-check">
                    <input type="radio" onChange={setFormData} value="Active" id="radioDefault1" name="status" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-gray-500 focus:outlin-none transition duration-200 mt-1 align-top bg-no-repeat bg-contain float-left mr-2 cursor-pointer"/>
                    <label htmlFor="radioDefault1" className="inline-block tet-gray-800">
                        Action
                    </label>
                </div>

                <div className="form-check">
                    <input type="radio" onChange={setFormData} value="Inactive" id="radioDefault2" name="status" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-gray-500 focus:outlin-none transition duration-200 mt-1 align-top bg-no-repeat bg-contain float-left mr-2 cursor-pointer"/>
                    <label htmlFor="radioDefault2" className="inline-block tet-gray-800">
                        Inactive
                    </label>
                </div>
            </div>

            <button className="flex justify-center text-md w-3/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
            Add<span className="px-1"><BiPlus size={24}></BiPlus></span>
            </button>
        </form>
    )
}











{/* <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="name" className="border w-full px-5 py-3 focus:outline-none" placeholder="Device Number" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="text" className="border w-full px-5 py-3 focus:outline-none" placeholder="เหตุความเสียหายของอุปกรณ์" />
            </div>
            <div className="input-type">
                <input type='date' onChange={setFormData} name="date" className="border px-5 py-3 focus:outline-none rounded-md" placeholder="Date Update"/>
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="responsibility" className="border w-full px-5 py-3 focus:outline-none" placeholder="ผู้รับผิดชอบ" />
            </div>


            <div className="flex gap-10 items-center">
                <div className="form-check">
                    <input type="radio" onChange={setFormData} value="Active" id="radioDefault1" name="status" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-gray-500 focus:outlin-none transition duration-200 mt-1 align-top bg-no-repeat bg-contain float-left mr-2 cursor-pointer"/>
                    <label htmlFor="radioDefault1" className="inline-block tet-gray-800">
                        Active
                    </label>
                </div>

                <div className="form-check">
                    <input type="radio" onChange={setFormData} value="Inactive" id="radioDefault2" name="status" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-gray-500 focus:outlin-none transition duration-200 mt-1 align-top bg-no-repeat bg-contain float-left mr-2 cursor-pointer"/>
                    <label htmlFor="radioDefault2" className="inline-block tet-gray-800">
                        Inactive
                    </label>
                </div>
            </div>

            <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
            Add<span className="px-1"><BiPlus size={24}></BiPlus></span>
            </button>
        </form> */}