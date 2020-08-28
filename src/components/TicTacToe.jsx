import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { initGridState, checkResult } from '../helpers/constant';
import getRandomInt from '../helpers/getRandomInt'
import robot from '../assets/robot.gif'
import Typography from '@material-ui/core/Typography';

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
  min-height: 165px;
  height: min-content;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  z-index: 2;
  position: relative;  

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`
const template = `
  "grid-1 grid-2 grid-3"
  "grid-4 grid-5 grid-6"
  "grid-7 grid-8 grid-9"
`
const GridContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-areas: ${template};
  grid-gap: 1px;
`

const Grid = styled.div`
  display: grid;
  grid-area: ${({ area }) => `grid-${area}`};
  background: ${({ hovered, hasMarker }) => hovered && !hasMarker ? '#e6e6e6' : '#DCDCDC'};
  height: 75px;
  width: 75px;
  cursor: ${({ hasMarker }) => hasMarker ? 'default': 'pointer'};
  justify-content: center;
  align-content: center;
`

const Marker = styled.h1`
  font-size: 50px;
  opacity: ${({ hasMarker }) => hasMarker ? '.8': '.4'};
`

const StyledLink = styled(Link)`
  margin-top: 20px;
`

const Robot = styled.img`
  position: absolute;
  top: -119px;
  right: 0;
  height: 150px;
  z-index: 1;
`

const TicTacToe = ({ behavior }) => {
  let history = useHistory();
  const init = Array.from(Array(9), (_, i) => i + 1);
  const [gridState, setGridState] = useState(initGridState)
  const [player, setPlayer] = useState('X')
  const [isHovered, setIsHovered] = useState(-1);
  const [remainingMoves, setRemainingMoves] = useState(init);
  const [bot] = useState(getRandomInt(1, 2) === 1 ? 'X' : 'O')

  const togglePlayer = () => {
    setPlayer(prev => {
      if (prev === 'X') {
        return 'O'
      } else {
        return 'X'
      }
    })
  }

  const removeMove = (index) => {
    const i = remainingMoves.findIndex(_ => _ === index)
    setRemainingMoves([
      ...remainingMoves.slice(0, i),
      ...remainingMoves.slice(i+1)
    ]);
  }

  const handleClick = (index) => {
    if (bot !== player) {
      removeMove(index);
      setGridState({
        ...gridState,
        [index]: player,
      });
      togglePlayer();
    }
  }

  const getMarker = (index) => {
    if (!!gridState[index]) {
      return <Marker hasMarker={!!gridState[index]}>{gridState[index]}</Marker>
    } else if (isHovered === index) {
      return <Marker hasMarker={!!gridState[index]}>{player}</Marker>
    }
  }

  useEffect(() => {
    const [endGame, winner] = checkResult(gridState)
    if (endGame) {
      setTimeout(() => {
        history.push(`/result/${winner}`);
      }, 500)
    }
  }, [gridState, history])

  useEffect(() => {
    if (player === bot) {
      const n = remainingMoves.length;
      const nextMove = getRandomInt(0, n-1)
      setTimeout(() => {
        setGridState({
          ...gridState,
          [remainingMoves[nextMove]]: player,
        });
        removeMove(remainingMoves[nextMove]);
        togglePlayer();
      }, 1000)
    }
  }, [player])

  return (
    <Container>
      <Card>
        <Typography variant="subtitle1" gutterBottom>
          {bot === player ? `BOT'S TURN` : `YOUR TURN`}
        </Typography>
        <Robot src={robot}/>
        <GridContainer>
          {init.map(n => (
            <Grid 
              key={n} 
              area={n} 
              onMouseEnter={() => setIsHovered(n)} 
              onMouseLeave={() => setIsHovered(-1)}
              hovered={isHovered === n}
              onClick={() => {
                if (!gridState[n]) {
                  handleClick(n)
                }
              }}
              hasMarker={!!gridState[n]}
            >
              {getMarker(n)}
            </Grid>
          ))}
        </GridContainer>
        <StyledLink to='/'>
          <Button variant="contained">Back</Button>
        </StyledLink> 
      </Card>
    </Container>
  )
}

export default TicTacToe;