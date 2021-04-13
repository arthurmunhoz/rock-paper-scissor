import styled from "styled-components";
import Triangle from '../../res/images/bg-triangle.svg'
import Chip from "../chip/Chip";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { CHOICE_DATA, GAME_MODE, SM_BREAKPOINT } from "../../constants";
import { ChoiceData } from "./Board";
import { useRef } from "react";

const StyledChoiceStep = styled.div`

    height: 100%;
    width: 100%;

    display: grid;
    place-items: center;
    position: relative;

    opacity: 0;
    /* background-color: rgba(255, 255, 255, 0.342); */
    
    .background-frame {
      height: 100%;
      width: 100%;
      background-image: url(${Triangle});
      background-repeat: no-repeat;
      background-position-x: center;
      background-position-y: center;
    }

    #Chip1 {
    position: absolute;
      transform: translateX(-140px) translateY(-120px);
    }

    #Chip2 {
    position: absolute;
      transform: translateX(140px) translateY(-120px);

    }

    #Chip3 {
    position: absolute;
      transform: translateY(100px);
    }

    @media screen and (max-width: ${SM_BREAKPOINT}px) {

      background-size: 240px;

      #Chip1 {
        transform: translateX(-100px) translateY(-100px);
      }

      #Chip2 {
        transform: translateX(100px) translateY(-100px);
      }

      #Chip3 {
        transform: translateY(70px);
      }
    }
`;

interface ChoiceStepProps {
  onChipSelected: Function
}

const ChoiceStep = (props: ChoiceStepProps) => {

  const mode = useSelector((state: RootState) => state.game.mode);

  const chipPaperRef = useRef<HTMLDivElement>(null);
  const chipScissorRef = useRef<HTMLDivElement>(null);
  const chipRockRef = useRef<HTMLDivElement>(null);
  const chipLizardRef = useRef<HTMLDivElement>(null);
  const chipSpockRef = useRef<HTMLDivElement>(null);

  const handleOnClick = (choice: ChoiceData, coords: DOMRect) => {
    props.onChipSelected(choice, coords);
  }

  return (<StyledChoiceStep className="choice-step">
    <div className="background-frame"></div>
    <Chip ref={chipPaperRef} choice={CHOICE_DATA.PAPER} onClick={handleOnClick} />
    <Chip ref={chipScissorRef} choice={CHOICE_DATA.SCISSORS} onClick={handleOnClick} />
    <Chip ref={chipRockRef} choice={CHOICE_DATA.ROCK} onClick={handleOnClick} />
    {
      (mode === GAME_MODE.BONUS) &&
      <>
        <Chip ref={chipLizardRef} choice={CHOICE_DATA.LIZARD} onClick={handleOnClick} />
        <Chip ref={chipSpockRef} choice={CHOICE_DATA.SPOCK} onClick={handleOnClick} />
      </>
    }
  </StyledChoiceStep>);
}

export default ChoiceStep;