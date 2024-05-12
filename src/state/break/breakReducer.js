import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 5,
};

const breakSlice = createSlice({
    name: "break",
    initialState,
    reducers: {
        incrementBreak: (state) => {
            if(state.value === 60) return
            state.value++;
        },
        decrementBreak: (state) => {
            if(state.value <= 0) return
            state.value--;
        },
        resetBreak: (state) => {
            state.value = initialState.value
        }
    },
});

export const { incrementBreak,decrementBreak,resetBreak } = breakSlice.actions;
export default breakSlice.reducer;
