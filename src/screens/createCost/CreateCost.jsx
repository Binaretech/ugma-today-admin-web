import React, { useState } from 'react';
import Loader from '../../components/loader/Loader';
import { Button } from '@material-ui/core';
import { trans } from '../../trans/trans';
import { useDataManager } from '../../utils/customHooks';
import createCostInputs from './createCostInputs';
import Xhr from '../../Xhr';
import styles from './CreateCost.module.css';
import apiEndpoints from '../../apiEndpoints';
import { useDispatch } from 'react-redux';
import { snackbarMessage } from '../../redux/actions/snackbarActions';
import { setErrors } from '../../redux/actions/requestActions';

function CreateCost() {

    const manager = useDataManager();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    let xhr = null;

    function submit() {
        if (xhr) xhr.abort();

        xhr = Xhr.post(apiEndpoints.createCost, {
            data: {
                name: manager.getValue('name'),
                price: manager.getValue('price'),
            }
        });

        xhr.send().then((response) => {
            dispatch(
                snackbarMessage(
                    response?.data?.message ||
                    trans('Components.snackbar.successMessage')
                )
            );
            setLoading(false);
        }).catch((err) => {
            dispatch(
                snackbarMessage(
                    err.response?.data?.message ||
                    trans('Components.snackbar.errorMessage')
                )
            );
            dispatch(setErrors(err));
            setLoading(false);
        });
        setLoading(true);
    }

    return (
        <div>
            {
                loading && <Loader fullscreen />
            }
            <div>
                <form autoComplete="off" className={styles.form}>
                    {
                        createCostInputs()
                            .map((row, index) => (
                                <div className={styles.row}>
                                    {
                                        row.map((input) => (
                                            <div className={styles.input}>
                                                <input.type
                                                    key={input.props.name}
                                                    {...input.props}
                                                    setValue={manager.setValue}
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
    );
}

export default CreateCost;