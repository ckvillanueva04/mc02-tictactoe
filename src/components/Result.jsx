import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

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

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`

const StyledLink = styled(Link)`
  margin-top: 20px;
`

const Result = () => {
  const { winner } = useParams();
  const message = winner === 'draw' 
    ? `IT'S A DRAW!`
    : `PLAYER ${winner} WON`
    
  return (
    <Container>
      <Card>
        <Typography variant="subtitle1" gutterBottom>
          {message}
        </Typography>
        <StyledLink to='/'>
          <Button variant="contained">Back</Button>
        </StyledLink> 
      </Card>
    </Container>
  )
}

export default Result;