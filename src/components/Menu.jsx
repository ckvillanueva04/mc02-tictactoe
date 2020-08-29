import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Menu = ({ behavior, setBehavior }) => {
  const classes = useStyles();
  return (
    <Container>
      <Card>
        <Typography variant="subtitle1" gutterBottom>
          CHOOSE BOT LEVEL:
        </Typography>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Rational Behavior</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={behavior}
            onChange={(e) => setBehavior(e)}
            label="Rational Behavior"
          >
            <MenuItem value='0'>0</MenuItem>
            <MenuItem value='1'>1</MenuItem>
            {/* <MenuItem value='2'>2</MenuItem> */}
          </Select>
        </FormControl>
        <Link to='/tic-tac-toe'>
          <Button variant="contained">Start Tic-Tac-Toe</Button>
        </Link>
      </Card>
    </Container>       
  )
}

export default Menu;