import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const { reducer, actions } = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = actions;
export default reducer;
