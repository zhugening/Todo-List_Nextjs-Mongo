import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    client :{ toggleForm: false, formId:undefined, deleteId: null, trackId: undefined }
}

export const ReducerSlice = createSlice({
    name:'crudapp',
    initialState,
    reducers : {
        toggleChangeAction : (state) => {
            state.client.toggleForm = !state.client.toggleForm
        },
        updateAction : (state, action)=>{
            state.client.formId = action.payload
        },
        trackAction : (state, action)=>{
            state.client.trackId = action.payload
        },
        deleteAction :(state, action)=>{
            state.client.deleteId = action.payload
        }
    }
})

export const { toggleChangeAction , updateAction, deleteAction , trackAction } = ReducerSlice.actions

export default ReducerSlice.reducer;