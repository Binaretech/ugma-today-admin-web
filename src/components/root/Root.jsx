/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Scaffold from '../scaffold/Scaffold';
import { useHistory, } from 'react-router-dom';
import paths from '../../routes/paths';

function Root({ children }) {
    const userId = useSelector((state) => state.sessionReducer?.id);

    const history = useHistory();

    useEffect(() => {
        if (!userId) return history.push(paths.login);
    }, [userId]);

    return !!userId ? (
        <Scaffold>
            {children}
        </Scaffold>
    )
        :
        (
            <>
                {children}
            </>
        );
}

export default Root;
