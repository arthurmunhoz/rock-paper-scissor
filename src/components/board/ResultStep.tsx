/* eslint-disable react-hooks/exhaustive-deps */
import gsap from 'gsap';
import React, { useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { LOCAL_STORAGE_SCORE } from '../../App';
import { CHOICE_SIZE, GAME_RESULTS, LG_CHOICE_SCALE, SM_BREAKPOINT, SM_CHOICE_SCALE } from '../../constants';
import Chip from '../chip/Chip';
import { ChoiceData } from './Board';

interface ResultStepProps {
    coords?: DOMRect,
    playerChoice?: ChoiceData,
    gameChoice?: ChoiceData,
    resultText: string,
    onResetGame: Function,
    onGameFinished: Function
};

const ResultStep = (props: ResultStepProps) => {

    console.log("Coords: ", props.coords);
    console.log("User choice: ", props.playerChoice);
    console.log("Game choice: ", props.gameChoice);
    console.log("Result text: ", props.resultText);

    const tl = gsap.timeline();

    const boardRef = useRef<HTMLDivElement>(null);
    const gameChoiceRef = useRef<HTMLDivElement>(null);
    const playerChoiceRef = useRef<HTMLDivElement>(null);

    const [isAnimationComplete, setAnimationComplete] = useState(false);

    const PLAYER_CHOICE_ID = "_playerChoice";
    const GAME_CHOICE_ID = "_gameChoice";

    const isSmScreen = document.documentElement.clientWidth < SM_BREAKPOINT;

    const StyledResultStep = styled.div`
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        overflow: visible;

        #playerFrame, 
        #houseFrame {
            height: fit-content;
            width: ${CHOICE_SIZE}px;

            @media screen and (min-width: ${SM_BREAKPOINT + 1}px) {
                width: ${CHOICE_SIZE * LG_CHOICE_SCALE}px;
            }

            @media screen and (max-width: ${SM_BREAKPOINT}px) {
                width: ${CHOICE_SIZE * SM_CHOICE_SCALE - 20}px; 
            }

            position: relative;
            display: flex;
            flex-direction: column;
            justify-items: center;

            z-index: 10;
        }

        #playerFrame {
            margin-right: 120px;
        }

        #houseFrame {
            margin-left: 120px;
        }

        #Chip${PLAYER_CHOICE_ID}, #Chip${GAME_CHOICE_ID} {
            z-index: 3;
            margin-left: auto;
            margin-right: auto;
        }
        
        #Chip${PLAYER_CHOICE_ID} {
            opacity: 1;
        }

        #shadowPlaceholder {
            
            height: ${CHOICE_SIZE}px;
            width: ${CHOICE_SIZE}px;

            position: absolute;
            left: 0;
            bottom: 0;

            @media screen and (max-width: ${SM_BREAKPOINT}px) {
                top: 0;
                margin-left: 10px;

                height: ${CHOICE_SIZE - 35}px;
                width: ${CHOICE_SIZE - 35}px;
            }

            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.349);

            z-index: 0;
        }

        #youPicked,
        #housePicked {
            width: 100%;
            
            text-align: center;

            font-size: 1.45rem;
            text-transform: uppercase;
            white-space: nowrap;
            
            margin-bottom: 16px;
            margin-left: auto;
            margin-right: auto;
        }

        #housePicked {
            margin-left: -6px;
        }

        #resultText {
            font-size: 3rem;
        }

        #textResultFrame {
            opacity: ${isAnimationComplete ? 1 : 0};

            height: fit-content;
            width: fit-content;
            position: absolute;

            display: flex;   
            flex-direction: column;

            z-index: 99;

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

                border-width: 2px !important;
                border-color: rgba(211, 211, 211, 0.247);

                background-color: white;
            }
            
            button:focus {
                outline: none !important;
            }

            button:hover {
                color: #db0000;
                cursor: pointer;
            }
        }

        @media screen and (max-width: ${SM_BREAKPOINT}px) {
            
            font-size: 1rem;

            #Chip${GAME_CHOICE_ID} {
                margin-left: 10px;
            }

            #Chip${GAME_CHOICE_ID} #highlight {
                margin-left: 14px;
            }

            #Chip${PLAYER_CHOICE_ID} #highlight {
                margin-left: 3px;
            }

            #resultText {
                font-size: 2.5rem !important;
            }

            #youPicked, #housePicked {
                order: 2;
                margin-top: 16px;
                font-size: 1.25rem;
            }

            #youPicked {
                padding-left: 16px;
            }

            #housePicked {
                margin-left: -2px;
            }

            #playerFrame {
                margin-right: 50px;
                margin-bottom: 120px;
                margin-right: 42px !important;
            }

            #houseFrame {
                margin-left: 20px;
                margin-bottom: 120px;
                margin-right: 42px !important;
            }

            #textResultFrame {
                margin-top: 220px;
                bottom: 80px !important;
            }
        }
    `;

    useLayoutEffect(() => {
        animateShowChoices();
    }, []);

    const animateShowChoices = () => {

        const pos = playerChoiceRef.current?.getBoundingClientRect();
        // -----------------------------------------
        // Animate player's choice
        if (props.playerChoice && pos) {

            tl.fromTo(
                `#playerFrame`,
                {
                    x: props.coords ? props.coords?.x - (pos?.x ?? 0) : 0,
                    y: props.coords ? props.coords?.y - (pos?.y ?? 0) : 0,
                },
                {
                    x: !isSmScreen ? 80 : 0,
                    y: 0,
                    ease: 'power1.in',
                    duration: 0.5,
                    onStart: () => {
                        if (document.getElementById('playerFrame')) {
                            document.getElementById('playerFrame')!.style.opacity = "1";
                        }
                    }
                });

            // -----------------------------------------
            //Animate choices' labels
            tl.to('#housePicked',
                {
                    x: !isSmScreen ? -80 : 0,
                    onComplete: () => {
                        if (document.getElementById('houseFrame')) {
                            document.getElementById('houseFrame')!.style.opacity = "1";
                        }
                    }
                });

            tl.fromTo(
                ['#youPicked', '#housePicked'],
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
                    autoAlpha: 0.05,
                    x: !isSmScreen ? -80 : 0,
                },
                {
                    autoAlpha: 0.55,
                    x: !isSmScreen ? -80 : 0,
                    ease: "bounce.inOut",
                    duration: 0.8,
                    onStart: () => {
                        if (document.getElementById("shadowPlaceholder") !== null) {
                            document.getElementById("shadowPlaceholder")!.style.display = "block";
                        }
                    }
                }
            );

            // -----------------------------------------
            // Animate game choice
            tl.fromTo(
                `#Chip${GAME_CHOICE_ID}`,
                {
                    x: !isSmScreen ? -80 : 0,
                    autoAlpha: 0,
                    scale: 0,
                },
                {
                    x: !isSmScreen ? -80 : 0,
                    autoAlpha: 1,
                    scale: 1,
                    duration: 0.5,
                    delay: 0.5
                });

            // -----------------------------------------
            // Slide choices to the sides/down
            if (!isSmScreen) {
                tl.to(['#playerFrame'],
                    {
                        x: 0, duration: 1, delay: 0.5
                    }
                );

                tl.to(['#houseFrame'],
                    {
                        x: 80, duration: 1, delay: -1
                    }
                );
            }

            // -----------------------------------------
            // Show game result
            if (!isSmScreen) {
                tl.to(['#textResultFrame'],
                    {
                        autoAlpha: 1,
                        ease: 'ease.in',
                        duration: 1,
                        delay: -0.8,
                    }
                );
            } else {
                tl.fromTo(['#textResultFrame'],
                    {
                        autoAlpha: 0,
                        scale: 0,
                        y: -120
                    },
                    {
                        autoAlpha: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        delay: 0.4,
                    }
                );
            }

            // -----------------------------------------
            // Show winner highlight
            (props.resultText === GAME_RESULTS.LOSE) &&
                tl.to('#houseHighlight', {
                    x: !isSmScreen ? -110 : 0,
                });

            tl.fromTo((props.resultText === GAME_RESULTS.WIN) ? ['#playerHighlight'] : ['#houseHighlight'],
                {
                    autoAlpha: 0,
                    scale: 0,
                },
                {
                    autoAlpha: 1,
                    scale: 1,
                    ease: 'bounce.inOut',
                    duration: 0.6,
                    delay: -0.5,
                    onComplete: handleFinishGame
                }
            );
        }
    }

    const handleFinishGame = () => {

        let result = Number.parseInt((localStorage.getItem(LOCAL_STORAGE_SCORE)) ?? "0");

        if (props.resultText === GAME_RESULTS.DRAW) {
            setTimeout(() => {
                props.onGameFinished(result);
            }, 2000);
        } else if (props.resultText === GAME_RESULTS.WIN) {
            props.onGameFinished(result + 1);
        } else {
            if (result > 0) {
                props.onGameFinished(result - 1);
            }
        }

        setAnimationComplete(true);

    }

    return (<StyledResultStep id="resultFrame" ref={boardRef}>
        <div id="playerFrame">
            <span id="youPicked" className="choice-text">You picked</span>
            <Chip
                ref={playerChoiceRef}
                choice={{ ...props.playerChoice!, id: PLAYER_CHOICE_ID }}
                showAnimatedHighlight={(props.resultText === GAME_RESULTS.WIN) && isAnimationComplete}
            />
        </div>

        {
            <section id="textResultFrame">
                <span id="resultText">{props.resultText}</span>
                <button onClick={() => props.onResetGame()}>Play again</button>
            </section>
        }

        <div id="houseFrame">
            <span id="housePicked" className="choice-text">The house picked</span>
            <Chip
                ref={gameChoiceRef}
                choice={{ ...props.gameChoice!, id: GAME_CHOICE_ID }}
                showAnimatedHighlight={(props.resultText === GAME_RESULTS.LOSE) && isAnimationComplete}
            />
            <div id="shadowPlaceholder" />
        </div>


    </StyledResultStep>);
}

export default ResultStep;