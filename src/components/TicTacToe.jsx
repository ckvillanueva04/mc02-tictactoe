import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { initGridState, checkResult, checkNextMove } from '../helpers';
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

const GridContainer = styled.div`
  height: 227px;
  width: 227px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1px;
`

const Grid = styled.div`
  display: grid;
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
  const history = useHistory();
  const { marker } = useParams();
  const init = Array.from(Array(9), (_, i) => i + 1);
  const [gridState, setGridState] = useState(initGridState)
  const [turn, setTurn] = useState('X')
  const [isHovered, setIsHovered] = useState(-1);
  const [remainingMoves, setRemainingMoves] = useState(init);
  const [bot] = useState(marker)
  const [player] = useState(bot === 'O' ? 'X' : 'O')

  useEffect(() => {
    if (!marker) {
      history.push('/');
    }
  }, [history, marker])

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
        history.push(`/result/${bot}/${winner}`);
      }, 500)
    }
  }, [gridState, history])

  const random = () => {
    const attack = checkNextMove(gridState, bot);
    let nextMove;

    if (!attack) {
      const n = remainingMoves.length;
      nextMove = remainingMoves[getRandomInt(0, n-1)];
    } else {
      console.log('attack', attack)
      nextMove = attack;    
    }

    setTimeout(() => {
      setGridState({
        ...gridState,
        [nextMove]: turn,
      });
      removeMove(remainingMoves[nextMove]);
      toggleTurn();
    }, 1000)
  }

  const computeUtility = (s, p, d) => {
    if (d >= 6) {
      return 0;
    }
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
        total += computeUtility(curState, p === 'X' ? 'O' : 'X', d+1)
      }
    }

    return total;
  }

  const createDecisionTree = () => {
    let decisionTree = []
    let curState;
    for(let i=1; i<=9; i+=1) {
      curState = {...gridState};
      if (!curState[i]) {
        curState[i] = bot;
        decisionTree[i] = {
          nextMove: i,
          utility: computeUtility(curState, player, 1)
        }
      }
    }

    return decisionTree
  }

  const basicMiniMax = () => {
    const decisionTree = createDecisionTree();

    const sortFn = bot === 'X' 
      ? (a, b) => b.utility - a.utility
      : (a, b) => a.utility - b.utility;

    const minmax = decisionTree.sort(sortFn)[0];

    const filteredDecisionTree = decisionTree.filter(_ => _.utility === minmax.utility);
    const n = filteredDecisionTree.length;
    const r = getRandomInt(0, n-1);
    console.log(decisionTree, filteredDecisionTree[r].nextMove)
    const nextMove = filteredDecisionTree[r].nextMove;
    
    setTimeout(() => {
      setGridState({
        ...gridState,
        [nextMove]: turn,
      });
      removeMove(nextMove);
      toggleTurn();
    }, 1000)
  }

  const optimizedMiniMax = () => {
    const attack = checkNextMove(gridState, bot);
    const blockNextMove = checkNextMove(gridState, player);
    let nextMove;

    if (!blockNextMove && !attack) {
      const decisionTree = createDecisionTree();

      const sortFn = bot === 'X' 
        ? (a, b) => b.utility - a.utility
        : (a, b) => a.utility - b.utility;
  
      const minmax = decisionTree.sort(sortFn)[0];
  
      const filteredDecisionTree = decisionTree.filter(_ => _.utility === minmax.utility);
      const n = filteredDecisionTree.length;
      const r = getRandomInt(0, n-1);
      console.log(decisionTree, filteredDecisionTree[r].nextMove)
      nextMove = filteredDecisionTree[r].nextMove;
    } else if (!!attack) {
      console.log('attack', attack)
      nextMove = attack;
    } else {
      console.log('block',blockNextMove)
      nextMove = blockNextMove;
    }
    
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
        basicMiniMax();
      } else if (behavior === '2') {
        optimizedMiniMax();
      }
    }
  }, [turn])

  return (
    <Container>
      <Card>
        <Typography variant="subtitle1" gutterBottom>
          {bot === turn ? `BOT'S TURN (${bot})` : `YOUR TURN (${player})`}
        </Typography>
        <Robot src={robot}/>
        <GridContainer>
          {init.map(n => (
            <Grid 
              key={n} 
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