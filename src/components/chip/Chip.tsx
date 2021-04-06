import styled, { css } from "styled-components";
import { ChipData } from "../../model/model";

const StyledChip = styled.div`

    height: 150px;
    width: 150px;

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

        #Chip${props.choice.id} {
          background-color: violet !important;
        }
    `}
`;

const Chip = (props: ChipData) => {

  console.log(`Chip${props.choice.id}`)

  return (<StyledChip {...props} id={`Chip${props.choice.id}`} onClick={() => {
    props.onClick && props.onClick(props.choice, document.getElementById(`Chip${props.choice.id}`)?.getBoundingClientRect());
  }}>
    <div className="image-frame"></div>
  </StyledChip>);
}

export default Chip;