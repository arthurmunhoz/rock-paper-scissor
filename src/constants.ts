import Rock from './res/images/icon-rock.svg';
import Scissors from './res/images/icon-scissors.svg';
import Paper from './res/images/icon-paper.svg';

export const GAME_MODE = {
    BASIC: 'basic',
    BONUS: 'bonus'
}

export const LOCAL_STORAGE_SCORE = "_rps_score";

export const CHOICE_DATA : { [key: string]: any } = {
    ROCK: { id: 1, title: 'rock', imageSrc: Rock, color: "#5574ff"},
    PAPER: { id: 2, title: 'paper', imageSrc: Paper, color: "#ec2c2c" },
    SCISSORS: { id: 3, title: 'scissors', imageSrc: Scissors, color: "hsl(39,89%,49%)" },
};

export const GAME_RESULTS = {
    WIN: 'YOU WIN',
    LOSE: 'YOU LOSE',
    DRAW: 'DRAW',
};

export const BOARD_WIDTH = 480;
export const BOARD_HEIGHT = 430;

export const SM_BREAKPOINT = 610;

export const CHOICE_SIZE = 160;

export const MB_CHOICE_SCALE = 0.575;
export const SM_CHOICE_SCALE = 0.750;
export const LG_CHOICE_SCALE = 1;