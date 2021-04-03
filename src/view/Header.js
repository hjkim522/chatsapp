import React from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    marginLeft: '5px', //theme.spacing(1),
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
}));

export default function Header(props) {
  const classes = useStyles();
  let history = useHistory();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Container component="header" maxWidth="md" className={classes.container}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={()=>{history.push("/chats");}}>
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {props.channel}
          </Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            // onClick={handleMenu}
            color="inherit"
            className={classes.toolbarButtons}
          >
            <AccountCircle />
          </IconButton>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
