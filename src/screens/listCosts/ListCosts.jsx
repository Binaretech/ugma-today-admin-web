import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import TableList from '../../components/tableList/TableList';
import SaveCost from '../../components/saveCost/SaveCost';
import EditIcon from '@material-ui/icons/Edit';
import BigNumber from 'bignumber.js';
import apiEndpoints from '../../apiEndpoints';
import {trans} from '../../trans/trans';
import {useWindowSize} from '../../utils/customHooks';

const useStyles2 = makeStyles({
  buttonContainer: {
    display: 'flex',
    padding: '1rem',
    justifyContent: 'flex-end',
  },
});

function bodyValues() {
  return {
    price: (price) => new BigNumber(price).toFormat(),
    modifiedBy: (modifiedBy) => modifiedBy?.profile?.fullname,
  };
}

function headerKeys() {
  return {
    currencyName: () => trans('words.currency'),
  };
}

function ListCosts() {
  const classes = useStyles2();
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(null);
  const [requestAgain, setRequestAgain] = useState(false);
  const [width] = useWindowSize();

  function handleClose() {
    setOpen(false);
    setItem(null);
    setRequestAgain(!requestAgain);
  }

  function handleOpen() {
    setOpen(true);
  }

  function setUpdate(item) {
    setItem(item);
    setOpen(true);
  }

  return (
    <div>
      {open && <SaveCost item={item} open handleClose={handleClose} />}
      <div className={classes.buttonContainer}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          {trans('words.add')}
        </Button>
      </div>
      <TableList
        apiEndpoint={apiEndpoints.SaveCost}
        onSelectedItem={setUpdate}
        headerKeys={[
          'id',
          'name',
          ...(width > 720
            ? ['comment', 'price', 'currencyName', 'modifiedBy']
            : []),
        ]}
        requestAgain={requestAgain}
        customHeaderKeys={headerKeys}
        bodyValues={bodyValues}
        actionButton
        actionButtonTitle="edit"
        actionButtonIcon={<EditIcon />}
      />
    </div>
  );
}

export default ListCosts;
