import React from 'react';
import createCostInputs from './createCostInputs';
import { useDataManager } from '../../utils/customHooks';
import styles from './CreateCost.module.css';

function CreateCost() {
    const manager = useDataManager();

    return (
        <div>
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
                </form>
            </div>
        </div>
    );
}

export default CreateCost;