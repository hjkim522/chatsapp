import React from 'react';
import { Box, Typography } from '@material-ui/core';

export default function Message(props) {
  return (
    <Box
      id={props.id}
      flex="0 0 auto"
      my={1}
      display="flex"
      justifyContent="flex-start"
    >
      <Box
        //minWidth={0}
        width="100%"
        py={1}
        px={2}
        color="text.primary"
        borderRadius={0}
        // boxShadow={1}
      >
        <Box fontWeight="fontWeightBold">
          {props.user}
        </Box>
        <Typography
          variant="body1"
          style={{ overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }}
        >
          {props.content}
        </Typography>
      </Box>
    </Box>
  );
}
