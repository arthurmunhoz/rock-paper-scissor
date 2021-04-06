import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GAME_MODE } from '../constants';
import { ChoiceData } from "../model/model";

export type AppState = {
    mode: string,
    choice: ChoiceData | undefined,
    score: number
};

const initialState: AppState = {
    mode: GAME_MODE.BASIC,
    choice: undefined,
    score: 0,
};

export const gameReducer = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        //SET SELECTED CHOICE
        setSelectedChoice: (state, action) => {
            console.log("Selected choice: ", state.choice);
            state.choice = action.payload;
        },
    },
    extraReducers: {}
});

export const {
    setSelectedChoice
} = gameReducer.actions;

export default gameReducer.reducer;