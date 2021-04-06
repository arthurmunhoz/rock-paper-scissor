import gsap from 'gsap';
import React, { useEffect } from 'react';
import styled from "styled-components";
import { ChoiceData } from '../../model/model';
import Chip from '../chip/Chip';

const StyledResultStep = styled.div`
    width: 100%;
    height: 100%;

    background-color: rgba(222, 184, 135, 0.137);
`;

interface ResultStepProps {
    coords?: DOMRect,
    choice?: ChoiceData
};

const ResultStep = (props: ResultStepProps) => {

    console.log("Coords: ", props.coords);

    useEffect(() => {
        props.choice && gsap.fromTo(`Chip${props.choice.id}`, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 });
    }, []);

    return (<StyledResultStep>
        {
            props.choice && <Chip key={20} choice={props.choice} />
        }
    </StyledResultStep>);
}

export default ResultStep;