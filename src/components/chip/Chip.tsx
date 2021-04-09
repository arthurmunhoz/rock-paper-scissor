import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { CHOICE_SIZE, LG_CHOICE_SCALE, SM_BREAKPOINT, SM_CHOICE_SCALE } from "../../constants";
import { ChoiceData } from "../board/Board";
export interface ChipData {
    choice: ChoiceData,
    onClick?: Function
}

const StyledChip = styled.div`

    height: ${CHOICE_SIZE * LG_CHOICE_SCALE}px;
    width: ${CHOICE_SIZE * LG_CHOICE_SCALE}px;

    @media screen and (max-width: ${SM_BREAKPOINT}px) {
        height: ${CHOICE_SIZE * SM_CHOICE_SCALE}px;
        width: ${CHOICE_SIZE * SM_CHOICE_SCALE}px;
    }

    border-radius: 50%;

    position: absolute;

    display: grid;
    place-items: center;

    opacity: 0.9;
    box-shadow: inset 0px -7px 1px -1px rgba(0, 0, 0, 0.171);

    cursor: pointer;

    :hover {
        opacity: 1;
    }
  
    .image-frame {
        height: 75%;
        width: 75%;

        border-radius: 50%;

        background-repeat: no-repeat;
        background-size: 45%;
        background-position-x: 50%;
        background-position-y: 50%;

        background-color: #e9e9e9;

        box-shadow: inset 0px 7px 1px 0px #cccccc;
    }

    ${(props: ChipData) => css`
        background-color: ${props.choice.color};
        
        .image-frame {
            background-image: url(${props.choice.imageSrc});
        }
    `}
`;

const Chip = React.forwardRef<HTMLDivElement, ChipData>((props, ref) => {

    useEffect(() => {
        console.log("REF TO STRING", ref)
    }, [ref]);

    const handleOnClick = () => {

        ref && console.log("CHIP ELEMENT: ", document.getElementById(`Chip${props.choice.id}`)?.getBoundingClientRect());

        const el = document.getElementById(`Chip${props.choice.id}`);

        if (props.onClick && el) {
            props.onClick(props.choice, el.getBoundingClientRect());
        }
    }

    return (<StyledChip
        {...props}
        ref={ref}
        id={`Chip${props.choice.id}`}
        onClick={handleOnClick}>
        <div className="image-frame"></div>
    </StyledChip>);
});

export default Chip;