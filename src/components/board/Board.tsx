import { useDispatch, useSelector } from "react-redux";
import React, { useState, useLayoutEffect, useEffect } from 'react'
import styled from "styled-components";
import { RootState } from "../../store";
import ChoiceStep from "./ChoiceStep";
import { gsap } from 'gsap';
import ResultStep from "./ResultStep";
import { setSelectedChoice } from "../../reducers/gameReducer";
import { BOARD_HEIGHT, BOARD_WIDTH, CHOICE_DATA, GAME_MODE, GAME_RESULTS, SM_BREAKPOINT } from "../../constants";

export interface ChoiceData {
  id: number | string,
  title: string,
  imageSrc: string,
  color: string,
}

const StyledBoard = styled.div`
    height: ${() => BOARD_HEIGHT}px;
    flex: 1;
    
    padding-top: 12px;
    position: relative;

    width: ${() => BOARD_WIDTH}px;
    min-width: ${() => BOARD_HEIGHT}px;
    /* max-width: 100%; */
    
    opacity: 1;
    transition: opacity 300ms ease-in;
    
    @media screen and (max-width: ${SM_BREAKPOINT}px) {
      width: 100%;
      min-width: 100%;
    }

    background-color: rgba(255, 255, 255, 0.185);
`;

const Board = () => {

  const [step, setStep] = useState(1);
  const [coords, setCoords] = useState<DOMRect | undefined>();
  const { mode, choice } = useSelector((state: RootState) => state.game);
  const [gameChoice, setGameChoice] = useState<ChoiceData>();
  const [resultText, setResultText] = useState("");

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    makeHouseChoice();
  }, []);

  useEffect(() => {
    console.log("step: ", step);
    
    if (step === 1) {
      gsap.fromTo('.choice-step', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 });
      gsap.fromTo('.choice-step', { scale: 0 }, { scale: 1, duration: 0.5 });
    }
  }, [step]);
  
  useEffect(() => {
    gameChoice && determineResult();
  }, [gameChoice]);
  
  useEffect(() => {
    console.log("Result text: ", resultText);
  }, [resultText]);

  const determineResult = () => {

    // id: 1 -> ROCK
    // id: 2 -> PAPER
    // id: 3 -> SCISSOR

    if (choice && gameChoice) {

      if (choice.id === gameChoice.id) {
        setResultText(GAME_RESULTS.DRAW);
      } else {
        // PLAYER CHOICE: ROCK
        if (choice.id === 1) {
          (gameChoice.id === 2) ?
            setResultText(GAME_RESULTS.LOSE) :
            setResultText(GAME_RESULTS.WIN);
        }

        // PLAYER CHOICE: PAPER
        if (choice.id === 2) {
          (gameChoice.id === 3) ?
            setResultText(GAME_RESULTS.LOSE) :
            setResultText(GAME_RESULTS.WIN);
        }

        // PLAYER CHOICE: SCISSOR
        if (choice.id === 3) {
          (gameChoice.id === 1) ?
            setResultText(GAME_RESULTS.LOSE) :
            setResultText(GAME_RESULTS.WIN);
        }
      }
    }
  }

  const animateToResultStep = (choice: ChoiceData) => {

    // Hiding all chips except for the selected one
    const timeline = gsap.timeline();

    let chips: string[] = [];
    
    let i = (mode === GAME_MODE.BASIC) ? 3 : 5;
    while (i > 0) {
      if (choice.id !== i) {
        chips.push(`#Chip${i}`)
      }
      i--;
    }

    timeline.fromTo(
      chips,
      {
        autoAlpha: 1
      },
      {
        autoAlpha: 0,
        duration: 0.5,
      });

    timeline.to(
      '.background-frame',
      {
        autoAlpha: 0,
        duration: 0.5,
        delay: -0.4,
        onComplete: () => setStep(2),
      });

  }

  const makeHouseChoice = () => {
    const rand = Math.ceil(Math.random() * 100 % 3);
    const choice = Object.keys(CHOICE_DATA).find((item) => CHOICE_DATA[item].id === rand);

    setGameChoice(CHOICE_DATA[choice!]);
  }

  const handleChangeStep = (
    choice?: ChoiceData,
    coords?: DOMRect
  ) => {

    const newStep: number = step + 1;

    if (newStep === 2) {
      coords && setCoords(coords);
      choice && dispatch(setSelectedChoice(choice)) && animateToResultStep(choice)
    }
  };

  return (<StyledBoard>
    {
      (step === 1) ?
        <ChoiceStep onChipSelected={handleChangeStep} /> :
        (step === 2) ?
          <ResultStep
            coords={coords}
            gameChoice={gameChoice}
            playerChoice={choice}
            resultText={resultText}
          /> : <div></div>
    }
  </StyledBoard>);
}

export default Board;