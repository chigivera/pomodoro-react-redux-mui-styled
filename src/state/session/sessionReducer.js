import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 25,
};

const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        incrementSession: (state) => {
            if(state.value === 60) return
            state.value++;
        },
        decrementSession: (state) => {
            if(state.value <= 0) return
            state.value--;
        },
        resetSession: (state) => {
            state.value = initialState.value
        }
    },
});

export const { incrementSession,decrementSession,resetSession } = sessionSlice.actions;
export default sessionSlice.reducer;
