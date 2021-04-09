import { useDispatch, useSelector } from "react-redux";
import React, { useState, useLayoutEffect, useEffect } from 'react'
import styled from "styled-components";
import { RootState } from "../../store";
import ChoiceStep from "./ChoiceStep";
import { gsap } from 'gsap';
import ResultStep from "./ResultStep";
import { setSelectedChoice } from "../../reducers/gameReducer";
import { GAME_MODE, SM_BREAKPOINT } from "../../constants";

export interface ChoiceData {
  id: number | string,
  title: string,
  imageSrc: string,
  color: string,
}

const StyledBoard = styled.div`
    min-height: 430px;
    flex: 1;
    
    padding-top: 12px;
    position: relative;

    width: fit-content;
    min-width: 480px;
    
    opacity: 1;
    transition: opacity 300ms ease-in;
    
    @media screen and (max-width: ${SM_BREAKPOINT}px) {
      width: 100%;
      min-width: 100%;
    }
`;

const Board = () => {

  const [step, setStep] = useState(1);
  const [coords, setCoords] = useState<DOMRect | undefined>();
  const { mode, choice } = useSelector((state: RootState) => state.game);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("step: ", step);

    if (step === 1) {
      gsap.fromTo('.choice-step', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 });
      gsap.fromTo('.choice-step', { scale: 0 }, { scale: 1, duration: 0.5 });
    }
  }, [step]);

  const animateToResultStep = (choice: ChoiceData) => {
    // Hiding all chips except for the selected one
    let i = (mode === GAME_MODE.BASIC) ? 3 : 5;
    gsap.to('.choice-step', { backgroundImage: 'none', duration: 0.7 }).then(() => {
      setStep(2);
    });
    while (i > 0) {
      if (choice.id !== i) {
        gsap.fromTo(`#Chip${i}`, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.5 });
      }
      i--;
    }
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
          <ResultStep coords={coords} choice={choice} /> : <div></div>
    }
  </StyledBoard>);
}

export default Board;