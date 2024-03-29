import React from 'react';
import styled from 'styled-components';

import { SM_BREAKPOINT } from '../../constants';

const StyledHeader = styled.header`
    width: 60%;

    display: flex;
    justify-content: space-between;

    padding: 1.45rem;
    
    border: solid;
    border-radius: 12px;
    border-color: rgba(255, 255, 255, 0.466);
    border-width: 3px;

    .game-mode-texts {
      font-size: 2.2rem;
      word-spacing: 100vw;
      line-height: 2.0rem;

      margin-top: auto;
      margin-bottom: auto;

      text-transform: uppercase;
    }
    
    .score-board {
      height: 100%;
      min-height: 80px !important;
      width: fit-content;

      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;

      color: rgba(0, 0, 0, 0.699);
      font-size: 1rem;
      text-transform: uppercase;
      
      padding: 0px 2.5rem;
      
      border-radius: 8px;

      background: white;
    }

    .score-board > h1 {
      font-size: 3.5rem;
      line-height: 2.8rem;
    }

    @media screen and (max-width: ${SM_BREAKPOINT}px) {
      width: 90%;
      padding: 1.15rem;

      .score-board {        
        padding: 2px 1.3rem;
      }

      .score-board > h1 {
        font-size: 2.5rem;
        line-height: 2rem
      }

      .game-mode-texts {
      font-size: 1.7rem;
      word-spacing: 100vw;
      line-height: 1.5rem;
    }

    }
`;

const Header = (props: { score: number }) => {
  return (
    <StyledHeader>
      <h1 className="game-mode-texts">
          Rock Paper Scissor
      </h1>
      <div className="score-board">
        Score
        <h1>{props.score}</h1>
      </div>
    </StyledHeader>
  );
}

export default Header;