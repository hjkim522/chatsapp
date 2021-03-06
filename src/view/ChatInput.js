import React from 'react';
import { Button, TextField, makeStyles } from '@material-ui/core';
import { Send as SendIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  container: {
    flex: '1 1 auto',
    display: 'flex',
    '& > *': {
      flex: '1 1 auto',
      minWidth: 0,
    },
    '& > * + *': {
      marginLeft: theme.spacing(1),
    },
    '& :last-child': {
      flex: '0 1 auto',
    },
  }
}));

export default function ChatInput(props) {
  const classes = useStyles();

  const inputRef = React.useRef(null);

  //TODO: useCallback
  const handleKeyDown = (e => {
    if (e.nativeEvent.isComposing) {
      return;
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      props.onSend();
    }
  });

  return (
    <div className={classes.container}>
      <TextField
        value={props.content}
        onChange={(event) => props.setContent(event.target.value)}
        autoFocus
        multiline
        placeholder="Type a message to send..."
        inputProps={{ onKeyDown: handleKeyDown }}
        variant="outlined"
        rowsMax={10}
        inputRef={inputRef}
      />
      <Button
        type="button"
        onClick={() => { inputRef.current.focus(); props.onSend(); }}
        //disabled={!props.content}
        variant="contained"
        color="primary"
        startIcon={<SendIcon />}
      >
        Send
      </Button>
    </div>
  );
}
