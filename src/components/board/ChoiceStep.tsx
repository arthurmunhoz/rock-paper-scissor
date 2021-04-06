import styled from "styled-components";
import Triangle from '../../res/images/bg-triangle.svg'
import Chip from "../chip/Chip";
import Paper from '../../res/images/icon-paper.svg'
import Scissor from '../../res/images/icon-scissors.svg'
import Rock from '../../res/images/icon-rock.svg'
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { CHOICE_DATA, GAME_MODE } from "../../constants";
import { gsap } from 'gsap';
import { ChoiceData } from "../../model/model";

const StyledChoiceStep = styled.div`

    height: 100%;
    width: 100%;
    display: flex;

    background-image: url(${Triangle});
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: center;

    display: grid;
    place-items: center;
    position: relative;

    opacity: 0;
    /* background-color: rgba(255, 255, 255, 0.342); */
    
    #Chip1 {
        margin-bottom: 50%;
        transform: translateX(-150px);
    }

    #Chip2 {
        margin-bottom: 50%;
        transform: translateX(150px);
    }

    #Chip3 {
        margin-top: 50%;
    }
`;

interface ChoiceStepProps {
  onChipSelected: Function
}

const ChoiceStep = (props: ChoiceStepProps) => {

  const mode = useSelector((state: RootState) => state.game.mode);

  const handleOnClick = (choice: ChoiceData, coords: DOMRect) => {
    console.log("IDDDDD", `#Chip${choice.id}`)
    gsap.fromTo(`#Chip${choice.id}`, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.5 })
      .then((result) => props.onChipSelected(choice, coords));
  }

  return (<StyledChoiceStep className="choice-step">
    <Chip choice={CHOICE_DATA.PAPER} onClick={handleOnClick} />
    <Chip choice={CHOICE_DATA.SCISSORS} onClick={handleOnClick} />
    <Chip choice={CHOICE_DATA.ROCK} onClick={handleOnClick} />
    {
      (mode === GAME_MODE.BONUS) &&
      <>
        <Chip choice={CHOICE_DATA.LIZARD} onClick={handleOnClick} />
        <Chip choice={CHOICE_DATA.SPOCK} onClick={handleOnClick} />
      </>
    }
  </StyledChoiceStep>);
}

export default ChoiceStep;