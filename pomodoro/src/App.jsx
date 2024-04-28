import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import theme from './theme';
import {store} from './state/store';
import PomodoroTimer from './PomodoroTimer';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e5e5e5;
`;

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <PomodoroTimer />
        </AppContainer>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
