import { configureStore } from "@reduxjs/toolkit";
import breakReducer from "./break/breakReducer";
import sessionReducer from "./session/sessionReducer";

export const store = configureStore({
    reducer:{
        break: breakReducer,
        session: sessionReducer
    }
});
