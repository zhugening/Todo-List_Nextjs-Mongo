import AddWorkForm from "./addWorkForm";
import UpdateWorkForm from "./updateWorkForm";
import TrackWorkForm from "./trackWorkForm";
import { useSelector } from "react-redux";
import { useReducer } from "react";
import Show_track from "./show_tracking"

const formReducer = (state, event)=>{
    // console.log(state)
    // console.log(event)
    return {
        ...state,
        [event.target.name]:event.target.value
        }
    }


export default function Form(){

    const [formData, setFormData] = useReducer(formReducer,{})
    const formId = useSelector((state)=> state.app.client.formId)
    const toggleTrack = useSelector((state)=> state.app.client.toggleTrack)
   
    return (
        <div className="container mx-auto py-5">
            {/* {console.log("this is formID in Form.js",formId)} */}
            
            {/* Solution 1 */}
            {toggleTrack&&formId?UpdateWorkForm({formId,formData,setFormData}):
            !toggleTrack&&formId?TrackWorkForm({formId, formData, setFormData}):
            AddWorkForm({formData, setFormData})}

            {/* {Show_track({formId})} */}
        
            {/* Solution 2 */}
            {/* {formId?UpdateWorkForm({formId,formData,setFormData}):AddWorkForm({formData, setFormData})} */}
            

            {/* Solution 3 */}
            {/* {formId
            ? <>{UpdateWorkForm({formId, formData, setFormData})}</>
            : <>
                {TrackWorkForm({formId, formData, setFormData})}
                {AddWorkForm({formData, setFormData})}
               </>
            } */}

            {/* Solution 4 */}
            {/* {formId?TrackWorkForm({formId,formData,setFormData}):AddWorkForm({formData, setFormData})} */}

        </div>
    )
}