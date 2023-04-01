import {useReducer} from "react"
import { BiBrush } from "react-icons/bi"
import Success from "./success"
import Bug from "./bug"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { getWork, getWorks , updateTrackWork , updateWork} from "../lib/helper"

export default function TrackWorkForm({ track,formId,formData,setFormData }){

    const queryClient = useQueryClient()
    const { isLoading, isError, data, error , isSuccess} = useQuery(['works', formId],()=> getWork(formId))
    // console.log(data)
    const UpdateMutation = useMutation((newData)=> updateWork(formId,newData), {
        onSuccess: async(data)=>{
            // queryClient.setQueryData("works",(old)=>[data])
            queryClient.prefetchQuery('works',getWorks)
        }
    })

    if(isLoading) return <div>Loading.....!</div>
    if(isError) return <div>Error</div>
    

    const { claim_no, contract_no , egat_sn , claim_booking , device_no , equipment , date , responsibility , status ,update , dateUpdate , text , person } = data;
    
    // const [formData,setFormData] = useReducer(formReducer,{})

    // It's work only update
    // const handleSubmit = async (e) =>{
    //     e.preventDefault();
    //     // if(Object.keys(formData).length == 0)return console.log("Don't have Form Data")
    //     // console.log("this is formData",formData["dateUpdate"] , formData['text'], formData['person']) 
    //     let update = {"status": formData['status'],
    //                     "update": formData}
    //     // console.log("this is data",data)
    //     let updated = Object.assign({}, data, update)
    //     // console.log("this is update",updated)
    //     await UpdateMutation.mutate(updated)
    // }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        // if(Object.keys(formData).length == 0)return console.log("Don't have Form Data")
        // console.log("this is formData",formData["dateUpdate"] , formData['text'], formData['person']) 
        
        // It's work
        // let update = {"status": formData['status'],
        //                 "update": formData}
        // console.log("This is formData",formData)

        let update = {"status" : formData['status'],
                 $set: {"update": formData} };
        
        console.log("this is formData", formData)
        
        let updated = Object.assign({}, data, update)
        // console.log("this is update",updated)
        await UpdateMutation.mutate(updated)


    //     let index = state.map(review => review.id).indexOf(action.payload.id);
    // return [
    //     ...state.slice(0, index),
    //     Object.assign({}, state[index], {
    //         replays: [...state[index].replays, action.payload.replay]
    //     }),
    //     ...state.slice(index + 1)
    // ];
    }

    // if(Object.keys(formData).length > 0)return<Bug message={"Error"}></Bug>

    return  (
        <form className="grid lg:grid-cols-4 w-4/6 gap-4" onSubmit={handleSubmit}>
            <div className="input-type">
                <div className="border w-full px-5 py-3 focus:outline-none"  >{claim_no}</div>
            </div>

            <div className="input-type">
                <div className="border w-full px-5 py-3 focus:outline-none" >{contract_no}</div>
            </div>
            <div className="input-type">
                <div className="border w-full px-5 py-3 focus:outline-none">{egat_sn}</div>
            </div>
            <div className="input-type">
                <div className="border w-full px-5 py-3 focus:outline-none" >{claim_booking}</div>
            </div>
            <div className="div-type">
                <div className="border w-full px-5 py-3 focus:outline-none" >{device_no}</div>
            </div>
            <div className="input-type">
                <div className="border w-full px-5 py-3 focus:outline-none">{equipment}</div>
            </div>
            
            <div className="input-type">
                <div className="border px-5 py-3 focus:outline-none rounded-md">{date}</div>
            </div>

            <div className="input-type">
                <div className="border w-full px-5 py-3 focus:outline-none">{responsibility}</div>
            </div>

            <div className="input-type">
                <input type='date' onChange={setFormData} defaultValue={update[dateUpdate]} name="dateUpdate" className="border border-gray-400 border-4 px-5 py-3 focus:outline-none rounded-md bg-gray-200 text-gray-700" placeholder="Date Update"/>
            </div>
            <div className="input-type">
                <input type='text' onChange={setFormData} defaultValue={update[text]} name="text" className="border border-gray-400  border-4 px-5 py-3 focus:outline-none rounded-md bg-gray-200 text-gray-800" placeholder="text"/>
            </div>
            <div className="input-type">
                <input type='text' onChange={setFormData} defaultValue={update[person]} name="person" className="border border-gray-400 border-4 px-5 py-3 focus:outline-none rounded-md bg-gray-200 text-gray-700" placeholder="person"/>
            </div>



            <div className="flex gap-10 items-center">
                <div className="form-check">
                    <input type="radio" defaultChecked={status=="InActive"} onChange={setFormData} value="InActive" id="radioDefault1" name="status" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-red-500 checked:border-gray-500 focus:outlin-none transition duration-200 mt-1 align-top bg-no-repeat bg-contain float-left mr-2 cursor-pointer"/>
                    <label htmlFor="radioDefault1" className="inline-block tet-gray-800">
                        InActive
                    </label>
                </div>

                <div className="form-check">
                    <input type="radio" defaultChecked={status=="InProgress"} onChange={setFormData} value="InProgress" id="radioDefault2" name="status" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-yellow-500 checked:border-gray-500 focus:outlin-none transition duration-200 mt-1 align-top bg-no-repeat bg-contain float-left mr-2 cursor-pointer"/>
                    <label htmlFor="radioDefault2" className="inline-block tet-gray-800">
                        InProgress
                    </label>
                </div>

                <div className="form-check">
                    <input type="radio" defaultChecked={status=="InComplete"} onChange={setFormData} value="InComplete" id="radioDefault3" name="status" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-gray-500 focus:outlin-none transition duration-200 mt-1 align-top bg-no-repeat bg-contain float-left mr-2 cursor-pointer"/>
                    <label htmlFor="radioDefault3" className="inline-block tet-gray-800">
                        InComplete
                    </label>
                </div>

            </div>
            <button className="flex justify-center text-md bg-orange-400 text-white px-5 py-3 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
            Update Tracking<span className="px-1"><BiBrush size={24}></BiBrush></span>
            </button>
            
        </form>
    )
}