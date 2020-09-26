import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Scaffold from '../scaffold/Scaffold';
import { setUserData } from '../../redux/actions/sessionActions';
import { useHistory, } from 'react-router-dom';
import paths from '../../routes/paths';

function Root({ children }) {
    const userId = useSelector((state) => state.sessionReducer?.id);
    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        try {
            const data = JSON.parse(localStorage.getItem('utd') || {});
            if (data) {
                dispatch(setUserData(data));
                return;
            }
        } catch (error) {
            localStorage.setItem('utd', {});
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