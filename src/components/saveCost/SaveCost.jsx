import React from 'react';
import Loader from '../loader/Loader';
import { Button, Dialog, Slide, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import { trans } from '../../trans/trans';
import saveCostInputs from './saveCostInputs';
import styles from './SaveCost.module.css';
import {useCostHandling, useHandleClose} from './functions.js';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * @typedef {object} Props
 * @prop {boolean} open
 * @prop {object} item
 * @prop {function() => void} handleClose
 * 
 * @param {Props} props 
 */
function SaveCost(props) {

		const [open, handleClose] = useHandleClose(props.handleClose);

		const [manager, loading, 
					submit, openDelete,
					openDeleteDialog, 
					closeDeleteDialog, deleteCost] = useCostHandling(props.item?.id, props.handleClose);

		function deleteConfirmation() {
        return (
            <Dialog
                open={openDelete}
                onClose={closeDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    {trans('Components.SaveCost.deleteConfirmationTitle')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {trans('Components.SaveCost.deleteConfirmation')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog} color="secondary">
                        {trans('words.cancel')}
                    </Button>
                    <Button color="primary" onClick={deleteCost}>
                        {trans('words.accept')}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    return (
        <>
            {props.item && deleteConfirmation()}

            <Dialog
                open={open}
                TransitionComponent={Transition}
                fullWidth
            >
                <DialogTitle>
                    {props.item ? trans('Components.SaveCost.updatePrice') : trans('Components.SaveCost.createPrice')}
                </DialogTitle>

                <div>
                    {
                        loading && <Loader fullscreen />
                    }
                    <div>
                        <form autoComplete="off" className={styles.form}>
                            {
                                saveCostInputs(props.item)
                                    .map((row, index) => (
                                        <div className={styles.row} key={index}>
                                            {
                                                row.map((input) => (
                                                    <div className={styles.input}
                                                        key={input.props.name}>
                                                        <input.type
                                                            {...input.props}
                                                            setValue={manager.setValue}
                                                            setError={manager.setError}
                                                        />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ))
                            }
                            <div className={styles.buttoncontainer}>
                                <Button variant="outlined" onClick={submit}>{trans('words.accept')}</Button>
                            </div>
                        </form>
                    </div>
                </div>
                <DialogActions>
                    {
                        props.item &&
                        <Button onClick={openDeleteDialog} color="secondary">
                            {trans('words.delete')}
                        </Button>
                    }
                    <Button onClick={handleClose} color="primary">
                        {trans('words.close')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default SaveCost;
