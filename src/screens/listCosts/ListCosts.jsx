import BigNumber from 'bignumber.js';
import React from 'react';
import apiEndpoints from '../../apiEndpoints';
import TableList from '../../components/tableList/TableList';
import { trans } from '../../trans/trans';

function ListCosts() {
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

	return (
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
		/>
	);
}

export default ListCosts;
