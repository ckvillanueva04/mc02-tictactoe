import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from 'styled-components';
import Menu from './components/Menu';
import TicTacToe from './components/TicTacToe'
import Result from './components/Result';

const Container = styled.div`
  display: grid;
  grid-template-rows: 56px 1fr;
`

const NavBar = styled.div`
  display: grid;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 56px;
  background-color: #7CB9E8;
  padding: 10px 20px;
  box-sizing: border-box;
  color: #fff;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-size: 1.5em;
`

function App() {
  const [behavior, setBehavior] = React.useState('0');

  return (
    <Router>
      <Container>
        <NavBar>
          MC02 TIC TAC TOE
        </NavBar>
        <Route path='/result/:bot/:winner'>
          <Result />
        </Route>
        <Route path='/tic-tac-toe/:marker'>
          <TicTacToe behavior={behavior} />  
        </Route>
        <Switch>
          <Route path='/' exact>
            <Menu 
              behavior={behavior}
              setBehavior={(e) => setBehavior(e.target.value)}
            />
          </Route>
        </Switch>
      </Container>  
    </Router>
  );
}

export default App;
