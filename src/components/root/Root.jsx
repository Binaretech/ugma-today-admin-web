import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Scaffold from '../scaffold/Scaffold';
import { setUserData } from '../../redux/actions/sessionActions';
import { useHistory, } from 'react-router-dom';
import paths from '../../routes/paths';
import { loadUserData } from '../../utils/functions';

function Root({ children }) {
    const userId = useSelector((state) => state.sessionReducer?.id);
    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        const data = loadUserData();
        if (data?.token) {
            dispatch(setUserData(data));
            return;
        }
        history.push(paths.login);
    }, [dispatch, history]);

    return userId ? (
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