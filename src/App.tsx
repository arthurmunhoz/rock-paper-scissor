import React from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import './App.css';
import Board from './components/board/Board';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import GlobalStyles from './global-styles';
import { store } from './store';

const StyledGame = styled.div`
  height: 100vh;
  max-height: 100vh;
  width: 100%;

  padding: 1.75rem;

  display: flex;
  flex-direction: column;
  position: relative;
  
  align-items: center;

  font-size: 40px;
  color: white;

  background: radial-gradient(circle at top, hsl(214, 47%, 23%), hsl(237, 49%, 15%));
`;

const App = () => {

  return (
    <Provider store={store}>
      <React.StrictMode>
        <GlobalStyles />
        <StyledGame >
          <Header />
          <Board />
          <Footer />
        </StyledGame>
      </React.StrictMode>
    </Provider>
  );
}

export default App;
