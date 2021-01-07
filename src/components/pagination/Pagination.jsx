import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(() => ({
  root: {
    width: 'fit-content',
    '& > *': {
      marginTop: 20,
    },
  },
}));

export default function BasicPagination({ page, count, onChange }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Pagination
        page={page}
        count={count}
        onChange={onChange}
        color="primary"
      />
    </div>
  );
}
