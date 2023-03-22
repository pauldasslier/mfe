import React from 'react';
import { makeStyles, createStyles, LinearProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => createStyles({
  bar: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    }
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.bar}>
      <LinearProgress />
    </div>
  )
}