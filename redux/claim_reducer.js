import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    client :{ toggleForm: false, claimId:undefined, deleteId: null}
}

export const ReducerSlice = createSlice({
    name:'crudapp',
    initialState,
    reducers : {
        claim_toggleChangeAction : (state) => {
            state.client.toggleForm = !state.client.toggleForm
        },
        claim_updateAction : (state, action)=>{
            state.client.formId = action.payload
        },
        claim_deleteAction :(state, action)=>{
            state.client.deleteId = action.payload
        }
    }
})

export const { claim_toggleChangeAction , claim_updateAction, claim_deleteAction } = ReducerSlice.actions

export default ReducerSlice.reducer;