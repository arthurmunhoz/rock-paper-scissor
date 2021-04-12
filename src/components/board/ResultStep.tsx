/* eslint-disable react-hooks/exhaustive-deps */
import gsap from 'gsap';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from "styled-components";
import {
    LG_BREAKPOINT,
    LG_CHOICE_SCALE,
    MB_BREAKPOINT,
    MB_CHOICE_SCALE,
    SM_BREAKPOINT,
    SM_CHOICE_SCALE,
    CHOICE_SIZE,
    CHOICE_DATA,
    LG_MARGIN,
    MB_MARGIN,
    SM_MARGIN,
    BOARD_WIDTH,
    BOARD_HEIGHT,
    GAME_RESULTS
} from '../../constants';
import Chip from '../chip/Chip';
import { ChoiceData } from './Board';

interface ResultStepProps {
    coords?: DOMRect,
    choice?: ChoiceData
};

const ResultStep = (props: ResultStepProps) => {

    console.log("Coords: ", props.coords);
    console.log("User choice: ", props.choice);

    const boardRef = useRef<HTMLDivElement>(null);
    const gameChoiceRef = useRef<HTMLDivElement>(null);
    const playerChoiceRef = useRef<HTMLDivElement>(null);

    const PLAYER_CHOICE_ID = "_playerChoice";
    const GAME_CHOICE_ID = "_gameChoice";

    const [gameChoice, setGameChoice] = useState<ChoiceData>();
    const [resultText, setResultText] = useState<String>("");
    
    const isSmScreen = document.documentElement.clientWidth < LG_BREAKPOINT;

    const defaultScale = 1.15;

    const getScaleAndSize = () => {
        if (document.documentElement.clientWidth <= MB_BREAKPOINT) {
            return { scale: MB_CHOICE_SCALE, size: CHOICE_SIZE * MB_CHOICE_SCALE, margin: MB_MARGIN };
        } else if (document.documentElement.clientWidth <= SM_BREAKPOINT) {
            return { scale: SM_CHOICE_SCALE, size: CHOICE_SIZE * SM_CHOICE_SCALE, margin: SM_MARGIN };
        } else {
            return { scale: LG_CHOICE_SCALE, size: CHOICE_SIZE * LG_CHOICE_SCALE, margin: LG_MARGIN };
        }
    }

    // const offset = calcOffset(CHOICE_SIZE * (isSmScreen ? SM_CHOICE_SCALE : LG_CHOICE_SCALE), scale);

    const playerPos = {
        // x: 0,
        x: (BOARD_WIDTH / 2 - 15) - getScaleAndSize().size * defaultScale,
        // y: 0
        y: ((document.documentElement.clientHeight - 190) / 2) - (getScaleAndSize().size / 2)
    };

    const gamePos = {
        x: BOARD_WIDTH / 2 + 40,
        y: ((document.documentElement.clientHeight - 190) / 2) - (getScaleAndSize().size / 2)
    };

    useLayoutEffect(() => {
        animateShowChoices();
        makeHouseChoice();
    }, []);

    useEffect(() => {
        determineResult();
    }, [gameChoice]);

    const StyledResultStep = styled.div`
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;

        @media screen and (max-width: ${SM_BREAKPOINT}px) {
            
        }

        #shadowPlaceholder {
            opacity: 0;
            
            height: ${() => getScaleAndSize().size}px;
            width: ${() => getScaleAndSize().size}px;

            scale: ${() => getScaleAndSize().scale};
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.203);
    
            transform: translateX(36px);
            
            z-index: 0;
        }
        
        #youPicked {
            transform: translateX(-36px);
        }

        #housePicked {
            transform: translateX(36px);
        }

        #youPicked,
        #housePicked {
            width: ${() => getScaleAndSize().size}px;
            
            opacity: 0;

            font-size: ${() => 1.35 * getScaleAndSize().scale}rem;
            text-transform: uppercase;
            white-space: nowrap;
            text-align: center;

            margin-bottom: 18px;
        }
        
        #labelsFrame {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
        }
        
        #textResultFrame {
            opacity: 1;

            height: fit-content;
            width: 100%;
            position: absolute;

            display: flex;   
            flex-direction: column;

            z-index: 4;

            align-items: center;
            
            button {
                height: 40px;
                width: 170px;
                
                border-radius: 8px;
                margin-top: 12px;
                
                font-size: 1rem;
                line-height: 10px;
                letter-spacing: 1px;
                text-transform: uppercase;
                font-family: var(--font-family) !important;
                color: #0b0b5a;

                /* border: none !important; */
                border-width: 2px !important;
                border-color: rgba(211, 211, 211, 0.247);
            }
            
            button:focus {
                outline: none !important;
            }

            button:hover {
                color: #db0000;
                cursor: pointer;
            }
        }

        #choicesFrame {
            width: 100%;

            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-bottom: 18px;
        }

        #Chip${PLAYER_CHOICE_ID} {
            opacity: 1;
            transform: translateX(-36px);
            z-index: 3;
        }
        
        #Chip${GAME_CHOICE_ID} {
            opacity: 1;
            z-index: 3;
        }
    `;

    const calcOffset = (squareDimension: number, scale: number) => {
        return squareDimension * ((1 - scale) / 2);
    };

    const makeHouseChoice = () => {
        const rand = Math.ceil(Math.random() * 100 % 3);
        const choice = Object.keys(CHOICE_DATA).find((item) => CHOICE_DATA[item].id === rand + 1);

        setGameChoice(CHOICE_DATA[choice!]);
    }

    const animateShowChoices = () => {

        const pos = playerChoiceRef.current?.getBoundingClientRect();
        // -----------------------------------------
        // Animate player's choice
        if (props.choice && pos) {

            gsap.fromTo(
                `#Chip${PLAYER_CHOICE_ID}`,
                {
                    x: props.coords ? props.coords?.x - (pos?.x ?? 0) : 0,
                    y: props.coords ? props.coords?.y - (pos?.y ?? 0) : 0,
                    autoAlpha: 1,
                    scale: 1,
                },
                {
                    x: 0,
                    y: 0,
                    scale: 1.15,
                    ease: 'power1.in',
                    duration: 0.5
                }).then(() => {

                    const tl = gsap.timeline();

                    // -----------------------------------------
                    //Animate game choice
                    tl.fromTo(
                        `.choice-text`,
                        {
                            autoAlpha: 0,
                        },
                        {
                            autoAlpha: 1,
                            ease: 'power1.in',
                            duration: 0.5
                        }
                    );

                    // -----------------------------------------
                    // Animate shadow placeholder for game choice
                    tl.fromTo(
                        `#shadowPlaceholder`,
                        {
                            autoAlpha: 0.3,
                            scale: 1.15,
                        },
                        {
                            scale: 1.15,
                            autoAlpha: 0.9,
                            ease: "bounce.inOutinOut",
                            duration: 0.6,
                        }
                    );

                    // -----------------------------------------
                    // Animate game choice
                    tl.fromTo(
                        `#Chip${GAME_CHOICE_ID}`,
                        {
                            autoAlpha: 0,
                            scale: 0,
                        },
                        {
                            autoAlpha: 1,
                            scale: 1.15,
                            duration: 0.5,
                            delay: 0.8
                        });


                });
        }
    }

    const determineResult = () => {

        // id: 1 -> ROCK
        // id: 2 -> PAPER
        // id: 3 -> SCISSOR

        if (props.choice && gameChoice) {

            if (props.choice?.id === gameChoice.id) {
                setResultText(GAME_RESULTS.DRAW);
            } else {
                // PLAYER CHOICE: ROCK
                if (props.choice.id === 1) {
                    (gameChoice.id === 2) ?
                        setResultText(GAME_RESULTS.LOSE) :
                        setResultText(GAME_RESULTS.WIN);
                }

                // PLAYER CHOICE: PAPER
                if (props.choice.id === 2) {
                    (gameChoice.id === 3) ?
                        setResultText(GAME_RESULTS.LOSE) :
                        setResultText(GAME_RESULTS.WIN);
                }

                // PLAYER CHOICE: SCISSOR
                if (props.choice.id === 3) {
                    (gameChoice.id === 1) ?
                        setResultText(GAME_RESULTS.LOSE) :
                        setResultText(GAME_RESULTS.WIN);
                }
            }
        }
    }

    return (<StyledResultStep
        id="resultFrame"
        ref={boardRef}>
        {
            <>
                <div id="labelsFrame">
                    <span id="youPicked" className="choice-text">You picked</span>
                    <span id="housePicked" className="choice-text">The house picked</span>
                </div>

                <div id="choicesFrame">
                    <Chip ref={playerChoiceRef} choice={{ ...props.choice!, id: PLAYER_CHOICE_ID }} />
                    <div id="shadowPlaceholder">
                        <Chip ref={gameChoiceRef} choice={{ ...gameChoice!, id: GAME_CHOICE_ID }} />
                    </div>
                </div>

                <div id="textResultFrame">
                    <span id="result-text">{resultText}</span>
                    <button id="result-text" className="choice-text">Play again</button>
                </div>
            </>
        }
    </StyledResultStep>);
}

export default ResultStep;