/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TablePagination,
	TableRow,
	Paper,
	IconButton,
} from '@material-ui/core';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import EditIcon from '@material-ui/icons/Edit';
import BigNumber from 'bignumber.js';
import apiEndpoints from '../../apiEndpoints';
import { useXhr } from '../../utils/xhr/hook';
import { trans } from '../../trans/trans';

const useStyles1 = makeStyles((theme) => ({
	root: {
		flexShrink: 0,
		marginLeft: theme.spacing(2.5),
	},
}));

function TablePaginationActions(props) {
	const classes = useStyles1();
	const theme = useTheme();
	const {
		page,
		onChangePage,
		nextIconButtonProps: { lastPage },
	} = props;

	const handleFirstPageButtonClick = (event) => {
		onChangePage(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onChangePage(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onChangePage(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onChangePage(event, lastPage - 1);
	};

	return (
		<div className={classes.root}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === 'rtl' ? (
					<LastPageIcon />
				) : (
						<FirstPageIcon />
					)}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowRight />
				) : (
						<KeyboardArrowLeft />
					)}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page === lastPage - 1}
				aria-label="next page"
			>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowLeft />
				) : (
						<KeyboardArrowRight />
					)}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page === lastPage - 1}
				aria-label="last page"
			>
				{theme.direction === 'rtl' ? (
					<FirstPageIcon />
				) : (
						<LastPageIcon />
					)}
			</IconButton>
		</div>
	);
}

TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({});

function ListCosts(props) {
	const classes = useStyles2();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [response, setResponse] = useState({});

	const [send] = useXhr({
		method: 'GET',
		url:
			apiEndpoints.createCost +
			`?page=${page + 1}&pagination=${rowsPerPage}`,
	});

	useEffect(() => {
		send()
			.then((res) => {
				setResponse(res);
			})
			.catch(console.error);
	}, [page, rowsPerPage]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<TableContainer component={Paper}>
			<Table
				className={classes.table}
				aria-label="custom pagination table"
			>
				<TableHead>
					<TableRow>
						<TableCell align="center">
							{trans('words.id')}
						</TableCell>
						<TableCell align="center">
							{trans('words.name')}
						</TableCell>
						<TableCell align="center">
							{trans('words.comment')}
						</TableCell>
						<TableCell align="center">
							{trans('words.price')}
						</TableCell>
						<TableCell align="center">
							{trans('words.currency')}
						</TableCell>
						<TableCell align="center">
							{trans('words.edit')}
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{response.ids?.length > 0 ? (
						response.ids.map((id) => (
							<TableRow key={id}>
								<TableCell>{response.data[id].id}</TableCell>
								<TableCell>{response.data[id].name}</TableCell>
								<TableCell>
									{response.data[id].comment}
								</TableCell>
								<TableCell>
									{new BigNumber(
										response.data[id].price
									).toFormat()}
								</TableCell>
								<TableCell align="center">
									{response.data[id].currencyName}
								</TableCell>
								<TableCell align="center">
									<IconButton
										onClick={() =>
											props.onSelectedItem(
												response.data[id]
											)
										}
									>
										<EditIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))
					) : (
							<TableRow>
								<TableCell>No hay registros disponibles</TableCell>
							</TableRow>
						)}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[1, 3, 5, 10, 25]}
							SelectProps={{
								inputProps: { 'aria-label': 'rows per page' },
								native: true,
							}}
							count={response.total || 0}
							rowsPerPage={rowsPerPage}
							page={page}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
							labelRowsPerPage={trans(
								'Screens.ListCosts.rowsPerPage'
							)}
							labelDisplayedRows={({ from, to, count, page }) => {
								return `${from}-${to} ${trans(
									'words.of'
								).toLocaleLowerCase()} ${count} ${trans(
									'words.page'
								)} ${page + 1}`;
							}}
							nextIconButtonProps={{
								lastPage: response.last_page,
							}}
							ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	);
}

ListCosts.defaultProps = {
	onSelectedItem: () => { },
};

export default ListCosts;
