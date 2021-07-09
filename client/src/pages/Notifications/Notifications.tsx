import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';

const Message = (): JSX.Element => {
  const classes = useStyles();

  return <Typography>This is the notifications page</Typography>;
};

export default Message;
