import AddWorkForm from "./addWorkForm";
import UpdateWorkForm from "./updateWorkForm";

export default function Form(){

    const flag = true;

    return (
        <div className="container mx-auto py-5">
            {flag?<AddWorkForm />:<UpdateWorkForm/>}

        </div>
    )
}