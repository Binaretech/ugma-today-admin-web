import React from 'react';
import TableList from './TableList';
import EditIcon from '@material-ui/icons/Edit';
import renderer from 'react-test-renderer';
import store from '../../redux/store';
import apiEndpoints from '../../apiEndpoints';
import { Provider } from 'react-redux';
import BigNumber from 'bignumber.js';
import { trans } from '../../trans/trans';

const TableListComponentWithProvider = ({ children }) => (
	<Provider store={store()}>
		{children}
	</Provider>
);
const TableListComponent = renderer.create(<TableListComponentWithProvider >
	<TableList
		apiEndpoint={apiEndpoints.SaveCost}
		onClick={(item) => console.log(item)}
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
</TableListComponentWithProvider>);

test('should snapshot TableList Component', () => {
	const tree = TableListComponent.toJSON();

	expect(tree).toMatchSnapshot();
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

