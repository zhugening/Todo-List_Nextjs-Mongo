import AddClaimForm from "./addClaimForm";
import UpdateClaimForm from "./updateClaimForm";
import { useSelector } from "react-redux";
import { useReducer } from "react";

const formReducer = (state, event)=>{
    return {
        ...state,
        [event.target.name]:event.target.value
        }
    }


export default function Form(){

    const [claim_formData, claim_setFormData] = useReducer(formReducer,{})
    const claimId = useSelector((state)=> state.app.client.claimId)
    // const flag = false;

    return (
        <div className="container mx-auto py-5">
            {claimId?UpdateClaimForm({claimId,claim_formData,claim_setFormData}):AddClaimForm({claim_formData, claim_setFormData})}
        </div>
    )
}