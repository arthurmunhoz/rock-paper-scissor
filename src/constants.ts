import Rock from './res/images/icon-rock.svg';
import Scissors from './res/images/icon-scissors.svg';
import Paper from './res/images/icon-paper.svg';
import Lizard from './res/images/icon-lizard.svg';
import Spock from './res/images/icon-spock.svg';

export const GAME_MODE = {
    BASIC: 'basic',
    BONUS: 'bonus'
}

export const CHOICE_DATA = {
    ROCK: { id: 1, title: 'rock', imageSrc: Rock, color: "#5574ff"},
    PAPER: { id: 2, title: 'paper', imageSrc: Paper, color: "#ec2c2c" },
    SCISSORS: { id: 3, title: 'scissors', imageSrc: Scissors, color: "hsl(39,89%,49%)" },
    LIZARD: { id: 4, title: 'lizard', imageSrc: Lizard, color: "#af24ff" },
    SPOCK: { id: 5, title: 'spock', imageSrc: Spock, color: "#07d400" },
};

export const GAME_RESULTS = {
    WIN: 'win',
    LOSE: 'lose',
    DRAW: 'draw',
};

export const LG_BREAKPOINT = 1024;
export const LG_CHOICE_SIZE = 300;
export const LG_CHOICE_SCALE = 0.669;
export const SM_CHOICE_SIZE = 130;
export const BONUS_LG_CHOICE_SCALE = 0.5;
export const BONUS_SM_CHOICE_SCALE = 0.754;