import React from 'react';
import createCostInputs from './createCostInputs';
import { useDataManager } from '../../utils/customHooks';
function CreateCost() {
    const [data, manager] = useDataManager();

    return (
        <div>
            <div>
                <form autoComplete="off">
                    {
                        createCostInputs().map((input) => (
                            <input.type {...input.props}
                                key={input.props.name}
                            />
                        ))
                    }
                </form>
            </div>
        </div>
    );
}

export default CreateCost;