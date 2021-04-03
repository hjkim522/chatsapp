import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import ChatInput from './ChatInput';
import Message from './Message';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    width: '100%',
    //padding: theme.spacing(1),
    //backgroundColor: theme.palette.background.default,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      maxWidth: '100%',
    },
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
  header: {
    flex: '0 1 auto',
    display: 'flex',
    alignContent: 'flex-start',
    '& > *': {
      minWidth: 0,
    },
  },
  messages: {
    flex: '1 1 0%',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      maxWidth: '100%',
    },
  },
  action: {
    padding: theme.spacing(1),
    flex: '0 1 auto',
    display: 'flex',
    alignContent: 'flex-end',
    '& > *': {
      minWidth: 0,
    },
  },
}));

export default function Chats(props) {
  const classes = useStyles();

  const msgRef = React.useRef(null);
  const scroll = React.useCallback(() => {
    if (msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;
    }
  }, [msgRef]);

  React.useEffect(() => {
    scroll();
  }, [props.messages, scroll]);

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box boxShadow={1}>
        <div className={classes.container}>
          <div className={classes.header}>
            <Header channel={props.channel} />
            <Toolbar />
          </div>
          <div className={classes.messages} ref={msgRef}>
            {props.messages.map((msg) => {
              return (
                <Message key={msg.id} user={msg.displayName} content={msg.content} />
              );
            })}
          </div>
          <div className={classes.action}>
            <ChatInput content={props.content} setContent={props.setContent} onSend={props.onSend} />
          </div>
        </div>
      </Box>
    </Container>
  );
}
