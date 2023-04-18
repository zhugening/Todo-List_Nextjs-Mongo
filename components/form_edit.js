import TrackWorkEditForm from "./trackWorkEditForm";
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

      // function check 'undefined'
function check_window(){
    let queryString = ''
    let url = ''
    let id = ''
    if (typeof window !== 'undefined') {
      // console.log(window.location.href)
      queryString = window.location.href
      url = new URLSearchParams(queryString)
      id = url.toString().slice(-24);
      return id
    } else {
      return id = "null"
    }
  }
  
  const formId = check_window()
//   console.log("this is formId form form_edit",formId)
    


export default function Form(){

    const [formData, setFormData] = useReducer(formReducer,{})
    const trackId = useSelector((state)=> state.app.client.formId)
    const toggleTrack = useSelector((state)=> state.app.client.toggleTrack)

    console.log(setFormData)
   
    return (
        <div className="container mx-auto py-5">
            {/* {console.log("this is trackId in Form.js",trackId)} */}

            {/* Solution 4 */}
            {trackId?TrackWorkEditForm({formId,formData,setFormData}):""}

        </div>
    )
}