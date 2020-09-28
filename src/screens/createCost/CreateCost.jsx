import React, { useState } from 'react';
import Loader from '../../components/loader/Loader';
import { Button } from '@material-ui/core';
import { trans } from '../../trans/trans';
import { useDataManager } from '../../utils/customHooks';
import createCostInputs from './createCostInputs';
import styles from './CreateCost.module.css';
import { useXhr } from '../../utils/xhr/hook';
import requests from '../../utils/xhr/requests';

function CreateCost() {

    const manager = useDataManager();
    const [loading, setLoading] = useState(false);
    const [send] = useXhr(requests.cost.store);

    function submit() {
        console.log('submit', manager.getErrors());
        if (manager.hasErrors()) return;

        setLoading(true);
        send({ body: manager.getData() })
            .then((response) => {
                manager.cleanData();
                manager.cleanErrors();
                setLoading(false);
            })
            .catch((response) => {
                setLoading(false);
            });
    }

    return (
        <div>
            {
                loading && <Loader fullscreen />
            }
            <div>
                <form autoComplete="off" className={styles.form}>
                    {
                        createCostInputs(manager.getData())
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
    );
}

export default CreateCost;