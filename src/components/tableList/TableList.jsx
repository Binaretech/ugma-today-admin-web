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

function TableList(props) {
	const classes = useStyles2();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [response, setResponse] = useState({});

	const [send] = useXhr({
		method: 'GET',
		url: props.apiEndpoint + `?page=${page + 1}&pagination=${rowsPerPage}`,
	});

	useEffect(() => {
		send()
			.then((res) => {
				setResponse(res);
			})
			.catch(console.error);
		// eslint-disable-next-line
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
						{props.headerKeys.map((key) => (
							<TableCell align="center" key={key}>
								{props.customHeaderKeys()[key]
									? props.customHeaderKeys()[key](key)
									: trans(`words.${key}`)}
							</TableCell>
						))}
						{props.actionButton && (
							<TableCell align="center">
								{trans(`words.${props.actionButtonTitle}`)}
							</TableCell>
						)}
					</TableRow>
				</TableHead>
				<TableBody>
					{response.ids?.length > 0 ? (
						response.ids.map((id) => (
							<TableRow key={id}>
								{props.headerKeys.map((key) => (
									<TableCell align="center" key={key}>
										{props.bodyValues()[key]
											? props
													.bodyValues()
													[key](
														response.data[id][key],
														response.data[id]
													)
											: response.data[id][key]}
									</TableCell>
								))}
								{props.actionButton && (
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
								)}
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

TableList.defaultProps = {
	onSelectedItem: () => {},
	apiEndpoint: '',
	headerKeys: [],
	bodyValues: () => {},
	actionButton: false,
	actionButtonTitle: 'edit',
};

TableList.propTypes = {
	apiEndpoint: PropTypes.string.isRequired,
	headerKeys: PropTypes.array.isRequired,
	bodyValues: PropTypes.func.isRequired,
	actionButton: PropTypes.bool,
	actionButtonTitle: PropTypes.string,
	onSelectedItem: PropTypes.func,
};

export default TableList;
