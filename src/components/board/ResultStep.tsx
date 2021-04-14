/* eslint-disable react-hooks/exhaustive-deps */
import gsap from 'gsap';
import React, { useLayoutEffect, useRef } from 'react';
import styled from "styled-components";
import {
    LG_CHOICE_SCALE,
    MB_BREAKPOINT,
    MB_CHOICE_SCALE,
    SM_BREAKPOINT,
    SM_CHOICE_SCALE,
    CHOICE_SIZE,
    LG_MARGIN,
    MB_MARGIN,
    SM_MARGIN,
} from '../../constants';
import Chip from '../chip/Chip';
import { ChoiceData } from './Board';

interface ResultStepProps {
    coords?: DOMRect,
    playerChoice?: ChoiceData,
    gameChoice?: ChoiceData,
    resultText: string,
    onResetGame: Function
};

const ResultStep = (props: ResultStepProps) => {

    console.log("Coords: ", props.coords);
    console.log("User choice: ", props.playerChoice);
    console.log("Game choice: ", props.gameChoice);
    console.log("Result text: ", props.resultText);

    const boardRef = useRef<HTMLDivElement>(null);
    const gameChoiceRef = useRef<HTMLDivElement>(null);
    const playerChoiceRef = useRef<HTMLDivElement>(null);

    const PLAYER_CHOICE_ID = "_playerChoice";
    const GAME_CHOICE_ID = "_gameChoice";

    const isSmScreen = document.documentElement.clientWidth < SM_BREAKPOINT;

    const getScaleAndSize = () => {
        if (document.documentElement.clientWidth <= MB_BREAKPOINT) {
            return { scale: MB_CHOICE_SCALE, size: CHOICE_SIZE * MB_CHOICE_SCALE, margin: MB_MARGIN };
        } else if (document.documentElement.clientWidth <= SM_BREAKPOINT) {
            return { scale: SM_CHOICE_SCALE, size: CHOICE_SIZE * SM_CHOICE_SCALE, margin: SM_MARGIN };
        } else {
            return { scale: LG_CHOICE_SCALE, size: CHOICE_SIZE * LG_CHOICE_SCALE, margin: LG_MARGIN };
        }
    }

    useLayoutEffect(() => {
        animateShowChoices();
    }, []);

    const StyledResultStep = styled.div`
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;

        @media screen and (max-width: ${SM_BREAKPOINT}px) {
            
            font-size: 1rem;//${() => 1.35 * getScaleAndSize().scale}rem;
            
            #labelsFrame {
                order: 2;
                /* position: absolute; */
                margin-top: 12px;
            }

            #resultText {
                font-size: 2.5rem !important;
            }
        }

        #resultFrame {
            display: flex;
            flex: row;
        }
        
        #youPicked {
            transform: translateX(-36px);
        }

        #housePicked {
            transform: translateX(28px);
        }

        #youPicked,
        #housePicked {
            width: ${() => getScaleAndSize().size}px;
            
            opacity: 0;

            font-size: ${() => 1.35 * getScaleAndSize().scale}rem;
            text-transform: uppercase;
            white-space: nowrap;
            text-align: center;

            margin-bottom: 32px;
        }
        
        #labelsFrame {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
        }

        #resultText {
            font-size: 3rem;
        }
        
        #textResultFrame {
            opacity: 0;

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
            z-index: 3;
        }
        
        #Chip${GAME_CHOICE_ID} {
            opacity: 1;
            z-index: 3;
        }

        #shadowPlaceholder {
            opacity: 0;
            
            height: ${() => getScaleAndSize().size}px;
            width: ${() => getScaleAndSize().size}px;

            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.203);
    
            transform: translateX(25px);
            
            z-index: 0;
        }
    `;

    const animateShowChoices = () => {

        const pos = playerChoiceRef.current?.getBoundingClientRect();
        // -----------------------------------------
        // Animate player's choice
        if (props.playerChoice && pos) {

            gsap.fromTo(
                `#Chip${PLAYER_CHOICE_ID}`,
                {
                    x: props.coords ? props.coords?.x - (pos?.x ?? 0) : 0,
                    y: props.coords ? props.coords?.y - (pos?.y ?? 0) : 0,
                    scale: getScaleAndSize().scale,
                },
                {
                    x: -25,
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
                            scale: 1,
                            duration: 0.5,
                            delay: 0.8
                        });

                    // -----------------------------------------
                    // Slide choices to the sides
                    if (!isSmScreen) {
                        tl.to(['#youPicked', `#Chip${PLAYER_CHOICE_ID}`],
                            {
                                x: -133, duration: 1, delay: 0.5
                            }
                        );

                        tl.to(['#housePicked', '#shadowPlaceholder'],
                            {
                                x: 133, duration: 1, delay: -1
                            }
                        );
                    } else {
                        tl.to(['#youPicked', `#Chip${PLAYER_CHOICE_ID}`],
                            {
                                y: -110, duration: 1, delay: 0.5
                            }
                        );

                        tl.to(['#housePicked', '#shadowPlaceholder'],
                            {
                                y: -110, duration: 1, delay: -1
                            }
                        );
                    }

                    // -----------------------------------------
                    // Show game result
                    if (!isSmScreen) {
                        tl.to(['#textResultFrame'],
                            {
                                y: 20,
                                autoAlpha: 1,
                                ease: 'ease.in',
                                duration: 1,
                                delay: -0.5
                            }
                        );
                    } else {
                        tl.fromTo(['#textResultFrame'],
                            {
                                autoAlpha: 0,
                            },
                            {
                                autoAlpha: 1,
                                duration: 1.5,
                                delay: -1
                            }
                        );

                        tl.to(['#textResultFrame'],
                            {
                                y: 110,
                                duration: 1,
                                delay: -1.5
                            }
                        );
                    }

                });
        }
    }

    return (<StyledResultStep id="resultFrame" ref={boardRef}>

        <div id="labelsFrame">
            <span id="youPicked" className="choice-text">You picked</span>
            <span id="housePicked" className="choice-text">The house picked</span>
        </div>

        <div id="choicesFrame">
            <Chip ref={playerChoiceRef} choice={{ ...props.playerChoice!, id: PLAYER_CHOICE_ID }} />
            <div id="shadowPlaceholder">
                <Chip ref={gameChoiceRef} choice={{ ...props.gameChoice!, id: GAME_CHOICE_ID }} />
            </div>
        </div>

        <div id="textResultFrame">
            <span id="resultText">{props.resultText}</span>
            <button
                className="choice-text"
                onClick={() => props.onResetGame()}
            >
                Play again
                    </button>
        </div>
    </StyledResultStep>);
}

export default ResultStep;