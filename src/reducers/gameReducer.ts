import { createSlice } from "@reduxjs/toolkit";
import { ChoiceData } from "../components/board/Board";
import { GAME_MODE } from '../constants';

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
            console.log("Selected choice: ", action.payload);
            state.choice = action.payload;
        },
    },
    extraReducers: {}
});

export const {
    setSelectedChoice
} = gameReducer.actions;

export default gameReducer.reducer;