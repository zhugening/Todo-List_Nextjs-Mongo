import AddWorkForm from "./addWorkForm";
import UpdateWorkForm from "./updateWorkForm";
import TrackWorkForm from "./trackWorkForm";
import { useSelector } from "react-redux";
import { useReducer } from "react";

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

    // const flag = false;
    // console.log("this is fromId",formId)
    // console.log("this is trackId", trackId)
    
    

    return (
        <div className="container mx-auto py-5">
            {/* {console.log("this is formID in Form.js",formId)} */}
            
            {toggleTrack&&formId?UpdateWorkForm({formId,formData,setFormData}):
            !toggleTrack&&formId?TrackWorkForm({formId, formData, setFormData}):
            AddWorkForm({formData, setFormData})}
        
            
            {/* {formId?TrackWorkForm({formId,formData,setFormData}):AddWorkForm({formData, setFormData})} */}

            {/* {formId
            ? <>{UpdateWorkForm({formId, formData, setFormData})}</>
            : <>
                {TrackWorkForm({formId, formData, setFormData})}
                {AddWorkForm({formData, setFormData})}
               </>
            } */}

        </div>
    )
}