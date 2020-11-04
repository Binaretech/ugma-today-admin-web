import React, { useState } from 'react';
import Loader from '../loader/Loader';
import { Button, Dialog, Slide, DialogTitle, DialogActions } from '@material-ui/core';
import { trans } from '../../trans/trans';
import { useDataManager } from '../../utils/customHooks';
import saveCostInputs from './saveCostInputs';
import styles from './SaveCost.module.css';
import { useXhr } from '../../utils/xhr/hook';
import requests from '../../utils/xhr/requests';
import { useDispatch } from 'react-redux';
import cleanErrors, { setErrors } from '../../redux/actions/requestActions';

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

    const manager = useDataManager();
    const [loading, setLoading] = useState(false);
    const [send] = useXhr(!!props.item ? requests.cost.update : requests.cost.store);
    const dispatch = useDispatch();

    function submit() {
        if (manager.hasErrors()) return;

        setLoading(true);
        send({
            body: manager.getData(), params: { id: props.item && props.item.id }
        })
            .then((response) => {
                manager.cleanData();
                manager.cleanErrors();
                setLoading(false);
                dispatch(cleanErrors());
                if (props.item && props.handleClose) props.handleClose();
            })
            .catch((response) => {
                dispatch(setErrors(response));
                setLoading(false);
            });
    }

    return (
        <Dialog
            open={props.open}
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
                <Button onClick={props.handleClose} color="primary">
                    {trans('words.close')}
                </Button>
            </DialogActions>
        </Dialog>

    );
}

export default SaveCost;