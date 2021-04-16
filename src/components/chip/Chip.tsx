/* eslint-disable react-hooks/exhaustive-deps */
import gsap from 'gsap';
import React, { useLayoutEffect } from 'react';
import styled, { css } from 'styled-components';

import { CHOICE_SIZE, SM_BREAKPOINT } from '../../constants';
import { ChoiceData } from '../board/Board';

export interface ChipData {
    choice: ChoiceData,
    onClick?: Function,
    showAnimatedHighlight?: boolean
}

const StyledChip = styled.div`

    height: ${CHOICE_SIZE}px;
    width: ${CHOICE_SIZE}px;

    border-radius: 50%;

    display: grid;
    place-items: center;

    box-shadow: inset 0px -7px 1px -1px rgba(0, 0, 0, 0.171);

    ${(props) => { if (props.onClick) { return css`cursor: pointer`; } }};

    ${(props: ChipData) => props.onClick ? css`opacity: 0.9;` : css`opacity: 1;`};
  
    :hover {
        opacity: 1;
    }
  
    ${(props: ChipData) => css`
        
        background-color: ${props.choice.color};
        
        #Chip${props.choice.id}-image-frame {
            
            height: ${CHOICE_SIZE - 35}px;
            width: ${CHOICE_SIZE - 35}px;

            @media screen and (max-width: ${SM_BREAKPOINT}px) {
                height: ${CHOICE_SIZE - 60}px;
                width: ${CHOICE_SIZE - 60}px;
            }

            border-radius: 50%;

            background-repeat: no-repeat;
            background-size: 45%;
            background-position-x: 50%;
            background-position-y: 50%;

            background-color: #e9e9e9;

            box-shadow: inset 0px 7px 1px 0px #cccccc;
            background-image: url(${props.choice.imageSrc});

            z-index: 1;
        }

        #highlight {
            position: absolute;
            z-index: 0;
            top: 15px;
            left: -30px;

            height: ${CHOICE_SIZE + 60}px;
            width: ${CHOICE_SIZE + 60}px;;

            @media screen and (max-width: ${SM_BREAKPOINT}px) {
                height: ${CHOICE_SIZE + 20}px;
                width: ${CHOICE_SIZE + 20}px;;
            }

            border-radius: 50%;
            background-color: rgba(235, 235, 235, 0.038);

            ::after {
                content: "";
                position: absolute;

                height: ${CHOICE_SIZE + 125}px;
                width: ${CHOICE_SIZE + 125}px;
                transform: translateX(-11%) translateY(-11%);

                @media screen and (max-width: ${SM_BREAKPOINT}px) {
                    height: ${CHOICE_SIZE + 80}px;
                    width: ${CHOICE_SIZE + 80}px;
                    transform: translateX(-11%) translateY(-11%);
                }

                border-radius: 50%;
                background-color: rgba(235, 235, 235, 0.028);
            }

            ::before {
                content: "";
                position: absolute;
                height: ${CHOICE_SIZE + 180}px;
                width: ${CHOICE_SIZE + 180}px;
                transform: translateX(-18%) translateY(-18%);

                @media screen and (max-width: ${SM_BREAKPOINT}px) {
                    height: ${CHOICE_SIZE + 145}px;
                    width: ${CHOICE_SIZE + 145}px;
                    transform: translateX(-20%) translateY(-21%);
                }

                border-radius: 50%;
                background-color: rgba(235, 235, 235, 0.017);
            }
        }

        @media screen and (max-width: ${SM_BREAKPOINT}px) {
            height: ${CHOICE_SIZE - 30}px;
            width: ${CHOICE_SIZE - 30}px;

            #highlight {
                margin-top: -40px !important;
            }
        }
    }`}
`;

const Chip = React.forwardRef<HTMLDivElement, ChipData>((props, ref) => {

    useLayoutEffect(() => {
        props.showAnimatedHighlight && gsap.fromTo('#highlight',
            {
                autoAlpha: 0,
                scale: 0
            },
            {
                autoAlpha: 1,
                scale: 1,
                ease: 'bounce.inOut',
                duration: 0.75
            })
    }, []);

    const handleOnClick = () => {

        gsap.fromTo(`#Chip${props.choice.id}`,
            {
                scale: 1
            },
            {
                scale: 0.9,
                duration: 0.1,
                repeat: 1,
                yoyo: true
            }).then(() => {
                ref && console.log("CHIP ELEMENT: ", document.getElementById(`Chip${props.choice.id}`)?.getBoundingClientRect());

                const el = document.getElementById(`Chip${props.choice.id}`);

                if (props.onClick && el) {
                    props.onClick(props.choice, el.getBoundingClientRect());
                }
            });
    }

    return (<StyledChip
        {...props}
        ref={ref}
        id={`Chip${props.choice.id}`}
        onClick={props.onClick ? handleOnClick : undefined}
    >
        <div id={`Chip${props.choice.id}-image-frame`}></div>
        {
            props.showAnimatedHighlight && <div id="highlight" />
        }
    </StyledChip>);
});

export default Chip;