import { createListenerMiddleware } from "@reduxjs/toolkit";
import { toggleChangeAction, updateAction , trackAction } from "./reducer";

const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
    actionCreator:toggleChangeAction,
    effect: async(action, listenApi) =>{
        listenApi.dispatch(updateAction(action.payload)),
        listenApi.dispatch(trackAction(action.payload))
    }
})



export default listenerMiddleware