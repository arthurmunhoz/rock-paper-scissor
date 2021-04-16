import './App.css';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Board from './components/board/Board';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import GlobalStyles from './global-styles';
import BoardHOC from './components/board/BoardHOC';

const StyledGame = styled.div`
  height: 100vh;
  width: 100%;

  padding: 1.75rem;

  display: flex;
  flex-direction: column;
  position: relative;
  
  align-items: center;

  font-size: 40px;
  color: white;

  overflow: hidden;

  background: radial-gradient(circle at top, hsl(214, 47%, 23%), hsl(237, 49%, 15%));
`;

export const LOCAL_STORAGE_SCORE = "_rps_score";

const App = () => {

  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const storedScore = localStorage.getItem(LOCAL_STORAGE_SCORE) ?? "0";
    setScore(Number.parseInt(storedScore));
  }, []);

  const updateScore = (newScore: number) => {
    setScore(newScore);
    localStorage.setItem(LOCAL_STORAGE_SCORE, newScore.toString());
  }

  return (
    <React.StrictMode>
      <GlobalStyles />
      <StyledGame >
        <Header score={score} />
        <BoardHOC children={
          <Board onGameFinished={updateScore} />
        } />
        <Footer />
      </StyledGame>
    </React.StrictMode>
  );
}

export default App;
