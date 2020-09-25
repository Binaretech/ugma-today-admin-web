import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Scaffold from '../scaffold/Scaffold';
import { setUserData } from '../../redux/actions/sessionActions';
import { withRouter } from 'react-router-dom';

function Root({ children, history: { push } }) {
    const userId = useSelector((state) => state.sessionReducer?.id);
    const dispatch = useDispatch();

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

        push('/login');
    }, [dispatch, push]);

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

export default withRouter(Root);