import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Button,
} from '@material-ui/core';
import TableList from '../../components/tableList/TableList';
import CreateCost from '../../components/createCost/CreateCost';
import EditIcon from '@material-ui/icons/Edit';
import BigNumber from 'bignumber.js';
import apiEndpoints from '../../apiEndpoints';
import { trans } from '../../trans/trans';

const useStyles2 = makeStyles({
	buttonContainer: {
		display: 'flex',
		padding: '1rem',
		justifyContent: 'flex-end'
	}
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

	function handleClose() {
		setOpen(false);
	}

	function handleOpen() {
		setOpen(true);
	}

	return (
		<div>
			<CreateCost open={open} handleClose={handleClose} />
			<div className={classes.buttonContainer}>
				<Button variant="contained" color="primary" onClick={handleOpen}>{trans('words.add')}</Button>
			</div>
			<TableList
			apiEndpoint={apiEndpoints.createCost}
			headerKeys={[
				'id',
				'name',
				'comment',
				'price',
				'currencyName',
				'modifiedBy',
			]}
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
