import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams, useHistory } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;  
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  min-width: 200px;
  height: min-content;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;

  h6 {
    color: ${({ win, draw }) => draw ? 'black' : win ? 'green' : 'red'}
  }

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`

const StyledLink = styled(Link)`
  margin-top: 20px;
`

const Result = () => {
  const history = useHistory();
  const { bot, winner } = useParams();
  const message = winner === 'draw' 
    ? `IT'S A DRAW!`
    : bot === winner 
      ? 'YOU LOSE'
      : 'YOU WON!'

  useEffect(() => {
    if (!bot || !winner) {
      history.push('/');
    }
  }, [history, bot, winner])

  return (
    <Container>
      <Card win={bot !== winner} draw={winner === 'draw'}>
        <Typography variant="subtitle1" gutterBottom>
          {message}
        </Typography>
        <StyledLink to={`/tic-tac-toe/${bot === 'X' ? 'O' : 'X'}`}>
          <Button variant="contained">play another game</Button>
        </StyledLink> 
        <StyledLink to='/'>
          <Button variant="contained">Back to menu</Button>
        </StyledLink> 
      </Card>
    </Container>
  )
}

export default Result;