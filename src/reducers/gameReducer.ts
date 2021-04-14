import { createSlice } from "@reduxjs/toolkit";
import { ChoiceData } from "../components/board/Board";
import { GAME_MODE } from '../constants';

export type AppState = {
    mode: string,
    playerChoice: ChoiceData | undefined,
    score: number
};

const initialState: AppState = {
    mode: GAME_MODE.BASIC,
    playerChoice: undefined,
    score: 0,
};

export const gameReducer = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        //SET SELECTED CHOICE
        setSelectedChoice: (state, action) => {
            console.log("Selected choice: ", action.payload);
            state.playerChoice = action.payload;
        },
        resetChoice: (state) => {
            console.log("Reseting player choice...");
            state.playerChoice = undefined;
        }
    },
    extraReducers: {}
});

export const {
    setSelectedChoice,
    resetChoice
} = gameReducer.actions;

export default gameReducer.reducer;