import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { initGridState, checkResult } from '../helpers';
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
  const [turn, setTurn] = useState('X')
  const [isHovered, setIsHovered] = useState(-1);
  const [remainingMoves, setRemainingMoves] = useState(init);
  const [bot] = useState(getRandomInt(1, 2) === 1 ? 'X' : 'O')
  const [player] = useState(bot === 'O' ? 'X' : 'O')

  const toggleTurn = () => {
    setTurn(prev => {
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
    if (bot !== turn) {
      removeMove(index);
      setGridState({
        ...gridState,
        [index]: turn,
      });
      toggleTurn();
    }
  }

  const getMarker = (index) => {
    if (!!gridState[index]) {
      return <Marker hasMarker={!!gridState[index]}>{gridState[index]}</Marker>
    } else if (isHovered === index) {
      return <Marker hasMarker={!!gridState[index]}>{turn}</Marker>
    }
  }

  useEffect(() => {
    const [endGame, winner] = checkResult(gridState)
    if (endGame) {
      setTimeout(() => {
        history.push(`/result/${winner === bot ? 'bot' : 'player'}`);
      }, 500)
    }
  }, [gridState, history])

  const random = () => {
    const n = remainingMoves.length;
    const nextMove = getRandomInt(0, n-1)
    setTimeout(() => {
      setGridState({
        ...gridState,
        [remainingMoves[nextMove]]: turn,
      });
      removeMove(remainingMoves[nextMove]);
      toggleTurn();
    }, 1000)
  }

  const recursionGameTree = (s, p) => {
    if (checkResult(s)[1] === 'X') {
      return 1;
    }
    if (checkResult(s)[1] === 'draw') {
      return 0;
    }
    if (checkResult(s)[1] === 'O') {
      return -1;
    }
    
    let curState;
    let total = 0;

    for(let i=1; i<=9; i+=1) {
      curState = {...s};
      if (!curState[i]) {
        curState[i] = p;
        total += recursionGameTree(curState, p === 'X' ? 'O' : 'X')
      }
    }

    return total;
  }

  const createGameTree = () => {
    let gameTree = []
    let curState;
    for(let i=1; i<=9; i+=1) {
      curState = {...gridState};
      if (!curState[i]) {
        curState[i] = bot;
        gameTree[i] = {
          nextMove: i,
          utility: recursionGameTree(curState, player)
        }
      }
    }

    let minmax;
    if (bot === 'X') {
      minmax = gameTree.sort((a, b) => b.utility - a.utility)[0]
    } else {
      minmax = gameTree.sort((a, b) => a.utility - b.utility)[0]
    }

    const decision = gameTree.filter(_ => _.utility === minmax.utility);
    const n = decision.length
    const r = getRandomInt(0, n-1)
    console.log(gameTree, decision[r].nextMove)
    return decision[r].nextMove
  }

  const miniMax = () => {
    const nextMove = createGameTree();
    setTimeout(() => {
      setGridState({
        ...gridState,
        [nextMove]: turn,
      });
      removeMove(nextMove);
      toggleTurn();
    }, 1000)
  }

  useEffect(() => {
    if (!checkResult(gridState)[0] && turn === bot) {
      if (behavior === '0') {
        random();
      } else if (behavior === '1') {
        miniMax();
      }
    }
  }, [turn])

  return (
    <Container>
      <Card>
        <Typography variant="subtitle1" gutterBottom>
          {bot === turn ? `BOT'S TURN` : `YOUR TURN`}
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