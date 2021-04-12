import Rock from './res/images/icon-rock.svg';
import Scissors from './res/images/icon-scissors.svg';
import Paper from './res/images/icon-paper.svg';
import Lizard from './res/images/icon-lizard.svg';
import Spock from './res/images/icon-spock.svg';

export const GAME_MODE = {
    BASIC: 'basic',
    BONUS: 'bonus'
}

export const CHOICE_DATA : { [key: string]: any } = {
    ROCK: { id: 1, title: 'rock', imageSrc: Rock, color: "#5574ff"},
    PAPER: { id: 2, title: 'paper', imageSrc: Paper, color: "#ec2c2c" },
    SCISSORS: { id: 3, title: 'scissors', imageSrc: Scissors, color: "hsl(39,89%,49%)" },
    // LIZARD: { id: 4, title: 'lizard', imageSrc: Lizard, color: "#af24ff" },
    // SPOCK: { id: 5, title: 'spock', imageSrc: Spock, color: "#07d400" },
};

export const GAME_RESULTS = {
    WIN: 'YOU WIN',
    LOSE: 'YOU LOSE',
    DRAW: 'DRAW',
};

export const BOARD_WIDTH = 480;
export const BOARD_HEIGHT = 430;

export const MB_BREAKPOINT = 375;
export const SM_BREAKPOINT = 610;
export const LG_BREAKPOINT = 1024;

export const CHOICE_SIZE = 160;

export const MB_MARGIN = 10;
export const SM_MARGIN = 60;
export const LG_MARGIN = 60;

export const MB_CHOICE_SCALE = 0.575;
export const SM_CHOICE_SCALE = 0.750;
export const LG_CHOICE_SCALE = 1;

export const BONUS_LG_CHOICE_SCALE = 0.5;
export const BONUS_SM_CHOICE_SCALE = 0.754;