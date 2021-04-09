import gsap from 'gsap';
import React, { ReactElement, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled, { css } from "styled-components";
import {
    LG_BREAKPOINT,
    LG_CHOICE_SCALE,
    MB_BREAKPOINT,
    MB_CHOICE_SCALE,
    SM_BREAKPOINT,
    SM_CHOICE_SCALE,
    CHOICE_SIZE,
    CHOICE_DATA
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

    const gameChoiceRef = useRef<HTMLDivElement>(null);
    const playerChoiceRef = useRef<HTMLDivElement>(null);

    const PLAYER_CHOICE_ID = "_playerChoice";
    const GAME_CHOICE_ID = "_gameChoice";

    const [gameChoice, setGameChoice] = useState<ChoiceData>();
    const isSmScreen = document.documentElement.clientWidth < LG_BREAKPOINT;

    const scale = isSmScreen ? SM_CHOICE_SCALE : LG_CHOICE_SCALE;

    const tl = gsap.timeline();

    const getScaleAndSize = () => {
        if (document.documentElement.clientWidth <= MB_BREAKPOINT) {
            return { scale: MB_CHOICE_SCALE, size: CHOICE_SIZE * MB_CHOICE_SCALE };
        } else if (document.documentElement.clientWidth <= SM_BREAKPOINT) {
            return { scale: SM_CHOICE_SCALE, size: CHOICE_SIZE * SM_CHOICE_SCALE };
        } else {
            return { scale: LG_CHOICE_SCALE, size: CHOICE_SIZE * LG_CHOICE_SCALE };
        }
    }

    const StyledResultStep = styled.div`
        width: 100%;
        height: 100%;

        display: grid;
        place-items: center;
        position: relative;


        @media screen and (max-width: ${SM_BREAKPOINT}px) {
            
        }

        #shadow-placeholder {
            position: absolute;
            opacity: 0;
            height: ${() => getScaleAndSize().size}px;
            width: ${() => getScaleAndSize().size}px;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.203);
            transform: ${() => {
            return css`
                        scale(${getScaleAndSize().scale});
                    `;
        }
        };
            z-index: 0;
        }

        #youPicked,
        #housePicked {
            opacity: 0;
            position: absolute;
            font-size: ${() => 1.55 * getScaleAndSize().scale}rem;
            text-transform: uppercase;
        }

        #Chip${PLAYER_CHOICE_ID} {
            opacity: 1;
            z-index: 3;
        }
        
        #Chip${GAME_CHOICE_ID} {
            opacity: 0;
            background-color: violet;
            z-index: 3;
            transform: ${() => {
            return css`
                        scale(${getScaleAndSize().scale});
                    `;
        }
        };
            z-index: 10px;
        }
    `;

    const calcOffset = (squareDimension: number, scale: number) => {
        return squareDimension * ((1 - scale) / 2);
    };

    const makeHouseChoice = () => {
        const rand = Math.ceil(Math.random() * 100 % 3);
        const choice = Object.keys(CHOICE_DATA).find((item) => CHOICE_DATA[item].id === rand + 1);

        setTimeout(() => {
            setGameChoice(CHOICE_DATA[choice!]);
        }, 1200);
    }

    const animateShowChoices = () => {

        const pos = playerChoiceRef.current?.getBoundingClientRect();
        const offset = calcOffset(CHOICE_SIZE * (isSmScreen ? SM_CHOICE_SCALE : LG_CHOICE_SCALE), scale);
        const playerX = -130 * (1 - (1 - getScaleAndSize().scale));
        const playerY = 0;
        const gameX = 130 * (1 - (1 - getScaleAndSize().scale));
        const gameY = 0;

        // -----------------------------------------
        // Animate player's choice
        props.choice && pos && gsap.fromTo(
            `#Chip${PLAYER_CHOICE_ID}`,
            {
                x: props.coords ? props.coords?.x - (pos?.x ?? 0) : 0,
                y: props.coords ? props.coords?.y - (pos?.y ?? 0) : 0,
                scale: 1,
            },
            {
                x: playerX,
                y: playerY,
                scale: 1.3,
                ease: 'power1.in',
                duration: 0.5
            })
            // -----------------------------------------
            //Animate game choice
            .then(() => {
                // -----------------------------------------
                // Animate choice texts

                tl.fromTo(
                    `#youPicked`,
                    {
                        x: playerX,
                        y: playerY - getScaleAndSize().size,
                    },
                    {
                        x: playerX,
                        y: playerY - getScaleAndSize().size,
                        duration: 0.1,
                    }
                );

                tl.fromTo(
                    `#housePicked`,
                    {
                        x: gameX,
                        y: gameY - getScaleAndSize().size,
                    },
                    {
                        x: gameX,
                        y: gameY - getScaleAndSize().size,
                        duration: 0.1,
                        delay: -0.1
                    }
                );

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
                    `#shadow-placeholder`,
                    {
                        x: gameX,
                        y: gameY,
                        autoAlpha: 0.3,
                        scale: 1.3,
                    },
                    {
                        x: gameX,
                        y: gameY,
                        scale: 1.3,
                        autoAlpha: 0.9,
                        ease: "bounce.inOutinOut",
                        duration: 0.6,
                        onComplete: () => { makeHouseChoice(); }
                    }
                );

                // -----------------------------------------
                // Animate game choice
                tl.fromTo(
                    `#Chip${GAME_CHOICE_ID}`,
                    {
                        x: gameX,
                        y: gameY,
                        autoAlpha: 0,
                        scale: 0,
                    },
                    {
                        x: gameX,
                        y: gameY,
                        autoAlpha: 1,
                        scale: 1.3,
                        duration: 0.5,
                        delay: 0.4
                    });
            });
    }

    useLayoutEffect(() => {
        animateShowChoices();
    }, []);

    useLayoutEffect(() => {
        gameChoice && console.log("Game choice: ", gameChoice);
    }, [gameChoice]);

    return (<StyledResultStep id="result-frame">
        {
            <>
                {props.choice && <Chip ref={playerChoiceRef} choice={{ ...props.choice, id: PLAYER_CHOICE_ID }} />}
                {gameChoice && <Chip ref={gameChoiceRef} choice={{ ...gameChoice, id: GAME_CHOICE_ID }} />}
                <div id="shadow-placeholder"></div>
                <span id="youPicked" className="choice-text">You picked</span>
                <span id="housePicked" className="choice-text">The house picked</span>
            </>
        }
    </StyledResultStep>);
}

export default ResultStep;