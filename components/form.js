import AddWorkForm from "./addWorkForm";
import UpdateWorkForm from "./updateWorkForm";
import { useSelector } from "react-redux";
import { useReducer } from "react";

const formReducer = (state, event)=>{
    return {
        ...state,
        [event.target.name]:event.target.value
        }
    }


export default function Form(){

    const [formData, setFormData] = useReducer(formReducer,{})
    const formId = useSelector((state)=> state.app.client.formId)
    // const flag = false;

    return (
        <div className="container mx-auto py-5">
            {formId?UpdateWorkForm({formId,formData,setFormData}):AddWorkForm({formData, setFormData})}
        </div>
    )
}